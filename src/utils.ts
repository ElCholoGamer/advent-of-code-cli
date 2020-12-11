import chalk from 'chalk';
import figlet from 'figlet';

export function showTitle() {
	console.clear();
	console.log(chalk.redBright(figlet.textSync('Advent of Code')));
}

export const sleep = (ms: number) =>
	new Promise(resolve => setTimeout(resolve, ms));
