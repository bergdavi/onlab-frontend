import { useRouter } from 'next/router'
import {
    Col, Row
} from 'reactstrap';
import SecurePage from '../components/util/SecurePage'
import UserContextWrapper from '../components/util/UserContextWrapper';
import GameWrapper from '../components/game/GameWrapper'
import UserGameplayList from '../components/game/UserGameplayList'
import GameplaySidebar from '../components/game/GameplaySidebar';

const Game = () => {    
    const router = useRouter();
    const { gameplayId } = router.query;

    return (
        <main>
            <div>
                <SecurePage>                        
                    <GameWrapper gameplayId={gameplayId} />
                </SecurePage>
            </div>
            <style jsx>{`
                div {
                    overflow-x: hidden;
                }
            `}</style>
        </main>
    );
}

export default Game;
