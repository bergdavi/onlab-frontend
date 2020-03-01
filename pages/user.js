import UserGameplayList from '../components/user/UserGameplayList'
import SecurePage from '../components/util/SecurePage'
import UserContextWrapper from '../components/util/UserContextWrapper';

const User = () => (
    <main>
        <SecurePage>
            <UserContextWrapper>
                <UserGameplayList/>
            </UserContextWrapper>
        </SecurePage>
    </main>
)

export default User;
