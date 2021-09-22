import './donut.scss'
import * as React from "react";
import {
    Chart,
    ChartLegend,
    ChartSeries,
    ChartSeriesItem,
    ChartSeriesLabels,
} from "@progress/kendo-react-charts";
import "hammerjs";

// https://www.telerik.com/kendo-react-ui/getting-started/

const data = [{
    "kind": "Hydroelectric", "share": 0.175
}, {
    "kind": "Nuclear", "share": 0.238
}, {
    "kind": "Coal", "share": 0.118
}, {
    "kind": "Solar", "share": 0.052
}, {
    "kind": "Wind", "share": 0.225
}, {
    "kind": "Other", "share": 0.192
}]

const donutCenterRenderer = () => (
    <span>
        <h3>22.5%</h3> of which renewables
    </span>
);

const labelContent = (e) => e.category;

const ChartContainer = () => (
    <Chart donutCenterRender={donutCenterRenderer}>
        <ChartSeries>
            <ChartSeriesItem
                type="donut"
                data={data}
                categoryField="kind"
                field="share"
            >
                <ChartSeriesLabels
                    color="#fff"
                    background="none"
                    content={labelContent}
                />
            </ChartSeriesItem>
        </ChartSeries>
        <ChartLegend visible={true} />
    </Chart>
);

export default function Donut() {
    return (
        <div className="donut">
            <ChartContainer />
        </div>
    )
}
