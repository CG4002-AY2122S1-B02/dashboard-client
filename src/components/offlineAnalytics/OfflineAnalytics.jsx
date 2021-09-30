import './offlineAnalytics.scss'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { UseAutocompleteStyles } from '../evaluator/Evaluator'
import { TextField } from '@material-ui/core';
import { useState, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { PathDanceOverview, PathDanceProgress } from '../../config';
import Donut from '../donutChart/Donut';
import { SecToTime } from '../timeline/Timeline';
import Series from '../seriesChart/Series';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';

const rangeOptions = {
    "last hour": {
        title: "last hour",
        start: Date.now() - 1 * 3600 * 1000
    },
    "last 3 hour": {
        title: "last 3 hour",
        start: Date.now() - 3 * 3600 * 1000
    },
    "last 6 hour": {
        title: "last 6 hour",
        start: Date.now() - 6 * 3600 * 1000
    },
    "last 24 hours": {
        title: "last 24 hours",
        start: Date.now() - 24 * 3600 * 1000
    },
    "last 7 days": {
        title: "last 7 days",
        start: Date.now() - 7 * 24 * 3600 * 1000
    },
    "last 30 days": {
        title: "last 30 days",
        start: Date.now() - 30 * 24 * 3600 * 1000
    },
    "last 90 days": {
        title: "last 90 days",
        start: Date.now() - 90 * 24 * 3600 * 1000
    },
    "last 365 days": {
        title: "last 365 days",
        start: Date.now() - 365 * 24 * 3600 * 1000
    },
    "all time": {
        title: "all time",
        start: 0
    },
}

const AutocompletePreset = (props) => {
    const { options, placeholder, setValue, value, field } = props
    const classes = UseAutocompleteStyles()

    return (
        <div className="autocomplete-preset">
            <h2>{field}:</h2>
            <Autocomplete
                classes={classes}
                // key={props.data.header}
                value={value}
                options={options}
                getOptionLabel={(option) => option}
                style={{ width: "100%", minWidth: "300px" }}
                onChange={(event, value) => setValue(value)}
                renderInput={(params) => <TextField {...params} placeholder={placeholder} variant="outlined" />}
            />
        </div>
    )
}

const DonutDisplay = (props) => (
    <div className="offline-chart">
        <Donut title={props.title} data={props.data} centerText={props.centerText} total={props.total} />

    </div>
)

const SeriesDisplay = (props) => (
    <div className="offline-chart w3">
        <Series title={props.header} data={props.data} mode={props.mode} baseUnit={props.baseUnit} />

    </div>
)

export const TextDisplay = (props) => (
    <div className="offline-chart">
        <h2>
            {props.heading}
        </h2>
        <div className={"value " + props.styleClass}>
            <h3>
                {props.value}
            </h3>
            <h5>
                {props.small}
            </h5>
        </div>
    </div>
)

const UserDisplay = (props) => {
    return (
        <div className="offline-chart">
            <h2>
                {props.heading}
            </h2>
            <div className="value">
                <div className="dance-buddies">
                    {
                        props.usernames.map((username, index) => (

                            <div key={username + index} className="buddy">
                                {username}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

const Panel = (props) => {
    const { header, PanelCompopnent } = props
    const [hide, setHide] = useState(false)

    return (
        <div className={"panel" + (hide ? " hide" : "")}>
            <h1>{header}
                <div className="btn-container">
                    <button className="expand-collapse" onClick={() => setHide(a => !a)}> {hide ? <ExpandMoreIcon /> : <ExpandLessIcon />} </button>
                </div>
            </h1>
            <div className="component">
                <PanelCompopnent />
            </div>
        </div >
    )
}

export default function OfflineAnalytics(props) {
    //toggle username, timeframe, time division for trends
    const { user1, user2, user3, master } = props.account
    const [user, setUser] = useState(user1)
    const [range, setRange] = useState(rangeOptions["all time"])
    const [Overview, setOverview] = useState(null)
    const [Progress, setProgress] = useState(null)
    const [BaseUnit, setBaseUnit] = useState("sessions")
    const [ProgressMode, setProgressMode] = useState("Dance Move Accuracy")
    const ProgressModeOptions = ["Dance Move Accuracy", "Dance Move Correctness", "Position Correctness", "Avg Group Sync Delay (ms)"]
    const BaseUnitOptions = ["sessions", "hours", "days", "months", "years"]

    const setDisplayRange = (value) => {
        setRange(rangeOptions[value])
    }

    const displayRangeOptions = Object.keys(rangeOptions).map(r => r)

    useEffect(() => {
        const GetDanceOverview = () => {
            const payload = {
                "start": range.start,
                "end": Date.now(),
                "account": master,
                "username": user,
            }

            fetch(PathDanceOverview, {
                method: "post",
                mode: 'cors',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            }).then((r) => {
                r.json().then(data => {
                    if (r.status === 200) {
                        console.log(data)
                        setOverview(data)
                    }
                });
            })
        }

        GetDanceOverview()
    }, [user, range, master, setOverview])

    useEffect(() => {
        const GetProgress = () => {
            const payload = {
                "start": range.start,
                "end": Date.now(),
                "account": master,
                "username": user,
            }

            fetch(PathDanceProgress, {
                method: "post",
                mode: 'cors',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            }).then((r) => {
                r.json().then(data => {
                    if (r.status === 200) {
                        console.log(data)
                        setProgress(data)
                    }
                });
            })
        }

        GetProgress()
    }, [user, range, master, setProgress])


    return (
        <div className="offline-analytics">
            <div className="controls">
                <Link to="/">
                    <button className="expand-collapse back"><ArrowBackIosIcon /></button>
                </Link>
                <AutocompletePreset
                    options={[user1, user2, user3]}
                    placeholder="Select User"
                    setValue={setUser}
                    value={user}
                    field="User"
                />

                <AutocompletePreset
                    options={displayRangeOptions}
                    placeholder="Select Timeframe"
                    setValue={setDisplayRange}
                    value={range.title}
                    field="Timeframe"
                />
            </div>
            {Overview == null ? <div></div> :
                <Panel header="Overview"
                    PanelCompopnent={() => (
                        <div className="col">
                            <div className="row">
                                <DonutDisplay title="Dance Moves" data={Overview.total > 0 ? [{
                                    "kind": "WRONG", "share": Overview.wrong / Overview.total
                                }, {
                                    "kind": "CORRECT ★", "share": Overview.star1 / Overview.total
                                }, {
                                    "kind": "CORRECT ★★", "share": Overview.star2 / Overview.total
                                }, {
                                    "kind": "CORRECT ★★★", "share": Overview.star3 / Overview.total
                                }] : null} total={Overview.total}
                                    centerText={String(Overview.move_accuracy * 100).slice(0, 5) + "% (" +
                                        (Overview.total - Overview.wrong) + "/" + Overview.total + ") CORRECT"} />
                                <DonutDisplay title="Position" data={Overview.total_positions > 0 ? [
                                    {}, {}, {}, {}, {},
                                    {
                                        "kind": "WRONG", "share": 1 - Overview.position_accuracy
                                    }, {
                                        "kind": "CORRECT", "share": Overview.position_accuracy
                                    }] : null} total={Overview.total_positions}
                                    centerText={String(Overview.position_accuracy * 100).slice(0, 5) + "% (" +
                                        Math.round(Overview.position_accuracy * Overview.total_positions) + "/" + Overview.total_positions + ") CORRECT"} />
                                <TextDisplay heading="Average Group Sync Delay"
                                    value={Overview.avg_sync_delay < 10000 ? Overview.avg_sync_delay + "ms" :
                                        SecToTime(Overview.avg_sync_delay / 1000, true) + " " + (Overview.avg_sync_delay % 1000) + "ms"} styleClass="sync-delay" />
                            </div>

                            <div className="row">
                                <UserDisplay heading="Favourite Dancing Buddies" usernames={Overview.usernames} />
                                <TextDisplay heading="Score" value={Overview.star1 + Overview.star2 + Overview.star3 + "★"} small={"after " + Overview.total_sessions + " sessions"} styleClass="sessions" />
                                <TextDisplay heading="Total Time Danced" value={SecToTime(Overview.duration / 1000, true)} styleClass="duration" />
                            </div>

                        </div>
                    )} />
            }
            {Progress == null ? <div></div> :
                <Panel header="Progress Report"
                    PanelCompopnent={() => (
                        <div className="col">
                            <div className="row">
                                <AutocompletePreset
                                    options={ProgressModeOptions}
                                    placeholder="Select Progress Mode"
                                    setValue={setProgressMode}
                                    value={ProgressMode}
                                    field="Metric"
                                />

                                <AutocompletePreset
                                    options={BaseUnitOptions}
                                    placeholder="Select Base Unit"
                                    setValue={setBaseUnit}
                                    value={BaseUnit}
                                    field="Unit"
                                />
                            </div>

                            <SeriesDisplay header="" data={Progress} mode={ProgressMode} baseUnit={BaseUnit} />
                        </div>
                    )} />
            }

            {/* <Panel header="Analyse Session"
                PanelCompopnent={() => (
                    <div className="col">
                        <div className="row">
                            <AutocompletePreset
                                options={["My Awesome Dance Session"]}
                                placeholder="Select Session"
                                setValue={null}
                                value={"My Awesome Dance Session"}
                                field="Session"
                            />
                        </div>
                    </div>
                )} /> */}

        </div>
    )
}
