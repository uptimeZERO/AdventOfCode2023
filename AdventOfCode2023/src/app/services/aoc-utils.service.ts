import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AocUtilsService {

	constructor() { }

	public static isNumber(stringChar: string, includeZero = false) {
		const validNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
		if (includeZero) {
			validNumbers.push('0');
		}

		return validNumbers.includes(stringChar);
	}
}
