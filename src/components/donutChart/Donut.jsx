import './donut.scss'
import * as React from "react";
import {
    Chart,
    ChartLegend,
    ChartSeries,
    ChartSeriesItem,
    ChartSeriesLabels,
    ChartTitle,
    ChartTooltip
} from "@progress/kendo-react-charts";
import "hammerjs";

// https://www.telerik.com/kendo-react-ui/getting-started/

const donutCenterGenerator = (text) => {
    const donutCenterRenderer = () => (
        <span>
            <h3>{text}</h3>
        </span>
    );

    return donutCenterRenderer
}

const labelContent = (e) => e.category;

const renderToolTipGenerator = (total) => {
    const renderTooltip = (context) => {
        // const { category, series, value } = context.point || context;
        const { value } = context.point || context;
        return (
            <div>
                {/* {category} */}
                {/* ({series.name}) */}
                {String(value * 100).slice(0, 5)}% ({Math.round(value * total)}/{total})
            </div>
        );
    };

    return renderTooltip
}


const ChartContainer = (props) => (
    <Chart donutCenterRender={donutCenterGenerator(props.centerText)}>
        <ChartTitle text="" />
        <ChartTooltip render={renderToolTipGenerator(props.total)} />
        <ChartSeries>
            <ChartSeriesItem
                name="user1"
                type="donut"
                data={props.data}
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
        <ChartLegend visible={false} />
    </Chart>
);

export default function Donut(props) {
    return (
        <div className="donut">
            <h2>{props.title}</h2>
            <div className="chart">
                <ChartContainer data={props.data} centerText={props.centerText} total={props.total} />
            </div>
        </div>
    )
}
