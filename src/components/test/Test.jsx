import './test.scss'
import PreliminaryAnalysis from '../preliminaryAnalysis/Analysis';

export default function Test(props) {
    const account = { user1: "Jerry", user2: "Michael", user3: "Sanath" }

    return (
        <div className="test">
            <PreliminaryAnalysis account={account} />
        </div>
    );
}
