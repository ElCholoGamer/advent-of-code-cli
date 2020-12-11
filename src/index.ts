#!/usr/bin/env node
import chalk from 'chalk';
import figlet from 'figlet';
import { checkSession, showMenu } from './inquirer';

console.clear();
console.log(chalk.redBright(figlet.textSync('Advent of Code')));

checkSession().then(async () => {
	while (true) await showMenu();
});
