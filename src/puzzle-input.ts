import axios from 'axios';
import { AOC_ENDPOINT } from './constants';
import { afterInput, getInputDate } from './inquirer';
import { Spinner } from 'clui';
import store from './store';
import chalk from 'chalk';

async function getPuzzleInput() {
	const { day, year } = await getInputDate();
	const SESSION = store.get('session');

	const status = new Spinner('Fetching...');
	status.start();

	const res = await axios.get(`${AOC_ENDPOINT}/${year}/day/${day}/input`, {
		headers: { Cookie: `session=${SESSION}` },
	});

	status.stop();

	let input: (string | number)[] = res.data.split('\n');
	if (input.every(line => !isNaN(Number(line)))) {
		input = input.map(num => Number(num));
	}

	await afterInput(input);
}

export default getPuzzleInput;
