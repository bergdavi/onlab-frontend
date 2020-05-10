import {
    Row,
    Col
} from 'reactstrap';

import SecurePage from '../components/util/SecurePage';
import RegisterUser from '../components/admin/RegisterUser';
import BanUser from '../components/admin/BanUser';
import EnableGames from '../components/admin/EnableGames';

const Admin = () => (
    <main>
        <SecurePage type="admin">
            <Row>
                <Col>
                    <div style={{padding: "10px"}}>
                        <h1 style={{fontSize: "2rem"}}>Register a new (admin) user:</h1>
                        <RegisterUser></RegisterUser>
                        <h1 style={{fontSize: "2rem", marginTop: "20px"}}>Ban a user:</h1>
                        <BanUser></BanUser>
                    </div>
                </Col>
                <Col>
                    <div style={{padding: "10px"}}>
                        <h1 style={{fontSize: "2rem"}}>Enable / disable games:</h1>
                        <EnableGames></EnableGames>
                    </div>
                </Col>
            </Row>            
        </SecurePage>
    </main>
)

export default Admin
