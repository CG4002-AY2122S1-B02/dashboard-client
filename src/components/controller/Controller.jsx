import './controller.scss'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TimelineIcon from '@mui/icons-material/Timeline';
import GroupsIcon from '@mui/icons-material/Groups';
import StopIcon from '@mui/icons-material/Stop';
// import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import TimerIcon from '@mui/icons-material/Timer';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { PathGroupSyncDelayStream, PathECGStream } from '../../config';
import { useEffect, useState } from 'react';

// const SessionNameField = (props) => {
//     return (
//         <div className="session-name-field" style={{ display: "none" }}>
//             <EditIcon fontSize="inherit" />
//             <div className="scrolling-session">
//                 &nbsp;
//                 <input type="text" placeholder="Input Session Name ('*' for default)" onChange={e => props.setSessionName(e.target.value)} value={props.sessionName} />
//             </div>
//         </div>
//     )
// }

const UserPageIcon = () => {
    return (
        <div className="user-page-icon">
            <Link to="/account">
                <GroupsIcon fontSize="inherit" />
            </Link>
        </div>
    )
}

const DancePageIcon = (props) => {

    return (
        <div className="dance-page-icon" onClick={() => props.toggleDance()}>
            {
                props.dancing ?
                    <PlayArrowIcon fontSize="inherit" /> :
                    <StopIcon fontSize="inherit" />
            }
        </div>
    )
}

const OfflinePageIcon = () => {
    //have a timeout feature when in dance so auto see session data*
    return (
        <div className="offline-page-icon">
            <Link to="/offline">
                < TimelineIcon fontSize="inherit" />
            </Link>
        </div>
    )
}

export default function Controller(props) {
    // const { setSessionName, sessionName } = props
    const ECG_MIN = 610
    const ECG_RANGE = 70
    const [Sync, setSync] = useState("-")
    const [ECG, setECG] = useState(ECG_MIN)
    const [RerenderSync, setRerenderSync] = useState(0)


    useEffect(() => {
        const socket = new WebSocket(PathGroupSyncDelayStream)

        socket.onopen = () => {
            setSync("-------")
            setRerenderSync(0)
        }

        socket.onmessage = (e) => {
            setSync(e.data + "ms")
            setRerenderSync(r => r + 1)
        }


        return () => {
            socket.close();
        };

    }, [props.dancing])

    useEffect(() => {
        const socketECG = new WebSocket(PathECGStream)

        socketECG.onopen = () => {
            setECG(ECG_MIN)
        }

        socketECG.onmessage = (e) => {
            setECG(Number(e.data) < ECG_MIN ? ECG_MIN : (Number(e.data) > ECG_MIN + ECG_RANGE ? ECG_MIN + ECG_RANGE : Number(e.data)))
        }

        return () => {
            socketECG.close();
        };

    }, [])

    const ECGpercentage = String((ECG - ECG_MIN) * 100 / ECG_RANGE).split(".")[0] + "%"

    return (
        <div className="controller">
            <div className="ecg-border" style={{ width: ECGpercentage }}>

            </div>
            <div className="tool-tip">
                {/* EMG-Mean Absolute Value:  */}
                Flex: {ECGpercentage}
            </div>
            <div className="container">
                {/* <SessionNameField setSessionName={setSessionName} sessionName={sessionName} /> */}
                <span className="leaderboard">
                    <LeaderboardIcon fontSize="large" />
                    <span className="content">1st: {props.leaderboard[0]}, 2nd: {props.leaderboard[1]}, 3rd: {props.leaderboard[2]}</span>
                </span>
                <div className="button-tabs">
                    <UserPageIcon /> <span className="separator-vert"></span>
                    <DancePageIcon toggleDance={props.toggleDance} dancing={props.dancing} />
                    <span className="separator-vert"></span>
                    <OfflinePageIcon />
                </div>
                <div className="logo">
                    <img src="assets/logo2.png" alt="" />
                </div>

                <span className="sync-delay">
                    <span>
                        < TimerIcon fontSize="large" />
                    </span>
                    <strong key={RerenderSync} className="delay">{Sync}</strong>
                </span>


            </div>
        </div>
    )
}
