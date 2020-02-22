import Head from 'next/head'
import NavBar from '../components/NavBar';

const Home = () => (
  <div>
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <header>
    <NavBar></NavBar>
    </header>
    <main>
      <h1 className="title">
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
    </main>
  </div>
)

export default Home
