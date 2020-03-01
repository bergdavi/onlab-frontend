import { useRouter } from 'next/router'
import {
    Col, Row
} from 'reactstrap';
import SecurePage from '../components/util/SecurePage'
import UserContextWrapper from '../components/util/UserContextWrapper';
import GameWrapper from '../components/game/GameWrapper'
import UserGameplayList from '../components/game/UserGameplayList'

const Game = () => {    
    const router = useRouter();
    const { gameplayId } = router.query;

    console.log("gameplayId");
    console.log(router.query);

    return (
        <main>
            <div>
                <SecurePage>
                    <Row>
                        <Col xs="2">
                            <UserContextWrapper><UserGameplayList selectedGameplayId={gameplayId}/></UserContextWrapper>
                        </Col>
                        <Col>
                            <GameWrapper gameplayId={gameplayId} />
                        </Col>
                        <Col xs="2">
                            {/* <UserContextWrapper><UserGameplayList /></UserContextWrapper> */}
                        </Col>
                    </Row>
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
