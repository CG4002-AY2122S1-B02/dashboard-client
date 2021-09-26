import './offlineAnalytics.scss'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { UseAutocompleteStyles } from '../evaluator/Evaluator'
import { TextField } from '@material-ui/core';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const AutocompletePreset = (props) => {
    const { options, placeholder, setValue, value } = props
    const classes = UseAutocompleteStyles()

    return (
        <div>
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

    return (
        <div className="offline-analytics">
            <AutocompletePreset
                options={[user1, user2, user3]}
                placeholder="Select User"
                setValue={setUser}
                value={user}
            />

            <Panel header="Overview"
                PanelCompopnent={() => (<h3>asdasd</h3>)} />
            <Panel header="Trends"
                PanelCompopnent={() => (<h3>asdasd</h3>)} />
            <Panel header="Analyse Session"
                PanelCompopnent={() => (<h3>asdasd</h3>)} />
        </div>
    )
}
