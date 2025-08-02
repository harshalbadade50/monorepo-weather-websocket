import type { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'

import { TemperatureService } from "../service/TemperatureService";

export class TemperatureEndpoints {
    constructor(private temperatureService: TemperatureService) {
    }

    public getCityTemperature: RequestHandler = async (req, res, next) => {
        try {
            const city = req.params.city
            if (city) {
                const result = await this.temperatureService.getCityTemperature(city)
                if (result) {
                    res.status(StatusCodes.OK).json(result)
                } else {
                    res.status(StatusCodes.NOT_FOUND).send()
                } 
            } else {
                res.status(StatusCodes.BAD_REQUEST).send()
            }
        } catch(err) {
            throw new Error(`Could not fetch temperature details - ${err} `)
        }
    }
}