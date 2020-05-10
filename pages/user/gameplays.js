import { Col, Row } from 'reactstrap';
import UserGameplayList from '../../components/user/UserGameplayList';
import UserSideBar from '../../components/user/UserSideBar';
import SecurePage from '../../components/util/SecurePage';
import UserContextWrapper from '../../components/util/UserContextWrapper';


const Gameplays = () => (
    <main>
        <SecurePage>
            <Row>
                <Col xs="2">
                    <UserSideBar selected='games'></UserSideBar>
                </Col>
                <Col>
                    <UserContextWrapper>
                        <UserGameplayList/>
                    </UserContextWrapper>    
                </Col>
            </Row>
        </SecurePage>
    </main>
)

export default Gameplays;
