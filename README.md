# Advent of Code CLI

![build][build]
![dependencies][dependencies]
![license][license]

A decently command-line interface I made because I was bored.

(Don't use this too frecuently, the AoC servers can only handle so much requests, so this CLI may cause problems if used too frecuently)

## Installation

This CLI requires node version 8.x.x or greater.

You can install this using [npm][npm] or [yarn][yarn]:

```
$ npm i -g advent-of-code-cli
$ yarn global add advent-of-code-cli
```

## Usage

To run the CLI, run the following command:

```
$ aoc
```

A menu should pop up, where you must enter your session cookie to send with requests.

(If you don't have a session cookie, you can grab it on the "Application" tab of mostly any browser's DevTools, stored as "session" in the site cookies)

[build]: https://img.shields.io/github/workflow/status/elchologamer/advent-of-code-cli/Build
[license]: https://img.shields.io/npm/l/advent-of-code-cli?color=orange
[dependencies]: https://img.shields.io/david/elchologamer/advent-of-code-cli
[npm]: https://npmjs.com
[yarn]: https://yarnpkg.com
