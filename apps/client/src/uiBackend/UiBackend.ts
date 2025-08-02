import axios from "axios"

interface OHLC {
    date: string
    o: number
    h: number
    l: number
    c: number
};

export type CityTemperatureOHLC = Record<string, OHLC>

export class UiBackend {

    public static baseUrl: string = 'http://localhost:3001'
    public static async getChartData(city: string): Promise<CityTemperatureOHLC> {
        const result = await axios.get(`${UiBackend.baseUrl}/temperature/${city}`)
        return result.data
    }
}