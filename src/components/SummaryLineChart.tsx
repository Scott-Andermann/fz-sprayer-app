import React from 'react';
import { LineChart } from 'react-native-charts-wrapper';

import { processColor, StyleSheet } from 'react-native';
import { lightGreen, whiteTransparent, darkGreen } from '../lib/colors';

interface props {
    timeArray: Array<string>,
    totalFlow: Array<number>,
}

const SummaryLineChart = ({timeArray, totalFlow}: props) => {

    const lineData = {
        dataSets:
            [
                {
                    label: "Total Flow",
                    values: totalFlow,
                    config: {
                        drawCircleHole: false,
                        drawCircles: false,
                        drawValues: false,
                        mode: 'LINEAR',
                        lineWidth: 2,
                        color: processColor(lightGreen),
                        textColor: processColor('white'),
                        drawFilled: true,
                        fillGradient: {
                            colors: [processColor(whiteTransparent), processColor(darkGreen)],
                            positions: [0, 0.5],
                            angle: 90,
                            orientation: "BL_TR"
                        },
                        fillAlpha: 500,
                    }
                }
            ]
    }

    const config = {
        marker: {
            enabled: false,
            markerColor: processColor('black'),
            textColor: processColor('white'),
        },
        yAxis: {
            right: {
                enabled: false,
                drawGridLines: false,
            },
            left: {
                enabled: true,
                drawGridLines: true,
                gridColor: processColor('black'),
                drawAxisLine: false,
                textColor: processColor('white'),
                position: 'OUTSIDE_CHART',
                yOffset: 0,
                labelCount: 6,
                labelCountForce: true,
                axisMinimum: 0,
            }
        },
        xAxis: {
            position: 'BOTTOM',
            textColor: processColor('white'),
            drawGridLines: false,
            valueFormatter: timeArray
        },
        legend: {
            enabled: false
        }
    }

    return ( 
        <LineChart style={styles.chart}
        chartDescription={{ text: '' }}
        legend={config.legend}
        touchEnabled={false}
        marker={config.marker}
        xAxis={config.xAxis}
        yAxis={config.yAxis}
        drawGridBackground={false}
        data={lineData}
        />
     );
}

const styles = StyleSheet.create({
    chart: {
        flex: 1,
        height: '100%',
        width: '100%'
    }
})
 
export default SummaryLineChart;