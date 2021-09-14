import './userCard.scss'
import Timeline from '../timeline/Timeline';
// import DanceMoves from '../dancemoves/DanceMoves';

export default function UserCard(props) {
    const { position, name, sensor_set } = props

    return (
        <div className={"user-card pos" + position}>
            <div className="card">
                <span>Position {position}</span>
                <h1>{name}</h1>
                <code>{"Sensor Set " + sensor_set}</code>
                <Timeline />
                {/* <DanceMoves stream={props.stream} /> */}
            </div>
        </div>
    )
}
