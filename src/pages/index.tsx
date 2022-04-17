import Nav from '../components/Nav';
import IconETH from '../components/IconETH';
import { PlayIcon } from '@heroicons/react/solid';
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Finely</title>
      </Head>
      <Nav />
      <div className="hero">
        <h1>Token-gate any website with one line of code</h1>
        <div className="buttons">
          <button className="button primary">
            <IconETH /> Get Started
          </button>
          <button className="button">
            <PlayIcon className="icon" /> View demo
          </button>
        </div>
      </div>
    </div>
  );
}
