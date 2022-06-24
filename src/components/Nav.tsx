import Link from 'next/link';

// icons
import Logo from './Logo';

// queries
import { ConnectButton } from './ConnectButton';

export function Nav() {
  return (
    <>
      <nav className="nav">
        <div className="container">
          <Logo />
          <div className="nav-links">
            <Link href="/account">Portals</Link>
            <Link href="/">Guides</Link>
            <ConnectButton />
          </div>
        </div>
      </nav>
    </>
  );
}
