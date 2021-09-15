import './userCard.scss'
import Timeline from '../timeline/Timeline';

export default function UserCard(props) {
    const { swap, position, name, sensor_set } = props

    return (
        <div className={"user-card pos" + String(swap ? position : sensor_set)}>
            <div className="card">
                <span>Position {position}</span>
                <h1>{name}</h1>
                <code>{"Sensor Set " + sensor_set}</code>
                <Timeline stream={props.stream} timeLabels={props.timeLabels} />
            </div>
        </div>
    )
}
