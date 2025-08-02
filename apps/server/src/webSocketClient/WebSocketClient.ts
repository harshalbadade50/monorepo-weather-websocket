import WebSocket from 'ws';

import { CityTemperature } from "../data/DataAggregator"
import dataAggregator from '../data/DataAggregator';

export const StartWebSocketClient = () => {
    const PORT = 8765;

    const ws = new WebSocket(`ws://localhost:${PORT}`);

    ws.on('open', () => {
        console.log('Web Socket client Open.')
    })

    ws.on('message', (event: WebSocket.Data) => {
        const data: CityTemperature = JSON.parse(event.toString());
        const {city, temperature, timestamp} = data
        dataAggregator.addData({city, temperature, timestamp})
    })

    ws.on('error', (error) => {
        console.log('Web Socket client Error. - ', error)
    })

    ws.on('close', (event) => {
        console.log('Web Socket client closed - ', event)
    })
}