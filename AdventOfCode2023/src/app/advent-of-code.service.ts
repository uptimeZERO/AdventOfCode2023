import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AdventOfCodeService {

	constructor() { }

	public static getDay1Part1Answer(inputStrings: string[]) {
		let sum = 0;
		const validNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
		for (const inputString of inputStrings) {
			const inputStringChar = inputString.split('');
			let numberString = '';
			for (let i = 0; i < inputStringChar.length; i++) {
				if (validNumbers.includes(inputStringChar[i])) {
					numberString = inputStringChar[i];
					break;
				}
			}

			for (let i = (inputStringChar.length - 1); i >= 0; i--) {
				if (validNumbers.includes(inputStringChar[i])) {
					numberString = `${numberString}${inputStringChar[i]}`;
					break;
				}
			}

			sum += Number(numberString);
		}

		return sum;
	}

	public static getDay1Part2Answer(inputStrings: string[]) {
		const newInputStrings = [];
		for (let inputString of inputStrings) {
			const oldInputString = inputString;
			const newInputString = inputString
				.replaceAll('one', '1')
				.replaceAll('two', '2')
				.replaceAll('three', '3')
				.replaceAll('four', '4')
				.replaceAll('five', '5')
				.replaceAll('six', '6')
				.replaceAll('seven', '7')
				.replaceAll('eight', '8')
				.replaceAll('nine', '9');
			if (oldInputString !== newInputString) {
				console.log(`Big fat milk dem: ${oldInputString} => ${newInputString}`);
			}

			newInputStrings.push(newInputString);
		}

		return AdventOfCodeService.getDay1Part1Answer(newInputStrings);
	}
}
