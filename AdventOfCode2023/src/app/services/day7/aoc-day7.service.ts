import { Injectable } from '@angular/core';
import { day7Input, day7InputExample, day7InputExample2, day7InputExample3 } from 'src/app/inputs/day7-input';

export interface Day7Hand {
	hand: string;
	handValue: number[];
	rank: number;
	bid: number;
	winnings: number;
	type: Day7HandType;
}

export enum Day7HandType {
	HighCard = 1,
	OnePair = 2,
	TwoPair = 3,
	ThreeOfAKind = 4,
	FullHouse = 5,
	FourOfAKind = 6,
	FiveOfAKind = 7
}

@Injectable({
	providedIn: 'root'
})
export class AocDay7Service {

	constructor() { }

	public getPart1Answer(): number {
		const day7Hands = this.transformDay7Input(day7Input);
		day7Hands
			.sort((a, b) => 
				a.type - b.type || 
				(a.handValue.find((item, index) => item !== b.handValue[index]) ?? a.handValue[0]) - (b.handValue[a.handValue.findIndex((item, index) => item !== b.handValue[index])] ?? b.handValue[0]))
		day7Hands.forEach(x => x.rank = (day7Hands.indexOf(x) + 1))
		day7Hands.forEach(x => x.winnings = x.rank * x.bid);
		return day7Hands.reduce((acc, item) => acc + item.winnings, 0);
	}

	public getPart2Answer(): number {
		return 0;
	}

	private transformDay7Input(inputStrings: string[]): Day7Hand[] {
		return inputStrings.map(x => {
			return {
				hand: x.split(' ')[0],
				handValue: this.getHandValue(x.split(' ')[0]),
				rank: 0,
				bid: +x.split(' ')[1],
				winnings: 0,
				type: this.getDay7HandType(x.split(' ')[0])
			}
		});
	}

	private getDay7HandType(hand: string): Day7HandType {
		const handCards = hand.split('');
		const occurrenceMap = this.mapOccurrences(handCards);
		if (occurrenceMap.some(x => x.repeatOccurrences === 5)) {
			return Day7HandType.FiveOfAKind;
		}

		if (occurrenceMap.some(x => x.repeatOccurrences === 4)) {
			return Day7HandType.FourOfAKind;
		}

		if (occurrenceMap.some(x => x.repeatOccurrences === 3) &&
			occurrenceMap.some(x => x.repeatOccurrences === 2)) {
			return Day7HandType.FullHouse;
		}

		if (occurrenceMap.some(x => x.repeatOccurrences === 3)) {
			return Day7HandType.ThreeOfAKind;
		}

		if (occurrenceMap.filter(x => x.repeatOccurrences === 2).length === 2) {
			return Day7HandType.TwoPair;
		}

		if (occurrenceMap.some(x => x.repeatOccurrences === 2)) {
			return Day7HandType.OnePair;
		}

		return Day7HandType.HighCard;
	}

	private getHandValue(hand: string): number[] {
		const handValue = [];

		for (const card of hand.split('')) {
			handValue.push(this.getCardValue(card));
		}

		return handValue;
	}

	private getCardValue(card: string): number {
		switch (card) {
			case '2':
				return 1;
			case '3':
				return 2;
			case '4':
				return 3;
			case '5':
				return 4;
			case '6':
				return 5;
			case '7':
				return 6;
			case '8':
				return 7;
			case '9':
				return 8;
			case 'T':
				return 9;
			case 'J':
				return 10;
			case 'Q':
				return 11;
			case 'K':
				return 12;
			case 'A':
				return 13;
			default:
				return 0;
		}
	}

	private mapOccurrences(hand: string[]): {
		card: string,
		repeatOccurrences: number
	}[] {
		const occurrenceMap: {
			card: string,
			repeatOccurrences: number
		}[] = [];

		for (const card of hand) {
			if (!occurrenceMap.find(x => x.card === card)) {
				occurrenceMap.push({
					card: card,
					repeatOccurrences: hand.filter(x => x === card).length
				});
			}
		}

		return occurrenceMap;
	}
}
