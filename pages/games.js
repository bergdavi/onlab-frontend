import UserGameplayList from '../components/user/UserGameplayList'
import SecurePage from '../components/util/SecurePage'
import UserContextWrapper from '../components/util/UserContextWrapper';
import GameList from '../components/game/GameList';
import { useRouter } from 'next/router'

const Game = () => {
    const router = useRouter();
    
    return (
        <main>
            <GameList selected={router.query.selected} />
        </main>
    );
}

export default Game;
