import { Injectable } from '@angular/core';
import { day5FertilizerToWaterMap, day5HumidityToLocationMap, day5LightToTemperatureMap, day5SeedToSoilMap, day5Seeds, day5SoilToFertilizerMap, day5TemperatureToHumidityMap, day5WaterToLightMap } from 'src/app/inputs/day5-inputs';

@Injectable({
	providedIn: 'root'
})
export class AocDay5Service {

	constructor() { }

	public getPart1Answer(): number {
		const numbers1 = this.getNextMap(day5Seeds, day5SeedToSoilMap);
		const numbers2 = this.getNextMap(numbers1, day5SoilToFertilizerMap);
		const numbers3 = this.getNextMap(numbers2, day5FertilizerToWaterMap);
		const numbers4 = this.getNextMap(numbers3, day5WaterToLightMap);
		const numbers5 = this.getNextMap(numbers4, day5LightToTemperatureMap);
		const numbers6 = this.getNextMap(numbers5, day5TemperatureToHumidityMap);
		const numbers7 = this.getNextMap(numbers6, day5HumidityToLocationMap);
		return Math.min(...numbers7);
	}
    
	public getPart2Answer(): number {
		const startTime = Date.now();
		let smallestLocation = 999999999;
		for (let i = 0; i < day5Seeds.length; i += 2) {
			const start = day5Seeds[i];
			const length = day5Seeds[i + 1];
			for (let j = start; j < start + length; j++) {
				const numbers1 = this.getNextMap([j], day5SeedToSoilMap);
				const numbers2 = this.getNextMap(numbers1, day5SoilToFertilizerMap);
				const numbers3 = this.getNextMap(numbers2, day5FertilizerToWaterMap);
				const numbers4 = this.getNextMap(numbers3, day5WaterToLightMap);
				const numbers5 = this.getNextMap(numbers4, day5LightToTemperatureMap);
				const numbers6 = this.getNextMap(numbers5, day5TemperatureToHumidityMap);
				const numbers7 = this.getNextMap(numbers6, day5HumidityToLocationMap);
				numbers7.push(smallestLocation);
				smallestLocation = Math.min(...numbers7);
			}
		}

		const endTime = Date.now();

		const duration = endTime - startTime;
		const minutes = Math.floor(duration / 60000);
		const seconds = Math.floor((duration % 60000) / 1000);

		console.log(`Total processing time: ${minutes} minutes and ${seconds} seconds`);

		return smallestLocation;
	}

	private getNextMap(source: number[], map: number[][]): number[] {
		const output: number[] = [];
		for (let i = 0; i < source.length; i++) {
			const sourceNum = source[i]
			let tempOutput;
			for (let j = 0; j < map.length; j++) {
				const mapItem = map[j];
				if (sourceNum >= mapItem[1] &&
					sourceNum <= (mapItem[1] + (mapItem[2] - 1))) {
					tempOutput = mapItem[0] + (sourceNum - mapItem[1]);
					break;
				}
			}

			if (!tempOutput) {
				tempOutput = sourceNum;
			}

			output.push(tempOutput);
		}

		return output;
	}
}
