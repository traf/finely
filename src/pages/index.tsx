import Head from 'next/head';
import { PlayIcon } from '@heroicons/react/solid';

// components
import { Nav } from '@components/Nav';
import Footer from '@components/Footer';
import IconETH from '@components/IconETH';

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
          <button className="button primary"><span className="invert"><IconETH /></span> Get Started</button>
          <button className="button"><PlayIcon className="icon" /> Play demo</button>
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
          <h2>
            Compatibility <br />
            by <s>default</s> design.
          </h2>
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
          <h2>
            Lock access to
            <br /> all sorts of things.
          </h2>
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
          <h2>Made to be as easy <br />as copying & pasting.</h2>
          <h4>A script tag adds functionality, with an ID on any button for the connect modal.</h4>
          <div className="row">
            <div className="box">
              <img src="./code.png" alt="code" style={{ width: '85%' }} />
            </div>
            <div className="box">
              <img src="./button.png" alt="connect" style={{ width: '200px' }} />
            </div>
          </div>
        </div>
      </section>
      <section className="clipped">
        <div className="container">
          <h2>We're currently in beta — <br />Finely Tokens grant access.</h2>
          <div className="row gap-sm">
            <a href="https://opensea.io/collection/finely" target="_blank" className="button primary">
              <img src="./icon-os.svg" alt="opensea" /> View on Opensea
            </a>
            <button className="button">
              <PlayIcon className="icon" /> Watch demo
            </button>
          </div>
          <img src="./dashboard.png" className="dashboard" alt="dashboard" />
        </div>
      </section>
      <Footer />
    </div>
  );
}
