import './test.scss'
import OfflineAnalytics from '../offlineAnalytics/OfflineAnalytics';

export default function Test(props) {
    const account = { user1: "Jerry", user2: "Michael", user3: "Sanath" }

    return (
        <div className="test">
            <OfflineAnalytics account={account} />
        </div>
    );
}
