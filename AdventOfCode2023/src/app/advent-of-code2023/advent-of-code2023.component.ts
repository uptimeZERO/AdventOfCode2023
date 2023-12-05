import { Component, OnInit } from '@angular/core';
import { AdventOfCodeService } from '../advent-of-code.service';
import { day1Input } from './day1-input';
import { day2Input } from './day2-input';
import { day3Input } from './day3-input';
import { day4Input } from './day4-input';

@Component({
	selector: 'app-advent-of-code2023',
	templateUrl: './advent-of-code2023.component.html',
	styleUrls: ['./advent-of-code2023.component.scss']
})
export class AdventOfCode2023Component implements OnInit {
	public day1Part1Answer: number = 0;
	public day1Part2Answer: number = 0;

	public day2Part1Answer: number = 0;
	public day2Part2Answer: number = 0;

	public day3Part1Answer: number = 0;
	public day3Part2Answer: number = 0;

	public day4Part1Answer: number = 0;
	public day4Part2Answer: number = 0;
	
	public day5Part1Answer: number = 0;
	public day5Part2Answer: number = 0;

	constructor() {
		this.day1Part1Answer = AdventOfCodeService.getDay1Part1Answer(day1Input);
		this.day1Part2Answer = AdventOfCodeService.getDay1Part2Answer(day1Input);

		this.day2Part1Answer = AdventOfCodeService.getDay2Part1Answer(
			day2Input,
			{red: 12, green: 13, blue: 14});

		this.day2Part2Answer = AdventOfCodeService.getDay2Part2Answer(day2Input);
		
		this.day3Part1Answer = AdventOfCodeService.getDay3Part1Answer(day3Input);
		// this.day3Part2Answer = AdventOfCodeService.getDay3Part2Answer(day3Input);

		this.day4Part1Answer = AdventOfCodeService.getDay4Part1Answer(day4Input);
		this.day4Part2Answer = AdventOfCodeService.getDay4Part2Answer(day4Input);
	}

	ngOnInit(): void {

	}

	public getDay5() {
		this.day5Part1Answer = AdventOfCodeService.getDay5Part1Answer();
		this.day5Part2Answer = AdventOfCodeService.getDay5Part2Answer();
	}
}
