import { makeObservable, observable } from "mobx"
import dayjs from 'dayjs'
import minMax from 'dayjs/plugin/minMax';

import { UiBackend } from "../uiBackend/UiBackend"
import type { CityTemperatureOHLC } from "../uiBackend/UiBackend"

dayjs.extend(minMax);

export interface CityDataSouce {
    date: Date
    o: number
    h: number
    l: number
    c: number
}

export interface XAxisDateRange {
    startValue: string | undefined
    endValue: string | undefined
}

export type ChartDataSource = Record<string, CityDataSouce[] >

export class ChartStore {
    @observable
    public chartData: ChartDataSource = {}

    @observable
    public xAxisDateRange: XAxisDateRange = { startValue: '', endValue: '' }

    constructor() {
        makeObservable(this)
    }

    public setCityData = (city: string, data: CityTemperatureOHLC) => {
        const synthesizedData = this.synthesizeData(data)
        this.chartData[city] = synthesizedData
    }

    private synthesizeData(data: CityTemperatureOHLC): CityDataSouce[] {
        const synthesizedCityData: CityDataSouce[] = []
        const timeStampRanges: string[] = []
        
        Object.keys(data).forEach(key => {
            timeStampRanges.push(key)
            synthesizedCityData.push({
                date: new Date(key),
                o: data[key].o,
                h: data[key].h,
                l: data[key].l,
                c: data[key].c
            })
        })

        const dayjsTimes = timeStampRanges.map(ts => dayjs(ts))
        this.xAxisDateRange = {
            startValue: dayjs.min(...dayjsTimes)?.format('YYYY-MM-DD HH:00'),
            endValue: dayjs.max(...dayjsTimes)?.format('YYYY-MM-DD HH:00')
        }

        return synthesizedCityData
    }

    public getChartData = async (city: string) => {
        try {
            const result = await UiBackend.getChartData(city)
            this.setCityData(city, result)
        } catch(err) {
            console.log('Error in fetching Chart Data - ', err)
        }
    }
}