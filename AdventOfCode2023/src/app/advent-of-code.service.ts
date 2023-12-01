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
			for (const stringChar of inputStringChar) {
				if (validNumbers.includes(stringChar)) {
					numberString = stringChar;
					break;
				}
			}

			for (const stringChar of inputStringChar.reverse()) {
				if (validNumbers.includes(stringChar)) {
					numberString = `${numberString}${stringChar}`;
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
			newInputStrings.push(inputString
				.replaceAll('one', 'o1ne')
				.replaceAll('two', 't2wo')
				.replaceAll('three', 't3hree')
				.replaceAll('four', 'f4our')
				.replaceAll('five', 'f5ive')
				.replaceAll('six', 's6ix')
				.replaceAll('seven', 's7even')
				.replaceAll('eight', 'e8ight')
				.replaceAll('nine', 'n9ine'));
		}

		return AdventOfCodeService.getDay1Part1Answer(newInputStrings);
	}
}
