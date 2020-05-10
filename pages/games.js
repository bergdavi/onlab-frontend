import UserGameplayList from '../components/user/UserGameplayList'
import SecurePage from '../components/util/SecurePage'
import UserContextWrapper from '../components/util/UserContextWrapper';
import GameList from '../components/game/GameList';
import { useRouter } from 'next/router'

const Game = () => {
    const router = useRouter();
    
    return (
        <main>
            <SecurePage>
                <GameList selected={router.query.selected} />
            </SecurePage>
        </main>
    );
}

export default Game;
