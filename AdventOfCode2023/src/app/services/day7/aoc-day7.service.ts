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
		const day7Hands = this.transformDay7InputForPart1(day7Input);
		day7Hands
			.sort((a, b) => 
				a.type - b.type || 
				(a.handValue.find((item, index) => item !== b.handValue[index]) ?? a.handValue[0]) - (b.handValue[a.handValue.findIndex((item, index) => item !== b.handValue[index])] ?? b.handValue[0]))
		day7Hands.forEach(x => x.rank = (day7Hands.indexOf(x) + 1))
		day7Hands.forEach(x => x.winnings = x.rank * x.bid);
		return day7Hands.reduce((acc, item) => acc + item.winnings, 0);
	}

	public getPart2Answer(): number {
		const day7Hands = this.transformDay7InputForPart2(day7Input);
		day7Hands
			.sort((a, b) => 
				a.type - b.type || 
				(a.handValue.find((item, index) => item !== b.handValue[index]) ?? a.handValue[0]) - (b.handValue[a.handValue.findIndex((item, index) => item !== b.handValue[index])] ?? b.handValue[0]))
		day7Hands.forEach(x => x.rank = (day7Hands.indexOf(x) + 1))
		day7Hands.forEach(x => x.winnings = x.rank * x.bid);
		return day7Hands.reduce((acc, item) => acc + item.winnings, 0);
	}

	private transformDay7InputForPart1(inputStrings: string[]): Day7Hand[] {
		return inputStrings.map(x => {
			return {
				hand: x.split(' ')[0],
				handValue: this.getHandValue(x.split(' ')[0]),
				rank: 0,
				bid: +x.split(' ')[1],
				winnings: 0,
				type: this.getDay7HandTypeForPart1(x.split(' ')[0])
			}
		});
	}

	private transformDay7InputForPart2(inputStrings: string[]): Day7Hand[] {
		return inputStrings.map(x => {
			return {
				hand: x.split(' ')[0],
				handValue: this.getHandValue(x.split(' ')[0]),
				rank: 0,
				bid: +x.split(' ')[1],
				winnings: 0,
				type: this.getDay7HandTypeForPart2(x.split(' ')[0])
			}
		});
	}

	private getDay7HandTypeForPart1(hand: string): Day7HandType {
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

	private getDay7HandTypeForPart2(hand: string): Day7HandType {
		const handCards = hand.split('');
		const occurrenceMap = this.mapOccurrences(handCards);
		if (occurrenceMap.some(x => x.repeatOccurrences === 5)) {
			return Day7HandType.FiveOfAKind;
		}

		if (occurrenceMap.some(x => x.repeatOccurrences === 4)) {
			if (occurrenceMap.find(x => x = {card: 'J', repeatOccurrences: 1})) {
				const replacementCard = occurrenceMap.find(x => x.repeatOccurrences === 4)?.card ?? 'J';
				this.getDay7HandTypeForPart2(hand.replace('J', replacementCard));
			}

			return Day7HandType.FourOfAKind;
		}

		if (occurrenceMap.some(x => x.repeatOccurrences === 3) &&
			occurrenceMap.some(x => x.repeatOccurrences === 2)) {
			const jokerOccurence = occurrenceMap.find(x => x.card === 'J');
			if (jokerOccurence) {
				let replacementCard;
				if (jokerOccurence.repeatOccurrences === 2) {
					replacementCard = occurrenceMap.find(x => x.repeatOccurrences === 3)?.card ?? 'J';
				} else {
					replacementCard = occurrenceMap.find(x => x.repeatOccurrences === 2)?.card ?? 'J';
				}
				
				this.getDay7HandTypeForPart2(hand.replaceAll('J', replacementCard));
			}

			return Day7HandType.FullHouse;
		}

		if (occurrenceMap.some(x => x.repeatOccurrences === 3)) {
			const jokerOccurence = occurrenceMap.find(x => x.card === 'J');
			if (jokerOccurence) {
				let replacementCard;
				if (jokerOccurence.repeatOccurrences === 3) {
					replacementCard = occurrenceMap.filter(x => x.repeatOccurrences === 1)[0].card;
				} else {
					replacementCard = occurrenceMap.find(x => x.repeatOccurrences === 3)?.card ?? 'J';
				}

				this.getDay7HandTypeForPart2(hand.replaceAll('J', replacementCard));
			}

			return Day7HandType.ThreeOfAKind;
		}

		if (occurrenceMap.filter(x => x.repeatOccurrences === 2).length === 2) {
			const jokerOccurence = occurrenceMap.find(x => x.card === 'J');
			if (jokerOccurence) {
				let replacementCard;
				if (jokerOccurence.repeatOccurrences === 2) {
					replacementCard = occurrenceMap.find(x => x.repeatOccurrences === 2 && x.card !== 'J')?.card ?? 'J';
				} else {
					replacementCard = occurrenceMap.filter(x => x.repeatOccurrences === 2 && x.card !== 'J')[0].card;
				}

				this.getDay7HandTypeForPart2(hand.replaceAll('J', replacementCard));
			}
			return Day7HandType.TwoPair;
		}

		if (occurrenceMap.some(x => x.repeatOccurrences === 2)) {
			const jokerOccurence = occurrenceMap.find(x => x.card === 'J');
			if (jokerOccurence) {
				let replacementCard;
				if (jokerOccurence.repeatOccurrences === 2) {
					replacementCard = occurrenceMap.filter(x => x.card !== 'J')[0].card ?? 'J';
				} else {
					replacementCard = occurrenceMap.filter(x => x.repeatOccurrences === 2 && x.card !== 'J')[0].card;
				}

				this.getDay7HandTypeForPart2(hand.replaceAll('J', replacementCard));
			}

			return Day7HandType.OnePair;
		}

		
		const jokerOccurence = occurrenceMap.find(x => x.card === 'J');
		if (jokerOccurence) {
			let replacementCard = occurrenceMap.filter(x => x.card !== 'J')[0].card;
			this.getDay7HandTypeForPart2(hand.replaceAll('J', replacementCard));
		}

		return Day7HandType.HighCard;
	}

	private getHandValue(hand: string): number[] {
		const handValue = [];

		for (const card of hand.split('')) {
			handValue.push(this.getCardValueForPart1(card));
		}

		return handValue;
	}

	private getCardValueForPart1(card: string): number {
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

	private getCardValueForPart2(card: string): number {
		switch (card) {
			case 'J':
				return 0;
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
			case 'Q':
				return 10;
			case 'K':
				return 11;
			case 'A':
				return 12;
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
