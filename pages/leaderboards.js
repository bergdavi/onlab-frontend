import UserGameplayList from '../components/user/UserGameplayList'
import SecurePage from '../components/util/SecurePage'
import UserContextWrapper from '../components/util/UserContextWrapper';
import Leaderboards from '../components/leaderboards/Leaderboards';
import { useRouter } from 'next/router'

const LeaderboardsPage = () => {    
    return (
        <main>
            <Leaderboards />
        </main>
    );
}

export default LeaderboardsPage;
