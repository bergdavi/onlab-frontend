import { Col, Row } from 'reactstrap';
import UserPassword from '../../components/user/UserPassword';
import SecurePage from '../../components/util/SecurePage';
import UserSideBar from '../../components/user/UserSideBar';

const Statistics = () => (
    <main>
        <SecurePage>
            <Row>
                <Col xs="2">
                    <UserSideBar selected='password'></UserSideBar>
                </Col>
                <Col>
                    <UserPassword/>  
                </Col>
            </Row>
        </SecurePage>
    </main>
)

export default Statistics;
