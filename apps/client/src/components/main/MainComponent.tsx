import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';

import { useStore } from "../../hooks/useStore"
import {CandleStickChart} from "../charts/CandleStickChart"
import "./MainComponent.css"

const CITY_LIST = ['Berlin', 'NewYork', 'Tokyo', 'SaoPaulo', 'CapeTown']

export const MainComponent: React.FC = () => {
    const { chartStore: { getChartData } } = useStore()
    const [city, setCity] = React.useState('Berlin');

    useEffect(() => {
        getChartData(city)
    }, [city])

    const handleChange = (event: SelectChangeEvent) => {
        setCity(event.target.value as string);
    };

    const refreshData = () => {
        getChartData(city)
    }

    return (
        <div>
            <Container className='top-container'>
                <Box className="controls-container">
                    <FormControl className='select-input'>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={city}
                            label="Cities"
                            onChange={handleChange}
                        >
                            {CITY_LIST.map((val) => {
                                return (
                                    <MenuItem key={val} value={val}>{val}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    <Button variant="outlined" className='refresh-button' onClick={refreshData}>
                        <RefreshIcon color="primary"  />
                    </Button>
                </Box>
                <CandleStickChart city={city}/>
            </Container>
        </div>
    )
}