import React from 'react';
import { observer } from 'mobx-react-lite';


import Chart, {
  CommonSeriesSettings,
  Series,
  Reduction,
  ArgumentAxis,
  Label,
  Format,
  ValueAxis,
  Title,
  Legend,
  Export,
  Tooltip,
} from 'devextreme-react/chart';

import { useStore } from "../../hooks/useStore"

const customizeTooltip = (arg: any) => ({
    text: `Open: ${arg.openValue}°<br/>
    Close: ${arg.closeValue}°<br/>
    High: ${arg.highValue}°<br/>
    Low: ${arg.lowValue}°<br/>`,
});

interface CandleStickChartProps {
  city: string
}

export const CandleStickChart: React.FC<CandleStickChartProps> = observer( ({city}) => {

  const { chartStore: { chartData, xAxisDateRange } } = useStore()
  const chartDataSource = chartData[city]

  if(!chartDataSource) return <h2>City Data Not found.</h2>

  return (
      <Chart id="chart" title={`Hourly Aggregated ${city}'s Temperature`} dataSource={chartDataSource}>
        <CommonSeriesSettings argumentField="date" type="candlestick" />
        <Series
          name={`${city}`}
          openValueField="o"
          highValueField="h"
          lowValueField="l"
          closeValueField="c"
        >
          <Reduction color="red" />
        </Series>
        <ArgumentAxis tickInterval="hour"
          visualRange={{
            startValue: new Date(xAxisDateRange.startValue ?? ''),
            endValue: new Date(xAxisDateRange.endValue ?? ''),
          }} 
        >
          <Label format="yy-MM-dd HH:mm" />
        </ArgumentAxis>
        <ValueAxis tickInterval={1}>
          <Title text="Temperature" />
          <Label>
            <Format precision={0} />
          </Label>
        </ValueAxis>
        <Legend itemTextPosition="left" />
        <Tooltip
          enabled={true}
          location="edge"
          customizeTooltip={customizeTooltip}
        />
      </Chart>
  );
})
