import chalk from 'chalk';
import inquirer from 'inquirer';
import { normalize } from 'path';
import { writeFile } from 'fs/promises';
import { EOL } from 'os';
import { START_YEAR } from './constants';
import getPuzzleInput from './puzzle-input';
import store from './store';
import { showTitle, sleep } from './utils';

const formatSession = (s: string) => s.trim().toLowerCase();

export async function checkSession(override = false) {
	if (store.has('session') && !override) return;

	const { session } = await inquirer.prompt({
		name: 'session',
		message: 'Insert an AoC session cookie to implement on requests:',
		type: 'input',
		transformer: formatSession,
		validate: (s: string) =>
			s.trim().length > 70 || 'Insert a valid session cookie',
	});

	store.set('session', formatSession(session));
}

export async function showMenu() {
	showTitle();

	const choices = ['Get a puzzle input', 'Change the session cookie', 'Exit'];

	const { menuAction } = await inquirer.prompt({
		name: 'menuAction',
		message: 'What would you like to do?',
		type: 'list',
		choices,
	});

	switch (choices.indexOf(menuAction)) {
		case 0:
			// Get a puzzle input
			await getPuzzleInput();
			break;
		case 1:
			// Change session cookie
			await checkSession(true);
			break;
		case 2:
			// Exit
			console.log(chalk.yellow('Goodbye!'));
			process.exit();
	}
}

export async function getInputDate() {
	console.clear();

	const d = new Date();
	const currentYear = d.getFullYear();

	const yearChoices = [...Array(currentYear - START_YEAR)].map((e, index) =>
		(START_YEAR + index).toString()
	);

	if (d.getMonth() === 11) yearChoices.push(currentYear.toString());

	const { year } = await inquirer.prompt({
		name: 'year',
		type: 'list',
		message: 'Choose a year:',
		choices: yearChoices,
	});

	const maxDay =
		year !== currentYear.toString() ? 25 : Math.min(d.getDate(), 25);

	const dayChoices = [...Array(maxDay)].map((e, index) =>
		(index + 1).toString()
	);

	const { day } = await inquirer.prompt({
		name: 'day',
		type: 'list',
		message: 'Choose the day of the month:',
		choices: dayChoices,
	});

	return { year, day };
}

export async function afterInput(input: (string | number)[]) {
	const choices = ['Show on console', 'Save to a JSON file', 'Both!'];

	const { answer } = await inquirer.prompt({
		name: 'answer',
		type: 'list',
		message: 'All done! What now?',
		choices,
	});

	switch (choices.indexOf(answer)) {
		case 0:
			// Show on console
			console.log(input);

			await inquirer.prompt({
				name: 'continue',
				type: 'input',
				message: 'Press enter to continue...',
				prefix: '',
				transformer: () => '',
			});
			break;
		case 2:
			// Both
			console.log(input);
			console.log(chalk.yellow('='.repeat(40)));
		case 1:
			// Save to a JSON file
			const { path } = await inquirer.prompt({
				name: 'path',
				type: 'input',
				message: 'Insert a path for the input file:',
				transformer: (s: string) => s.trimStart(),
				validate: (s: string) => s.trim().length > 0 || 'Insert a valid path',
			});

			await writeFile(normalize(path), JSON.stringify(input, null, 2) + EOL);

			console.log(chalk.green('Done!'));
			await sleep(2000);
	}
}
