import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AdventOfCode2023Component } from './advent-of-code2023/advent-of-code2023.component';
import { AocUtilsService } from './services/aoc-utils.service';
import { AocDay1Service } from './services/day1/aoc-day1.service';
import { AocDay2Service } from './services/day2/aoc-day2.service';
import { AocDay3Service } from './services/day3/aoc-day3.service';
import { AocDay4Service } from './services/day4/aoc-day4.service';
import { AocDay5Service } from './services/day5/aoc-day5.service';
import { AocDay6Service } from './services/day6/aoc-day6.service';
import { AocDay7Service } from './services/day7/aoc-day7.service';

@NgModule({
	declarations: [
		AppComponent,
		AdventOfCode2023Component,
	],
	imports: [
		BrowserModule
	],
	providers: [],
	bootstrap: [
		AppComponent,
		AocUtilsService,
		AocDay1Service,
		AocDay2Service,
		AocDay3Service,
		AocDay4Service,
		AocDay5Service,
		AocDay6Service,
		AocDay7Service,
	],
})
export class AppModule { }
