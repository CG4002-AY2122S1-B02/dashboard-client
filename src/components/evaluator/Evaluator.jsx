import './evaluator.scss'
import Dance from '../dance/Dance'
import ScrollContainer from "react-indiana-drag-scroll";
import { useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Popper } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Donut from '../donutChart/Donut';

const TrueDataAutocomplete = (props) => {
    const styles = (theme) => ({
        //https://stackoverflow.com/questions/60122232/how-do-you-position-material-ui-popper-in-the-bottom-right-corner-of-the-browser
        popper: {
            // width: "fit-content",
            width: "300px",
        }
    });

    const popperClass = styles()

    const PopperMy = function (props) {
        return <Popper {...props} style={popperClass.popper} placement="bottom-end" />;
    };

    const CustomChip = (props) => {
        return (
            <div className={"autocomplete-dance-container" + (props.key === 0 ? " first" : "")}>
                <div className="cancel-icon" onClick={props.onDelete}><CancelIcon fontSize="inherit" color="inherit" /></div>
                <Dance name={props.label} accuracy={props.isPosition ? -1 : null} position={-3} />
            </div>
        )
    }

    const useAutocompleteStyles = makeStyles((theme) => ({
        root: {
            "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
                transform: "translate(34px, 20px) scale(1);"
            },
        },
        inputRoot: {
            color: "white",

            fontSize: "inherit",
            '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
                paddingLeft: 26
            },
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white"
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white"
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#DF5796"
            }
        },
        paper: {

            background: "#212",
            color: "white",
        },
        option: {

            // Hover with light-grey
            '&[data-focus="true"]': {
                backgroundColor: '#DF5796',
                borderColor: 'transparent',
            },
            // Selected has dark-grey
            '&[aria-selected="true"]': {
                backgroundColor: "#DF0252",
                borderColor: 'transparent',
            },
        },
        clearIndicator: {
            color: "white",
            fontSize: "inherit",
        },
        popupIndicator: {
            color: "white",
            fontSize: "inherit",
        },
        tag: {
            fontSize: "inherit",
            width: "124px"
        }
    }));

    const classes = useAutocompleteStyles();

    return (
        <div className="chip-list autocomplete">
            <div className="autocomplete-field">
                <Autocomplete
                    classes={classes}
                    PopperComponent={PopperMy}
                    multiple
                    id="fixed-tags-demo"
                    value={props.tags}
                    onChange={(event, newValue) => {
                        props.setTags([
                            ...props.fixedOptions,
                            ...newValue.filter((option) => option),
                        ]);
                    }}
                    options={props.options}
                    getOptionLabel={(option) => option}
                    getOptionSelected={(option, value) => false}
                    renderTags={(tagValue, getTagProps) =>
                        tagValue.map((option, index) => (
                            <CustomChip label={option} key={index}
                                isPosition={props.isPosition} {...getTagProps({ index })} />
                        ))
                    }
                    style={{ width: String(props.width) + "px", color: "white" }}
                    renderInput={(params) => (
                        <TextField {...params}
                            variant="outlined" placeholder="Input Ground Truth" />
                    )}
                />
            </div>
        </div>
    )
}

export default function Evaluator(props) {
    // const { user1, user2, user3 } = props.account
    const { user1, user2, user3 } = { user1: "Jerry", user2: "Michael", user3: "Sanath" }
    const danceList = ["Push Back", "Dab", "Snake", "Window360", "James Bond", "Dab", "Scarecrow", "Push Back", "Dab", "Snake", "Window360", "James Bond", "Dab", "Scarecrow"]
    const longestDanceList = danceList
    const positionList = ["123", "321", "213", "312", "132", "231", "312", "123", "321", "213", "312", "132", "231", "312"]
    const danceOptions = ["Push Back", "Dab", "Snake", "Window360", "James Bond", "Cowboy", "Mermaid", "Scarecrow"]
    const positionOptions = ["123", "132", "213", "231", "312", "321"]
    const [TruePosition, setTruePosition] = useState([])
    const fixedOptions = []
    const [tags, setTags] = useState([...fixedOptions]);
    const passedSetTags = (t) => {
        if (t.length <= danceList.length) {
            setTags(t)
        }
    }
    const passedSetPosition = (p) => {
        if (p.length <= danceList.length) {
            setTruePosition(p)
        }
    }

    const [ShowLabels, setShowLabels] = useState(true)

    return (
        <div className="evaluator">
            <div className="review">
                <div className={"labels" + (ShowLabels ? "" : " close")}>
                    <h2>#</h2>
                    <h2>{user1}~1:&nbsp;</h2>
                    <h2>{user2}~2:&nbsp;</h2>
                    <h2>{user3}~3:&nbsp;</h2>
                    <div className="ground-truth"></div>
                    <h2>True Dance Moves~T:&nbsp;</h2>
                    <div className="ground-truth"></div>
                    <div className="ground-truth"></div>
                    <h2>Position~P:&nbsp;</h2>
                    <div className="ground-truth"></div>
                    <h2>True Position~T:&nbsp;</h2>
                    <div className="btn-container">
                        <button onClick={() => setShowLabels(a => !a)}>{ShowLabels ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}</button>
                    </div>
                </div>
                <ScrollContainer className="box" vertical={false}>
                    <div className="chip-list">
                        {longestDanceList.map((move, i) => (
                            <div className="dance-container">
                                <Dance name={i + 1} accuracy={null} position={0} />
                            </div>
                        ))}
                    </div>
                    <div className="chip-list">
                        {danceList.map((move) => (
                            <div className="dance-container reading">
                                <Dance name={move} accuracy={null} position={0} />
                            </div>
                        ))}
                    </div>
                    <div className="chip-list">
                        {danceList.map((move) => (
                            <div className="dance-container reading">
                                <Dance name={move} accuracy={null} position={0} />
                            </div>
                        ))}
                    </div>
                    <div className="chip-list">
                        {danceList.map((move) => (
                            <div className="dance-container reading">
                                <Dance name={move} accuracy={null} position={0} />
                            </div>
                        ))}
                    </div>
                    <TrueDataAutocomplete
                        options={danceOptions}
                        fixedOptions={[]}
                        tags={tags}
                        setTags={passedSetTags}
                        width={danceList.length * 125 + 300}
                        isPosition={false}
                    />

                    <div className="chip-list">
                        {positionList.map((move) => (
                            <div className="dance-container reading">
                                <Dance name={move} accuracy={-1} position={0} />
                            </div>
                        ))}
                    </div>
                    <TrueDataAutocomplete
                        options={positionOptions}
                        fixedOptions={[]}
                        tags={TruePosition}
                        setTags={passedSetPosition}
                        width={danceList.length * 125 + 300}
                        isPosition={true}
                    />
                </ScrollContainer>
            </div>
            <Donut />
        </div>
    )
}
