import { Injectable } from '@angular/core';
import { AocUtilsService } from '../aoc-utils.service';

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

@Injectable({
	providedIn: 'root'
})
export class AocDay3Service {

	constructor() { }

	public getPart1Answer(inputStrings: string[]): number {
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
				if (AocUtilsService.isNumber(inputStringChars[j])) {
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
    
	public getPart2Answer(): number {
		return 0;
	}
}
