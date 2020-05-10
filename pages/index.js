import HomeJumbotron from '../components/home/HomeJumbotron';
import HomeMostPlayedGame from '../components/home/HomeMostPlayedGame';
import UserContextWrapper from '../components/util/UserContextWrapper';
const Home = () => (
    <main>
        <UserContextWrapper>
            <HomeJumbotron />
        </UserContextWrapper>
        <HomeMostPlayedGame />
    </main>
)

export default Home
