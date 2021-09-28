import './evaluator.scss'
import Dance from '../dance/Dance'
import ScrollContainer from "react-indiana-drag-scroll";
import { useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Popper } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { emptySessionData, PathUploadSession } from '../../config'

const danceOptions = ["Push Back", "Dab", "Snake", "Window360", "James Bond", "Cowboy", "Mermaid", "Scarecrow", "WRONG"]
const positionOptions = ["123", "132", "213", "231", "312", "321", "WRONG"]


export const UseAutocompleteStyles = makeStyles((theme) => ({
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

//this method generator is for autocomplete
const limitSetGenerator = (setTrue, returnList, setReturnList, key) => {
    const limitedSetMethod = (values) => {
        // if (values.length === 0) {
        //     //make all correct
        //     setTrue(values)
        //     invalidateReturn(returnList, setReturnList)
        // } else

        if (values.length <= returnList.length) {
            setTrue(values)
            validateReturn(values, returnList, setReturnList, key)
        }
    }

    return limitedSetMethod
}

const allCorrectGenerator = (setTrue, returnList, setReturnList, key) => {

    const allCorrect = () => {
        const values = returnList.map(a => a[key])
        setTrue(values)
        validateReturn(values, returnList, setReturnList, key)
    }

    return allCorrect
}

//this method generator is for read data of returned value
const setIndexOrAppendGenerator = (trueList, setTrue, returnList, setReturnList, key) => {
    const setIndexOrAppendMethod = (index, value) => {
        if (trueList.length <= index) {
            const newTrueList = [...trueList, value]
            setTrue(a => [...a, value])
            validateReturn(newTrueList, returnList, setReturnList, key)
        } else if (trueList[index] === value) {
            const newTrueList = [...trueList.slice(0, index), "WRONG", ...trueList.slice(index + 1)]
            setTrue(a => [...a.slice(0, index), "WRONG", ...a.slice(index + 1)])
            validateReturn(newTrueList, returnList, setReturnList, key)
        } else {
            const newTrueList = [...trueList.slice(0, index), value, ...trueList.slice(index + 1)]
            setTrue(a => [...a.slice(0, index), value, ...a.slice(index + 1)])
            validateReturn(newTrueList, returnList, setReturnList, key)
        }
    }

    return setIndexOrAppendMethod
}

const validateReturn = (trueList, returnList, setReturnList, key) => {
    var updatedObjList = [] //carries updated return value size of truelist
    for (let i = 0; i < returnList.length; i++) {
        var updatedObj = returnList[i]
        if (i >= trueList.length) {
            updatedObj.end = "wrong"
        } else {
            updatedObj.end = (trueList[i] === updatedObj[key] ? "correct" : "wrong")
        }
        updatedObjList.push(updatedObj)
    }

    setReturnList(a => [...updatedObjList, ...a.slice(updatedObjList.length)])
}

// const invalidateReturn = (returnList, setReturnList) => {
//     var updatedObjList = [] //carries updated return value size of truelist
//     for (let i = 0; i < returnList.length; i++) {
//         var updatedObj = returnList[i]
//         updatedObj.end = "correct"
//         updatedObjList.push(updatedObj)
//     }

//     setReturnList(updatedObjList)
// }

const ReadDataRow = (props) => {
    const { dataList, isPosition, setIndexOrAdd, id } = props

    if (dataList == null) {
        return <div></div>
    }

    return (
        <div className="chip-list">
            {dataList.map((move, index) => {
                const dataUnit = isPosition ? move.position : move.dance_move
                return (
                    <div key={String(id) + String(index)} className={"dance-container" + (move.end === "correct" ? "" : " wrong")}
                        onClick={() => setIndexOrAdd(index, dataUnit)} style={{ cursor: "pointer" }}>
                        <Dance name={dataUnit} accuracy={isPosition ? -1 : null} position={0} />
                    </div>
                )
            })}
        </div>
    )
}

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

    const classes = UseAutocompleteStyles();

    return (
        <div className="chip-list autocomplete"
        // style={{ width: String(125 * props.maxLength) + "px" }}
        >
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
                    style={{ width: String(props.tags.length * 125 + 450) + "px", color: "white" }}
                    renderInput={(params) => (
                        <TextField {...params}
                            variant="outlined" placeholder={"Input " + props.placeholder} />
                    )}
                /> <button onClick={() => props.allCorrect()}><DoneAllIcon /></button>
            </div>
        </div>
    )
}

const EvaluatorUnit = (props) => {
    const { returnList, setReturn, trueList, setTrue, isPosition, id, placeholder } = props
    const key = isPosition ? "position" : "dance_move"
    return (
        <div>
            <ReadDataRow dataList={returnList} isPosition={isPosition} id={id}
                setIndexOrAdd={setIndexOrAppendGenerator(trueList, setTrue, returnList, setReturn, key)} />

            <TrueDataAutocomplete
                options={isPosition ? positionOptions : danceOptions}
                fixedOptions={[]}
                tags={trueList}
                setTags={limitSetGenerator(setTrue, returnList, setReturn, key)}
                maxLength={returnList == null ? 0 : returnList.length}
                isPosition={isPosition}
                placeholder={placeholder}
                allCorrect={allCorrectGenerator(setTrue, returnList, setReturn, key)}
            />
        </div>
    )
}

export default function Evaluator(props) {
    const { user1, user2, user3, master } = props.account
    const { setDataPreview, setPositionDataPreview, setCurrentSessionData, data, sessionName, setSessionName } = props
    const [returnPosition, setReturnPosition] = useState(data.position)
    const [TruePosition, setTruePosition] = useState([])
    const [returnUser1, setReturnUser1] = useState(data.user_1)
    const [trueUser1, setTrueUser1] = useState([])
    const [returnUser2, setReturnUser2] = useState(data.user_2)
    const [trueUser2, setTrueUser2] = useState([])
    const [returnUser3, setReturnUser3] = useState(data.user_3)
    const [trueUser3, setTrueUser3] = useState([])

    const longestUserLength = (returnUser1 == null || returnUser2 == null || returnUser3 == null || returnPosition == null ?
        0 : (returnUser1.length > returnUser2.length ?
            (returnUser1.length > returnUser3.length ? returnUser1.length : returnUser3.length) :
            (returnUser2.length > returnUser3.length ? returnUser2.length : returnUser3.length)))

    const [ShowLabels, setShowLabels] = useState(false)
    const [collapseEvaluator, setCollapseEvaluator] = useState(false)

    const UploadSession = () => {
        const payload = {
            "session_timestamp": Date.now(),
            "session_name": sessionName,
            "account_name": master,
            "username_1": user1,
            "username_2": user2,
            "username_3": user3,

            "sensor_data": {
                "user_1": returnUser1,
                "user_2": returnUser2,
                "user_3": returnUser3,
                "position": returnPosition,
            }
        }

        fetch(PathUploadSession, {
            method: "post",
            mode: 'cors',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        }).then((r) => {
            // console.log(payload)

            if (r.status === 200) {
            } else {
            }
        })
    }

    useEffect(() => {
        var previewPositionData = [returnPosition.length, 0]

        for (let i = 0; i < previewPositionData[0]; i++) {
            if (returnPosition[i].end !== "correct") continue
            previewPositionData[1]++
        }
        setPositionDataPreview(previewPositionData)

    }, [returnPosition, setPositionDataPreview])

    useEffect(() => {
        var previewDataUser = [0, 0, 0, 0]
        previewDataUser[0] = returnUser1 == null ? 0 : returnUser1.length

        for (let i = 0; i < previewDataUser[0]; i++) {
            if (returnUser1[i].end !== "correct") continue
            for (let j = 1; j <= 3; j++) {
                if (returnUser1[i].accuracy === j) {
                    previewDataUser[j]++
                    break
                }
            }
        }
        setDataPreview(a => [previewDataUser, a[1], a[2]])

    }, [returnUser1, setDataPreview])

    useEffect(() => {
        var previewDataUser = [0, 0, 0, 0]
        previewDataUser[0] = returnUser2 == null ? 0 : returnUser2.length

        for (let i = 0; i < previewDataUser[0]; i++) {
            if (returnUser2[i].end !== "correct") continue
            for (let j = 1; j <= 3; j++) {
                if (returnUser2[i].accuracy === j) {
                    previewDataUser[j]++
                    break
                }
            }
        }
        setDataPreview(a => [a[0], previewDataUser, a[2]])

    }, [returnUser2, setDataPreview])

    useEffect(() => {
        var previewDataUser = [0, 0, 0, 0]
        previewDataUser[0] = returnUser3 == null ? 0 : returnUser3.length

        for (let i = 0; i < previewDataUser[0]; i++) {
            if (returnUser3[i].end !== "correct") continue
            for (let j = 1; j <= 3; j++) {
                if (returnUser3[i].accuracy === j) {
                    previewDataUser[j]++
                    break
                }
            }
        }
        setDataPreview(a => [a[0], a[1], previewDataUser])

    }, [returnUser3, setDataPreview])

    return (
        <div className="evaluator"
            style={{ height: collapseEvaluator ? "55px" : "720px" }}
        >
            <h1>Evaluate '{sessionName}'
                <div className="btn-container" >
                    <button className="expand-collapse" onClick={() => setCollapseEvaluator(c => !c)}>
                        {collapseEvaluator ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                    </button>
                </div>
            </h1>

            <div className="main-container">
                <div className="review">
                    <div className={"labels" + (ShowLabels ? "" : " close")}>
                        <h2> &nbsp; </h2>
                        <div className="space-23"></div>

                        <h2>{user1}~1:&nbsp;</h2>
                        <div className="space-23"></div>
                        <h2>True Moves ~T:&nbsp;</h2>
                        <div className="space-23"></div>
                        <div className="space-23"></div>
                        <h2>{user2}~2:&nbsp;</h2>
                        <div className="space-23"></div>
                        <h2>True Moves ~T:&nbsp;</h2>
                        <div className="space-23"></div>
                        <div className="space-23"></div>
                        <h2>{user3}~3:&nbsp;</h2>
                        <div className="space-23"></div>
                        <h2>True Moves ~T:&nbsp;</h2>
                        <div className="space-23"></div>
                        <div className="space-23"></div>
                        <h2>Position~P:&nbsp;</h2>
                        <div className="space-23"></div>
                        <h2>True Position~T:&nbsp;</h2>
                        <div className="btn-container">
                            <button className="expand-collapse" onClick={() => setShowLabels(a => !a)}>{ShowLabels ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}</button>
                        </div>
                    </div>
                    <ScrollContainer className="box" vertical={false}>
                        <div className="chip-list">
                            {[...Array(longestUserLength)].map((move, i) => (
                                <div className="dance-container">
                                    <Dance name={i + 1} accuracy={null} position={0} />
                                </div>
                            ))}
                        </div>
                        <div className="space-23"></div>

                        <EvaluatorUnit
                            id={"0evaluator"}
                            returnList={returnUser1}
                            setReturn={setReturnUser1}
                            trueList={trueUser1}
                            setTrue={setTrueUser1}
                            isPosition={false}
                            placeholder={user1 + "'s Ground Truth"} />

                        <EvaluatorUnit
                            id={"1evaluator"}
                            returnList={returnUser2}
                            setReturn={setReturnUser2}
                            trueList={trueUser2}
                            setTrue={setTrueUser2}
                            isPosition={false}
                            placeholder={user2 + "'s Ground Truth"} />

                        <EvaluatorUnit
                            id={"2evaluator"}
                            returnList={returnUser3}
                            setReturn={setReturnUser3}
                            trueList={trueUser3}
                            setTrue={setTrueUser3}
                            isPosition={false}
                            placeholder={user3 + "'s Ground Truth"} />

                        <EvaluatorUnit
                            id={"3evaluator"}
                            returnList={returnPosition}
                            setReturn={setReturnPosition}
                            trueList={TruePosition}
                            setTrue={setTruePosition}
                            isPosition={true}
                            placeholder={"Position Ground Truth"} />

                    </ScrollContainer>

                    <div className="line pos-0"></div>
                    <div className="line pos-1"></div>
                    <div className="line pos-2"></div>
                    <div className="line pos-3"></div>
                </div>

                <div className="evaluator-options">
                    <button onClick={() => { setCurrentSessionData(emptySessionData); setSessionName("*") }}><DeleteIcon /> &nbsp; DISCARD</button>
                    <button onClick={() => { UploadSession(); setCurrentSessionData(emptySessionData); }}><CloudUploadIcon /> &nbsp; UPLOAD</button>
                </div>
            </div>
        </ div>
    )
}
