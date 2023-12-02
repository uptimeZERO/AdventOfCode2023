import { Injectable } from '@angular/core';

export interface day2Game {
	id: number;
	games: day2ColourCombination[];
};

export interface day2ColourCombination {
	red: number;
	green: number;
	blue: number;
};

@Injectable({
	providedIn: 'root'
})
export class AdventOfCodeService {

	constructor() { }

	public static isNumber(stringChar: string, includeZero = false) {
		const validNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
		if (includeZero) {
			validNumbers.push('0');
		}

		return validNumbers.includes(stringChar);
	}

	public static getDay1Part1Answer(inputStrings: string[]): number {
		let sum = 0;
		for (const inputString of inputStrings) {
			const inputStringChar = inputString.split('');
			let numberString = '';
			for (const stringChar of inputStringChar) {
				if (AdventOfCodeService.isNumber(stringChar)) {
					numberString = stringChar;
					break;
				}
			}

			for (const stringChar of inputStringChar.reverse()) {
				if (AdventOfCodeService.isNumber(stringChar)) {
					numberString = `${numberString}${stringChar}`;
					break;
				}
			}

			sum += Number(numberString);
		}

		return sum;
	}

	public static getDay1Part2Answer(inputStrings: string[]): number {
		return AdventOfCodeService.getDay1Part1Answer(inputStrings
			.map(x => x
				.replaceAll('one', 'o1ne')
				.replaceAll('two', 't2wo')
				.replaceAll('three', 't3hree')
				.replaceAll('four', 'f4our')
				.replaceAll('five', 'f5ive')
				.replaceAll('six', 's6ix')
				.replaceAll('seven', 's7even')
				.replaceAll('eight', 'e8ight')
				.replaceAll('nine', 'n9ine')));
	}

	public static getDay2Part1Answer(
		inputStrings: string[],
		combination: day2ColourCombination
	): number {
		let day2games = AdventOfCodeService.transformDay2Input(inputStrings);
		const validGames: day2Game[] = [];
		for (const day2game of day2games) {
			let valid = true;
			for (const game of day2game.games) {
				if (game.red > combination.red ||
					game.green > combination.green ||
					game.blue > combination.blue) {
					valid = false;
				}
			}

			if (valid) {
				validGames.push(day2game);
			}
		}

		return validGames
			.map(x => x.id)
			.reduce((acc, current) => acc + current, 0);
	}

	public static getDay2Part2Answer(
		inputStrings: string[]
	): number {
		let day2games = AdventOfCodeService.transformDay2Input(inputStrings);
		const sums: number[] = [];
		for (const day2game of day2games) {
			let red = 0;
			let green = 0;
			let blue = 0;
			for (const game of day2game.games) {
				red = Math.max(game.red, red);
				green = Math.max(game.green, green);
				blue = Math.max(game.blue, blue);
			}

			if (red === 0) {
				sums.push(green * blue);
			} else if (green === 0) {
				sums.push(red * blue);
			} else if (blue === 0) {
				sums.push(red * green);
			} else {
				sums.push(red * green * blue);
			}
		}

		return sums
			.reduce((acc, current) => acc + current, 0);
	}

	public static transformDay2Input(inputStrings: string[]): day2Game[] {
		const day2Games = [];
		for (const inputString of inputStrings) {
			const day2Game: day2Game = {
				id: Number(inputString.split(':')[0].replace('Game ', '')),
				games: []
			}

			const gameStrings = inputString.split(': ')[1].split('; ');
			for (const gameString of gameStrings) {
				const game: day2ColourCombination = {
					red: 0,
					green: 0,
					blue: 0
				};

				let numberString = '';
				let ignoreUntilNextNumber = false;
				for (const gameStringChar of gameString.split('')) {
					if (AdventOfCodeService.isNumber(gameStringChar, true)) {
						ignoreUntilNextNumber = false;
						numberString = `${numberString}${gameStringChar}`;
					} else {
						if (!ignoreUntilNextNumber) {
							switch (gameStringChar) {
								case 'r':
									game.red = Number(numberString);
									numberString = '';
									ignoreUntilNextNumber = true;
									break;
								case 'g':
									game.green = Number(numberString);
									numberString = '';
									ignoreUntilNextNumber = true;
									break;
								case 'b':
									game.blue = Number(numberString);
									numberString = '';
									ignoreUntilNextNumber = true;
									break;
							}
						}
					}
				}

				day2Game.games.push(game);
			}

			day2Games.push(day2Game);
		}

		return day2Games;
	}
}
