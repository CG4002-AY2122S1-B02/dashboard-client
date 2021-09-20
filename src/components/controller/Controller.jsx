import './controller.scss'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TimelineIcon from '@mui/icons-material/Timeline';
import GroupsIcon from '@mui/icons-material/Groups';
import StopIcon from '@mui/icons-material/Stop';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

const SessionNameField = () => {
    return (
        <div className="session-name-field">
            <EditIcon fontSize="inherit" />
            <div className="scrolling-session">
                &nbsp;
                <input type="text" placeholder="Session 1 (4:00pm 6/10/21)" />
            </div>
        </div>
    )
}

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
            < TimelineIcon fontSize="inherit" />
        </div>
    )
}

export default function Controller(props) {
    return (
        <div className="controller">
            <div className="container">
                <SessionNameField />
                <div className="button-tabs">
                    <UserPageIcon />
                    <DancePageIcon toggleDance={props.toggleDance} dancing={props.dancing} />
                    <OfflinePageIcon />
                </div>
            </div>
        </div>
    )
}
