import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc);
dayjs.extend(timezone);

export interface CityTemperature {
    city: string
    timestamp: string
    temperature: number
}

interface OHLC {
    date: string
    o: number
    h: number
    l: number
    c: number
};

export type CityTemperatureOHLC = Record<string, OHLC>
export type AllCityTemperatureOHLC = Record<string, CityTemperatureOHLC>

class DataAggregator{
    private cityWiseHourlyTemperature: AllCityTemperatureOHLC = {};
    
    constructor() {}

    private getLocalTimeStampDate(timestamp: string) : string {
        const localFormatDate = dayjs.utc(timestamp).local()
        return localFormatDate.startOf('hour').format('YYYY-MM-DD HH:00')
    }

    public addData(eventData: CityTemperature) {
        try {
            const { city, temperature, timestamp } = eventData
            const hourlyStamp = this.getLocalTimeStampDate(timestamp)

            if(!this.cityWiseHourlyTemperature[city]) {
                this.cityWiseHourlyTemperature[city] = {}
            }

            let cityData = this.cityWiseHourlyTemperature[city]
            const ohlc = cityData[hourlyStamp]
            
            if(!ohlc) {
                cityData[hourlyStamp] = {
                    date: hourlyStamp,
                    o: temperature,
                    h: temperature,
                    l: temperature,
                    c: temperature
                }
            } else {
                ohlc.h = Math.max(temperature, ohlc.h)
                ohlc.l = Math.min(temperature, ohlc.l)
                ohlc.c = temperature
            }
            console.log('cityWiseHourlyTemperature - ', this.cityWiseHourlyTemperature) 
        } catch(err) {
            throw new Error(`Something went wrong in storing data - ${err}`)
        }
    }

    public getCityData(city: string) {
        return this.cityWiseHourlyTemperature[city]
    }
}
const dataAggregator = new DataAggregator
export default dataAggregator

export type DataAggregatorType = InstanceType<typeof DataAggregator>