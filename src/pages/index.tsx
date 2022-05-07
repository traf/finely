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
      <section className="hero">
        <h1>Token-gate any website with one line of code</h1>
        <div className="row gap-sm">
          <button className="button primary">
            <IconETH /> Get Started
          </button>
          <button className="button">
            <PlayIcon className="icon" /> Play demo
          </button>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="box video offset">
            <PlayIcon className="icon" />
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <h2>Compatibility <br />by <s>default</s> design.</h2>
          <h4>No matter your tech stack, Finely is compatible out of the box.</h4>
          <div className="row gap-sm">
            <img src="./icon-squarespace.svg" alt="squarespace" />
            <img src="./icon-webflow.svg" alt="squarespace" />
            <img src="./icon-shopify.svg" alt="squarespace" />
            <img src="./icon-carrd.svg" alt="squarespace" />
            <img src="./icon-wordpress.svg" alt="squarespace" />
            <img src="./icon-super.svg" alt="squarespace" />
            <img src="./icon-framer.svg" alt="squarespace" />
            <img src="./icon-react.svg" alt="squarespace" />
            <img src="./icon-js.svg" alt="squarespace" />
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <h2>Lock access to<br /> all sorts of things.</h2>
          <h4>Token gate anything—newsletters, community links, merch, and plenty more.</h4>
          <div className="box">
            <div className="wheel">
              <h3>Music</h3>
              <h3>Newsletters</h3>
              <h3>Communities</h3>
              <h3>Digital products</h3>
              <h3>Downloads</h3>
              <h3>Software</h3>
              <h3>Podcast</h3>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <h2>Token-gate anything<br /> with a simple copy & paste.</h2>
          <h4>A script tag adds functionality, with an ID on any button for the connect modal.</h4>
          <div className="row">
            <div className="box">
              <img src="./code.png" alt="code" style={{ width: "80%" }} />
            </div>
            <div className="box">
              <img src="./button.png" alt="connect" style={{ width: "200px" }} />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <h2>Finely in action</h2>
        </div>
      </section>
    </div>
  );
}
