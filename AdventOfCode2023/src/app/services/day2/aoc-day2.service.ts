import { Injectable } from '@angular/core';
import { AocUtilsService } from '../aoc-utils.service';

export interface Day2Game {
	id: number;
	games: Day2ColourCombination[];
};

export interface Day2ColourCombination {
	red: number;
	green: number;
	blue: number;
};

@Injectable({
	providedIn: 'root'
})
export class AocDay2Service {

	constructor() { }

	public getPart1Answer(
		inputStrings: string[],
		combination: Day2ColourCombination
	): number {
		let day2games = this.transformDay2Input(inputStrings);
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
    
	public getPart2Answer(
		inputStrings: string[]
	): number {
		let day2games = this.transformDay2Input(inputStrings);
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

	private transformDay2Input(inputStrings: string[]): Day2Game[] {
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
					if (AocUtilsService.isNumber(gameStringChar, true)) {
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
