import { Col, Row } from 'reactstrap';
import UserInviteList from '../../components/user/UserInviteList';
import UserSideBar from '../../components/user/UserSideBar';
import SecurePage from '../../components/util/SecurePage';


const Gameplays = () => (
    <main>
        <SecurePage>
            <Row>
                <Col xs="2">
                    <UserSideBar selected='invites'></UserSideBar>
                </Col>
                <Col>
                    <UserInviteList/>
                </Col>
            </Row>
        </SecurePage>
    </main>
)

export default Gameplays;
