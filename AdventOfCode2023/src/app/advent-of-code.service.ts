import { Injectable } from '@angular/core';
import { day5FertilizerToWaterMap, day5HumidityToLocationMap, day5LightToTemperatureMap, day5SeedToSoilMap, day5Seeds, day5SoilToFertilizerMap, day5TemperatureToHumidityMap, day5WaterToLightMap } from './advent-of-code2023/day5-inputs';
import { day6ExampleInput, day6Input } from './advent-of-code2023/day6-input';

export interface Day2Game {
	id: number;
	games: Day2ColourCombination[];
};

export interface Day2ColourCombination {
	red: number;
	green: number;
	blue: number;
};

export interface Day3Grid {
	gridPoints: Day3GridPoint[];
};

export interface Day3GridPoint {
	x: number;
	y: number;
	value: string;
	isNumber: boolean;
	isFirstRow: boolean;
	isLastRow: boolean;
	isStartOfRow: boolean;
	isEndOfRow: boolean;
}

export interface Day4Card {
	winningNumbers: number[];
	cardNumbers: number[];
	copies: number;
}

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
		combination: Day2ColourCombination
	): number {
		let day2games = AdventOfCodeService.transformDay2Input(inputStrings);
		const validGames: Day2Game[] = [];
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

	public static transformDay2Input(inputStrings: string[]): Day2Game[] {
		const day2Games = [];
		for (const inputString of inputStrings) {
			const day2Game: Day2Game = {
				id: Number(inputString.split(':')[0].replace('Game ', '')),
				games: []
			}

			const gameStrings = inputString.split(': ')[1].split('; ');
			for (const gameString of gameStrings) {
				const game: Day2ColourCombination = {
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

	public static getDay3Part1Answer(inputStrings: string[]): number {
		let sum = 0;
		const symbols = ['*', '&', '/', '#', '%', '-', '=', '$', '+', '@', ];
		for (let i = 0; i < inputStrings.length; i++) {
			const inputStringChars = inputStrings[i];
			let numbersWithIndexes: {
				num: number,
				indexes: number[]
			} = {
				num: 0,
				indexes: []
			};
			let numberString = '';
			for (let j = 0; j < inputStringChars.length; j++) {
				if (AdventOfCodeService.isNumber(inputStringChars[j])) {
					numberString = `${numberString}${inputStringChars[j]}`;
					numbersWithIndexes.indexes.push(j);
				} else if (numberString !== '')  {
					numbersWithIndexes.num = Number(numberString);
					if (i !== 0) {
						const above = inputStrings[i - 1]
							.split('');
						const select = numbersWithIndexes.indexes[0] === 0 ? numberString.length + 1 : numberString.length + 2;
						const aboveAdjacent = above
							.splice(numbersWithIndexes.indexes[0] === 0 ? 0 : (numbersWithIndexes.indexes[0] - 1), select)
						if (aboveAdjacent.some(element => symbols.includes(element))) {
							sum += Number(numberString);
							numberString = '';
							numbersWithIndexes = {
								num: 0,
								indexes: []
							}

							continue;
						}
					}

					if (numbersWithIndexes.indexes[0] !== 0 &&
						symbols.indexOf(inputStringChars[numbersWithIndexes.indexes[0] - 1]) > -1) {
						sum += Number(numberString);
						numberString = '';
						numbersWithIndexes = {
							num: 0,
							indexes: []
						}

						continue;
					}

					if (numbersWithIndexes.indexes[numbersWithIndexes.indexes.length - 1] < (inputStringChars.length - 1) &&
						symbols.indexOf(inputStringChars[numbersWithIndexes.indexes[numbersWithIndexes.indexes.length - 1] + 1]) > -1) {
						sum += Number(numberString);
						numberString = '';
						numbersWithIndexes = {
							num: 0,
							indexes: []
						}

						continue;
					}

					if (i < (inputStrings.length - 1)) {
						const below = inputStrings[i + 1]
						.split('');
						const select = numbersWithIndexes.indexes[0] === 0 ? numberString.length + 1 : numberString.length + 2;
						const belowAdjacent = below
							.splice(numbersWithIndexes.indexes[0] === 0 ? 0 : (numbersWithIndexes.indexes[0] - 1), select)
						if (belowAdjacent.some(element => symbols.includes(element))) {
							sum += Number(numberString);
							numberString = '';
							numbersWithIndexes = {
								num: 0,
								indexes: []
							}

							continue;
						}
					}

					numberString = '';
					numbersWithIndexes = {
						num: 0,
						indexes: []
					}
				}
			}
		}

		return sum;
	}

	public static getDay4Part1Answer(inputStrings: string[]): number {
		const day4Cards = AdventOfCodeService.transformDay4Input(inputStrings);
		let sum = 0;
		for (const day4Card of day4Cards) {
			let matches = day4Card.cardNumbers
				.filter(x => day4Card.winningNumbers.includes(x))
				.length;
			let points = matches > 0 ? 1 : 0;
			if (matches > 1) {
				for (let i = 0; i < (matches - 1); i++) {
					points = points * 2;
				}
			}

			sum += points;
		}

		return sum;
	}

	public static getDay4Part2Answer(inputStrings: string[]): number {
		const day4Cards = AdventOfCodeService.transformDay4Input(inputStrings);
		for (let i = 0; i < day4Cards.length; i++) {
			const day4Card = day4Cards[i];
			for (let j = 0; j < day4Card.copies; j++) {
				let matches = day4Card.cardNumbers
					.filter(x => day4Card.winningNumbers.includes(x))
					.length;
				for (let k = 1; k < (matches + 1); k++) {
					if (i + k < day4Cards.length) {
						day4Cards[i + k].copies++;
					}
				}
			}
		}

		return day4Cards
			.map(x => x.copies)
			.reduce((acc, current) => acc + current, 0);
	}

	public static getDay5Part1Answer(): number {
		const numbers1 = AdventOfCodeService.getNextMap(day5Seeds, day5SeedToSoilMap);
		const numbers2 = AdventOfCodeService.getNextMap(numbers1, day5SoilToFertilizerMap);
		const numbers3 = AdventOfCodeService.getNextMap(numbers2, day5FertilizerToWaterMap);
		const numbers4 = AdventOfCodeService.getNextMap(numbers3, day5WaterToLightMap);
		const numbers5 = AdventOfCodeService.getNextMap(numbers4, day5LightToTemperatureMap);
		const numbers6 = AdventOfCodeService.getNextMap(numbers5, day5TemperatureToHumidityMap);
		const numbers7 = AdventOfCodeService.getNextMap(numbers6, day5HumidityToLocationMap);
		return Math.min(...numbers7);
	}

	public static getDay5Part2Answer(): number {
		const startTime = Date.now();
		let smallestLocation = 999999999;
		for (let i = 0; i < day5Seeds.length; i += 2) {
			const start = day5Seeds[i];
			const length = day5Seeds[i + 1];
			for (let j = start; j < start + length; j++) {
				const numbers1 = AdventOfCodeService.getNextMap([j], day5SeedToSoilMap);
				const numbers2 = AdventOfCodeService.getNextMap(numbers1, day5SoilToFertilizerMap);
				const numbers3 = AdventOfCodeService.getNextMap(numbers2, day5FertilizerToWaterMap);
				const numbers4 = AdventOfCodeService.getNextMap(numbers3, day5WaterToLightMap);
				const numbers5 = AdventOfCodeService.getNextMap(numbers4, day5LightToTemperatureMap);
				const numbers6 = AdventOfCodeService.getNextMap(numbers5, day5TemperatureToHumidityMap);
				const numbers7 = AdventOfCodeService.getNextMap(numbers6, day5HumidityToLocationMap);
				numbers7.push(smallestLocation);
				smallestLocation = Math.min(...numbers7);
			}
		}

		const endTime = Date.now();

		const duration = endTime - startTime;
		const minutes = Math.floor(duration / 60000);
		const seconds = Math.floor((duration % 60000) / 1000);

		console.log(`Total processing time: ${minutes} minutes and ${seconds} seconds`);

		return smallestLocation;
	}

	public static getDay6Part1Answer() {
		let waysToWinList = [];
		for (let i = 0; i < 5; i++) {
			const waysToWin = AdventOfCodeService.day6CalculateWaysToWin(day6Input.time[i], day6Input.distance[i]);
			if (waysToWin > 0) {
				waysToWinList.push(waysToWin);
			}
		}

		return waysToWinList.reduce((acc, current) => acc * current, 1);;
	}

	public static day6CalculateWaysToWin(time: number, distance: number): number {
		let waysToWin = 0;
		for (let i = 1; i < (time + 1); i++) {
			if ((time - i) * i > distance) {
				waysToWin++;
			}
		}

		return waysToWin;
	}

	public static getNextMap(source: number[], map: number[][]): number[] {
		const output: number[] = [];
		for (let i = 0; i < source.length; i++) {
			const sourceNum = source[i]
			let tempOutput;
			for (let j = 0; j < map.length; j++) {
				const mapItem = map[j];
				if (sourceNum >= mapItem[1] &&
					sourceNum <= (mapItem[1] + (mapItem[2] - 1))) {
					tempOutput = mapItem[0] + (sourceNum - mapItem[1]);
					break;
				}
			}

			if (!tempOutput) {
				tempOutput = sourceNum;
			}

			output.push(tempOutput);
		}

		return output;
	}

	public static transformDay4Input(inputStrings: string[]): Day4Card[] {
		return inputStrings.map(x => {
			return {
				winningNumbers: x
					.replaceAll('   ', ' ')
					.replaceAll('  ',  ' ')
					.split(': ')[1]
					.split(' | ')[0]
					.split(' ')
					.map(y => Number(y)),
				cardNumbers: x
					.replaceAll('   ', ' ')
					.replaceAll('  ',  ' ')
					.split(': ')[1]
					.split(' | ')[1]
					.split(' ')
					.map(y => Number(y)),
				copies: 1
			}
		});
	}
}
