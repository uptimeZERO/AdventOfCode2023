import { Component, OnInit } from '@angular/core';
import { AdventOfCodeService } from '../advent-of-code.service';
import { day1input } from './day1-input';

@Component({
	selector: 'app-advent-of-code2023',
	templateUrl: './advent-of-code2023.component.html',
	styleUrls: ['./advent-of-code2023.component.scss']
})
export class AdventOfCode2023Component implements OnInit {
	public day1Part1Answer: number;
	public day1Part2Answer: number;

	constructor() {
		this.day1Part1Answer = AdventOfCodeService.getDay1Part1Answer(day1input);
		this.day1Part2Answer = AdventOfCodeService.getDay1Part2Answer(day1input);
	}

	ngOnInit(): void {

	}
}
