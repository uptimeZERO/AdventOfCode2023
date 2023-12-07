import { Injectable } from '@angular/core';

export interface Day4Card {
	winningNumbers: number[];
	cardNumbers: number[];
	copies: number;
}

@Injectable({
	providedIn: 'root'
})
export class AocDay4Service {

	constructor() { }

	public getPart1Answer(inputStrings: string[]): number {
		const day4Cards = this.transformDay4Input(inputStrings);
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
    
	public getPart2Answer(inputStrings: string[]): number {
		const day4Cards = this.transformDay4Input(inputStrings);
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

	private transformDay4Input(inputStrings: string[]): Day4Card[] {
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
