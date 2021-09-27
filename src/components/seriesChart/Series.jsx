import './series.scss'
import * as React from "react";
import "hammerjs";
import {
    Chart,
    ChartSeries,
    ChartSeriesItem,
    ChartValueAxis,
    ChartValueAxisItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
    ChartLegend,
    ChartTooltip
} from "@progress/kendo-react-charts";

//https://www.telerik.com/forums/series-legend-show-hide-chart-data-programmatically
//think can just dump all data and let https://www.telerik.com/kendo-react-ui/components/charts/chart/elements/axes/ handle Selecting Time Intervals

const categoryAxisMax = new Date(2000, 1, 0);
const categoryAxisMaxDivisions = 10;

const ChartContainer = (props) => {
    const { wrong_move, star_1, star_2, star_3, correct_move, wrong_position, correct_position, group_sync_delay } = props.data

    const DanceMoveAccuracyVisibility = props.mode === "Dance Move Accuracy"
    const DanceMoveCorrectnessVisibility = props.mode === "Dance Move Correctness"
    const PositionCorrectnessVisibility = props.mode === "Position Correctness"
    const SyncDelayVisibility = props.mode === "Avg Group Sync Delay (ms)"

    const renderToolTipGenerator = () => {
        const renderTooltip = (context) => {
            const { series, value } = context.point || context;
            return (
                <div>
                    [{value}] -
                    {series.name}
                    {/* {String(value * 100).slice(0, 5)}% ({Math.round(value * total)}/{total}) */}
                </div>
            );
        };

        return renderTooltip
    }

    return (
        <Chart
            pannable={{
                lock: "y",
            }}
            zoomable={{
                mousewheel: {
                    lock: "y",
                },
                selection: {
                    lock: "y",
                },
            }}
        >
            <ChartCategoryAxis>
                <ChartCategoryAxisItem
                    max={categoryAxisMax}
                    maxDivisions={categoryAxisMaxDivisions}
                />
            </ChartCategoryAxis>
            <ChartValueAxis>
                <ChartValueAxisItem
                    labels={{
                        visible: true,
                        format: "#",
                    }}
                />
            </ChartValueAxis>
            <ChartTooltip render={renderToolTipGenerator()} />
            <ChartSeries>

                <ChartSeriesItem visible={DanceMoveAccuracyVisibility || DanceMoveCorrectnessVisibility}
                    name="wrong dance move " data={wrong_move} stack={{ group: 'a' }} field="count" categoryField="timestamp" />
                <ChartSeriesItem visible={DanceMoveAccuracyVisibility}
                    name="★ dance move" data={star_1} stack={{ group: 'a' }} field="count" categoryField="timestamp" />
                <ChartSeriesItem visible={DanceMoveAccuracyVisibility}
                    name="★★ dance move" data={star_2} stack={{ group: 'a' }} field="count" categoryField="timestamp" />
                <ChartSeriesItem visible={DanceMoveAccuracyVisibility}
                    name="★★★ dance move" data={star_3} stack={{ group: 'a' }} field="count" categoryField="timestamp" >
                    {/* <ChartSeriesLabels
                        color="#fff"
                        background="none"
                        content={labelContent}
                    /> */}
                </ChartSeriesItem>
                <ChartSeriesItem visible={DanceMoveCorrectnessVisibility}
                    name="correct dance move " data={correct_move} stack={{ group: 'a' }} field="count" categoryField="timestamp" />

                <ChartSeriesItem visible={PositionCorrectnessVisibility} name="wrong position" data={wrong_position} stack={{ group: 'b' }} field="count" categoryField="timestamp" />
                <ChartSeriesItem visible={PositionCorrectnessVisibility} name="correct position" data={correct_position} stack={{ group: 'b' }} field="count" categoryField="timestamp" />

                <ChartSeriesItem visible={SyncDelayVisibility} name="avg group sync delay (ms)" data={group_sync_delay} stack={{ group: 'c' }} field="count" categoryField="timestamp" />
            </ChartSeries>
            <ChartLegend position="bottom" orientation="horizontal" visible={true} />

        </Chart>
    );
};

export default function Series(props) {
    return (
        <div className="series">
            <h2>{props.title}</h2>
            <div className="chart">
                <ChartContainer data={props.data} mode={props.mode} />
            </div>
        </div>
    )
}
