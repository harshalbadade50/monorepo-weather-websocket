import { DataAggregatorType, CityTemperatureOHLC } from "../data/DataAggregator"

export class TemperatureService{
    constructor(private dataAggregator: DataAggregatorType) {
    }

    public getCityTemperature(city: string): CityTemperatureOHLC | undefined {
        return this.dataAggregator.getCityData(city)
    }
}