import { Injectable } from '@angular/core';
import { day6Input } from 'src/app/inputs/day6-input';

@Injectable({
	providedIn: 'root'
})
export class AocDay6Service {

	constructor() { }

	public getPart1Answer() {
		let waysToWinList = [];
		for (let i = 0; i < day6Input.time.length; i++) {
			const waysToWin = this.day6CalculateWaysToWin(day6Input.time[i], day6Input.distance[i]);
			if (waysToWin > 0) {
				waysToWinList.push(waysToWin);
			}
		}

		return waysToWinList.reduce((acc, current) => acc * current, 1);;
	}
    
	public getPart2Answer() {
		return this.day6CalculateWaysToWin(
			Number(`${day6Input.time[0]}${day6Input.time[1]}${day6Input.time[2]}${day6Input.time[3]}`),
			Number(`${day6Input.distance[0]}${day6Input.distance[1]}${day6Input.distance[2]}${day6Input.distance[3]}`)
		);
	}

	private day6CalculateWaysToWin(time: number, distance: number): number {
		let waysToWin = 0;
		for (let i = 1; i < (time + 1); i++) {
			if ((time - i) * i > distance) {
				waysToWin++;
			}
		}

		return waysToWin;
	}
}
