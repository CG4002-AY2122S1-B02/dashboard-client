import React from 'react'
import './analysis.scss'
import Donut from '../donutChart/Donut';
import Evaluator from "../evaluator/Evaluator";
import { useState, useEffect } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TextDisplay } from '../offlineAnalytics/OfflineAnalytics';

export default function PreliminaryAnalysis(props) {
    //0-Total, 1-1star, 2-2star, 3-3star
    const [UserRawData, setUserRawData] = useState([[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]])
    const [PositionCorrect, setCorrectPosition] = useState([0, 0])
    const [UserData, setUserData] = useState([])
    const { user1, user2, user3 } = props.account
    const { CurrentSessionData, setCurrentSessionData, sessionName, setSessionName } = props

    useEffect(() => {
        var updatedUserData = [{}, {}, {}]
        for (let i = 0; i < 3; i++) {
            updatedUserData[i] = [{
                "kind": "WRONG", "share": (UserRawData[i][0] - UserRawData[i][1] - UserRawData[i][2] - UserRawData[i][3]) / UserRawData[i][0]
            }, {
                "kind": "CORRECT ★", "share": UserRawData[i][1] / UserRawData[i][0]
            }, {
                "kind": "CORRECT ★★", "share": UserRawData[i][2] / UserRawData[i][0]
            }, {
                "kind": "CORRECT ★★★", "share": UserRawData[i][3] / UserRawData[i][0]
            }]
        }

        setUserData(updatedUserData)
    }, [UserRawData])

    const TotalData = UserRawData[0][0] + UserRawData[1][0] + UserRawData[2][0]
    const TotalCorrect =
        UserRawData[0][1] + UserRawData[0][2] + UserRawData[0][3] +
        UserRawData[1][1] + UserRawData[1][2] + UserRawData[1][3] +
        UserRawData[2][1] + UserRawData[2][2] + UserRawData[2][3]

    const AggregatedData = [{
        "kind": "WRONG", "share": (TotalData - TotalCorrect) / TotalData
    }, {}, {}, {}, {
        "kind": "CORRECT", "share": TotalCorrect / TotalData
    }]

    const PositionData = [{}, {}, {}, {}, {}, {
        "kind": "WRONG", "share": (PositionCorrect[0] - PositionCorrect[1]) / PositionCorrect[0]
    }, {
        "kind": "CORRECT", "share": PositionCorrect[1] / PositionCorrect[0]
    }]

    const GetUserCenterText = (userNum) => {
        const numCorrect = UserRawData[userNum - 1][1] + UserRawData[userNum - 1][2] + UserRawData[userNum - 1][3]
        const average = numCorrect / UserRawData[userNum - 1][0]

        return String(average * 100).slice(0, 5) + "% (" +
            numCorrect + "/" + UserRawData[userNum - 1][0] + ") CORRECT"
    }


    const AnalyticsPreview = () => {
        const [collapseEvaluator, setCollapseEvaluator] = useState(false)
        return (
            <div className="analytics-preview" style={{ height: collapseEvaluator ? "35px" : "645px" }}>
                <h1>Analytics Preview
                    <div className="btn-container" >
                        <button className="expand-collapse" onClick={() => setCollapseEvaluator(c => !c)}>
                            {collapseEvaluator ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                        </button>
                    </div>
                </h1>
                <div className="row">
                    <Donut title={user1 + "'s Dance Moves"} data={UserData[0]}
                        centerText={GetUserCenterText(1)} total={UserRawData[0][0]} />
                    <Donut title={user2 + "'s Dance Moves"} data={UserData[1]}
                        centerText={GetUserCenterText(2)} total={UserRawData[1][0]} />
                    <Donut title={user3 + "'s Dance Moves"} data={UserData[2]}
                        centerText={GetUserCenterText(3)} total={UserRawData[2][0]} />
                </div>
                <div className="row">
                    <Donut title={"All Dance Moves"} data={AggregatedData}
                        centerText={String(TotalCorrect / TotalData * 100).slice(0, 5) + "% (" +
                            TotalCorrect + "/" + TotalData + ") CORRECT"}
                        total={TotalData} />
                    <Donut title={"Position Statistics"} data={PositionData}
                        centerText={String(PositionCorrect[1] / PositionCorrect[0] * 100).slice(0, 5) + "% (" +
                            PositionCorrect[1] + "/" + PositionCorrect[0] + ") CORRECT"}
                        total={PositionCorrect[0]} />
                    <TextDisplay heading="Average Group Sync Delay" value={CurrentSessionData.avg_group_sync_delay + "ms"} />
                </div>
            </div>
        )
    }

    return (
        <div className="preliminary-analysis"
        >
            <div className="scrollable">
                <Evaluator account={props.account}
                    setDataPreview={setUserRawData}
                    setPositionDataPreview={setCorrectPosition}
                    setCurrentSessionData={setCurrentSessionData}
                    data={CurrentSessionData}
                    key={CurrentSessionData}
                    sessionName={sessionName}
                    setSessionName={setSessionName} />
                <AnalyticsPreview />
            </div>
        </div>
    )
}
