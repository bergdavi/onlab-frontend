import { Col, Row } from 'reactstrap';
import UserStatistics from '../../components/user/UserStatistics';
import SecurePage from '../../components/util/SecurePage';
import UserSideBar from '../../components/user/UserSideBar';

const Statistics = () => (
    <main>
        <SecurePage>
            <Row>
                <Col xs="2">
                    <UserSideBar selected='statistics'></UserSideBar>
                </Col>
                <Col>
                    <UserStatistics/>  
                </Col>
            </Row>
        </SecurePage>
    </main>
)

export default Statistics;
