import { Component, OnInit } from '@angular/core';
import { day1Input } from '../inputs/day1-input';
import { day2Input } from '../inputs/day2-input';
import { day3Input } from '../inputs/day3-input';
import { day4Input } from '../inputs/day4-input';
import { AocDay1Service } from '../services/day1/aoc-day1.service';
import { AocDay2Service } from '../services/day2/aoc-day2.service';
import { AocDay3Service } from '../services/day3/aoc-day3.service';
import { AocDay4Service } from '../services/day4/aoc-day4.service';
import { AocDay5Service } from '../services/day5/aoc-day5.service';
import { AocDay6Service } from '../services/day6/aoc-day6.service';
import { AocDay7Service } from '../services/day7/aoc-day7.service';

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
	
	public day6Part1Answer: number = 0;
	public day6Part2Answer: number = 0;
	
	public day7Part1Answer: number = 0;
	public day7Part2Answer: number = 0;

	constructor(
		private aocDay1Service: AocDay1Service,
		private aocDay2Service: AocDay2Service,
		private aocDay3Service: AocDay3Service,
		private aocDay4Service: AocDay4Service,
		private aocDay5Service: AocDay5Service,
		private aocDay6Service: AocDay6Service,
		private aocDay7Service: AocDay7Service,
	) {
		this.day1Part1Answer = this.aocDay1Service.getPart1Answer(day1Input);
		this.day1Part2Answer = this.aocDay1Service.getPart2Answer(day1Input);

		this.day2Part1Answer = this.aocDay2Service.getPart1Answer(
			day2Input,
			{red: 12, green: 13, blue: 14});

		this.day2Part2Answer = this.aocDay2Service.getPart2Answer(day2Input);
		
		this.day3Part1Answer = this.aocDay3Service.getPart1Answer(day3Input);
		// this.day3Part2Answer = this.aocDay3Service.getPart2Answer(day3Input);

		this.day4Part1Answer = this.aocDay4Service.getPart1Answer(day4Input);
		this.day4Part2Answer = this.aocDay4Service.getPart2Answer(day4Input);

		this.day6Part1Answer = this.aocDay6Service.getPart1Answer();
		this.day6Part2Answer = this.aocDay6Service.getPart2Answer();

		this.day7Part1Answer = this.aocDay7Service.getPart1Answer();
		// this.day7Part2Answer = this.aocDay7Service.getPart2Answer();
	}

	ngOnInit(): void {

	}

	public getDay5() {
		this.day5Part1Answer = this.aocDay5Service.getPart1Answer();
		this.day5Part2Answer = this.aocDay5Service.getPart2Answer();
	}
}
