import './error.scss'
import { Link } from 'react-router-dom';

export default function Error() {
    return (
        <div className="error">
            <div className="container">
                <h1>Oops there is an account error :( <br /> Please Login again here </h1>
                <Link to="/account"> <button> Login</button></Link>
            </div>
        </div>
    )
}
