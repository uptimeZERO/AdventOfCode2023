import { Injectable } from '@angular/core';
import { AocUtilsService } from 'src/app/services/aoc-utils.service';

@Injectable({
	providedIn: 'root'
})
export class AocDay1Service {

	constructor() { }

	public getPart1Answer(inputStrings: string[]): number {
		let sum = 0;
		for (const inputString of inputStrings) {
			const inputStringChar = inputString.split('');
			let numberString = '';
			for (const stringChar of inputStringChar) {
				if (AocUtilsService.isNumber(stringChar)) {
					numberString = stringChar;
					break;
				}
			}

			for (const stringChar of inputStringChar.reverse()) {
				if (AocUtilsService.isNumber(stringChar)) {
					numberString = `${numberString}${stringChar}`;
					break;
				}
			}

			sum += Number(numberString);
		}

		return sum;
	}
    
	public getPart2Answer(inputStrings: string[]): number {
		return this.getPart1Answer(inputStrings
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
}
