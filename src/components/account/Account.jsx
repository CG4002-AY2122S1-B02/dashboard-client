import './account.scss'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Link } from 'react-router-dom';
import { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';

// const ProfilePicSelection = () => {
//     const profilePics = [
//         "https://www.pokemoncenter.com/products/images/P6474/710-06469/P6474_710-06469_01_full.jpg",
//     ]
//     return (
//         <div className="profile-selection">
//             {profilePics.map((url) => (
//                 <div className="image-container">
//                     <img src={url} alt="" />
//                 </div>
//             ))}
//         </div>
//     )
// }

export default function Account(props) {
    const { master, loggedIn, user1, user2, user3 } = props.account
    const { login, logout, setUsers } = props.operations
    const [inputMasterAccount, setinputMasterAccount] = useState(master)
    const [inputPassword, setinputPassword] = useState("")
    const [inputUsername1, setinputUsername1] = useState(user1)
    const [inputUsername2, setinputUsername2] = useState(user2)
    const [inputUsername3, setinputUsername3] = useState(user3)

    return (
        <div className="account">
            <div className="container">
                <div className={"login" + (loggedIn ? " is-logged-in" : "")} >
                    <div className="overlay"></div>
                    <div className="content">
                        {/* <span>are you ready to</span> */}
                        <div className="logo">
                            <img src="assets/logo2.png" alt="" />
                        </div>
                        <div className="form">
                            <div className="field">
                                {loggedIn ? <span>{master}</span> : <input type="text" placeholder="Master Account" onChange={e => setinputMasterAccount(e.target.value)} />}
                                <div className="icon"><PersonOutlineIcon /></div>
                            </div>
                            <div className="field">
                                <div className="icon"><LockOpenIcon /></div>
                                {loggedIn ? <span>••••••••</span> : <input type="password" placeholder="Password" onChange={e => setinputPassword(e.target.value)} />}
                            </div>
                            <button onClick={() => { loggedIn ? logout() : login(inputMasterAccount, inputPassword) }}>{loggedIn ? "LOGOUT" : "LOGIN"}</button>
                        </div>
                    </div>
                </div>
                <div className={"users" + (loggedIn ? " is-logged-in" : "")}>
                    <div className="form">
                        <fieldset>
                            <legend>Sensor Set 1</legend>
                            <div className="field">
                                <div className="image-container">
                                    <PersonIcon fontSize="inherit" />
                                    {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPtU_ZmM-x7PxwatdadDuSE9ukQHhN2gVc8Q&usqp=CAU" alt="" /> */}
                                </div>
                                <input type="text" placeholder="Username-1" onChange={e => setinputUsername1(e.target.value)} value={inputUsername1} />
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>Sensor Set 2</legend>
                            <div className="field">
                                <div className="image-container">
                                    <PersonIcon fontSize="inherit" />
                                    {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPtU_ZmM-x7PxwatdadDuSE9ukQHhN2gVc8Q&usqp=CAU" alt="" /> */}
                                </div>
                                <input type="text" placeholder="Username-2" onChange={e => setinputUsername2(e.target.value)} value={inputUsername2} />
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>Sensor Set 3</legend>
                            <div className="field">
                                <div className="image-container">
                                    <PersonIcon fontSize="inherit" />
                                    {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPtU_ZmM-x7PxwatdadDuSE9ukQHhN2gVc8Q&usqp=CAU" alt="" /> */}
                                </div>
                                <input type="text" placeholder="Username-3" onChange={e => setinputUsername3(e.target.value)} value={inputUsername3} />
                            </div>
                        </fieldset>

                        <Link to="/">
                            <button onClick={() => setUsers(inputUsername1, inputUsername2, inputUsername3)}>LET'S GO!</button>
                        </Link>
                    </div>
                </div>
                {/* <ProfilePicSelection /> */}
            </div>
        </div>
    )
}
