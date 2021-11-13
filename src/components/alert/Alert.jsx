import "./alert.scss"
import NotificationsIcon from '@mui/icons-material/Notifications';
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';
import { useEffect, useState } from "react";

export default function Alert(props) {
    const { socket } = props
    const [Message, setMessage] = useState("-")
    const [isVisible, setVisibillity] = useState(false)
    useEffect(() => {
        const alertSocket = new WebSocket(socket)

        alertSocket.onopen = () => {
            setMessage("---")
        }

        alertSocket.onmessage = (e) => {
            setMessage(e.data)
            setVisibillity(true)
            setTimeout(() => {
                setVisibillity(false)
            }, 3000);
        }

        return () => {
            alertSocket.close();
        };

    }, [socket])

    return (
        <div className="alert user">
            {
                isVisible ?
                    <div className="container down">
                        {props.type === "info" ? <InfoIcon /> : <span></span>}
                        {props.type === "help" ? <HelpIcon /> : <span></span>}
                        {props.type == null ?
                            <div className="notification-icon">
                                <NotificationsIcon fontSize="inherit" color="inherit" style={{ fill: "inherit" }} />
                            </div> : <span></span>
                        }
                        <div className="text">
                            {Message}
                        </div>
                    </div> : <span></span>
            }
        </div>
    )
}
