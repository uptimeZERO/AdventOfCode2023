import { Injectable } from '@angular/core';

export interface Day7Hand {
	hand: string;
	rank: number;
	bid: number;
	winnings: number;
	type: Day7HandType;
}

export enum Day7HandType {
	None = 0,
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

	// public getPart1Answer(): number {
	// 	const input = AocUtilsService.transformDay7Input(day7InputExample);
		
	// 	return 0;
	// }
    
	// public getPart2Answer(): number {
	// 	return 0;
	// }

	// private transformDay7Input(inputStrings: string[]): Day7Hand[] {
	// 	return inputStrings.map(x => {
	// 		return {
	// 			hand: x.split(' ')[0],
	// 			rank: 0,
	// 			bid: +x.split(' ')[1],
	// 			winnings: 0,
	// 			type: AocUtilsService.getDay7HandType(x)
	// 		}
	// 	});
	// }

	// private getDay7HandType(hand: string): Day7HandType {
	// 	const handCards = hand.split('');
	// 	if (handCards.every(x => x === handCards[0])) {
	// 		return Day7HandType.FiveOfAKind;
	// 	}

	// 	if (handCards.some(x => handCards.filter(y => y === x).length === 4)) {
	// 		return Day7HandType.FourOfAKind;
	// 	}

	// 	if ()

	// 	return Day7HandType.None;
	// }
}
