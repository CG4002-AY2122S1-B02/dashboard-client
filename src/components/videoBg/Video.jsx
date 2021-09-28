import React from 'react'
import spotlights from './spotlights.mp4';
import './video.scss'

export default function Video(props) {
    // var source;
    // if (props.source === "spotlights") {
    //     source = spotlights
    // }

    return (
        <div className="vid-container" style={{ background: props.colorHex }}>
            <video className='videoTag' autoPlay loop muted>
                <source src={spotlights} type='video/mp4' />
            </video>
        </div>
    )
}
