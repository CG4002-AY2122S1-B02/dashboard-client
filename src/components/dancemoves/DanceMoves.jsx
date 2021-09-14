// import './danceMoves.scss'
// import React, { useState, useEffect } from 'react';
// import Dance from '../dance/Dance';

// export default function DanceMoves(props) {
//     const [danceMove, setDanceMove] = useState({
//         "epochMs": 0, "name": "start", "accuracy": "MSG"
//     })
//     const [danceMoves, setDanceMoves] = useState([{
//         "epochMs": 0, "name": "start", "accuracy": "MSG"
//     }])
//     useEffect(() => {
//         const socket = new WebSocket(props.stream)
//         socket.onopen = () => {
//         }

//         socket.onmessage = (e) => {
//             const danceMove = e.data.split("|")
//             setDanceMove({
//                 "epochMs": danceMove[0],
//                 "name": danceMove[1],
//                 "accuracy": danceMove[2]
//             })
//             console.log(e.data)
//         }
//     }, [props.stream])

//     useEffect(() => {
//         const newDanceMoves = danceMoves.concat(danceMove)
//         setDanceMoves(newDanceMoves)
//     }, [danceMove])

//     return (
//         <div className="dance-moves">
//             <div className="moving-panel-1">
//                 <div className="dance-container">
//                     <Dance name={danceMove.name} accuracy={danceMove.accuracy} position={0} />
//                 </div>
//             </div>
//             <div className="moving-panel-2">
//                 <div className="dance-container">
//                     <Dance name={danceMove.name} accuracy={danceMove.accuracy} position={0} />
//                 </div>
//             </div>
//         </div>
//     )
// }
