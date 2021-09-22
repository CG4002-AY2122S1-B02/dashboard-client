import './test.scss'
import Evaluator from "../evaluator/Evaluator";

export default function Test(props) {
    return (
        <div className="test">
            <Evaluator account={props.account} />
        </div>
    );
}
