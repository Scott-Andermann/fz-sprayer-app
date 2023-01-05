import React, { useState } from 'react';
import { Text, View, Dimensions, StyleSheet, processColor } from 'react-native';
// import {
//     LineChart
// } from 'react-native-chart-kit';
import { LineChart } from 'react-native-charts-wrapper';
import { red, lightGunmetal, darkGreen, lightGreen, whiteTransparent } from '../lib/colors';


interface description {
    name: string
}

interface props {
    timeArray: Array<string>,
    totalFlow: Array<Number>,
    description: description
}

const JobCard = ({ timeArray, totalFlow, description }: props) => {

    // const line = {
    //     labels: timeArray,
    //     datasets: [
    //         {
    //             data: totalFlow,
    //             strokeWidth: 2, // optional
    //         },
    //     ],
    // }
    const line = {
        datasets: [
          {
            label: 'flowrate',
            values: timeArray.map((element, index) => ({x: timeArray[index], y: totalFlow[index]})),
          },
        ],
    }

    const lineData = {dataSets:
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
                labelCountForce: true
            }
        },
        xAxis: {
            position: 'BOTTOM',
            textColor: processColor('white'),
            drawGridLines: false,
        },
        legend: {
            enabled: false
        }
    }

    return (
        <View style={styles.cardWrapper}>
            <Text style={styles.titleText}>{description['name']}</Text>
            <View style={styles.chartWrapper}>
                <LineChart style={styles.chart}
                    chartDescription={{text: ''}}
                    legend={config.legend}
                    touchEnabled={false}
                    marker={config.marker}
                    xAxis={config.xAxis}
                    yAxis={config.yAxis}
                    drawGridBackground={false}
                    data={lineData}
                />

            </View>
            {/* <LineChart
                data={line}
                width={Dimensions.get('window').width - 20}
                height={220}
                chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#fb8c00',
                    backgroundGradientTo: '#ffa726',
                    decimalPlaces: 1, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16,
                        padding: 10,
                        margin: 10,
                    }
                }}
                // bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
                withDots={false}
                // horizontalLabelRotation={45}
                // verticalLabelRotation={45}
            /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    cardWrapper: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        // justifyContent: 'center'
    },
    titleText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    chartWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: lightGunmetal,
        borderRadius: 10,
        padding: 10,
        height: 220,
        width: Dimensions.get('window').width - 40,
    },  
    chart: {
        flex: 1,
        height: '100%',
        width: '100%'
    }
})

export default JobCard;