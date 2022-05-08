import Logo from './Logo';

export default function Footer() {
    return (
        <footer>
            <div className="container">
                <Logo />
                <div className="logo-xl"><Logo /></div>
                <div className="links">
                    <a href="https://twitter.com/finely" target="_blank" className="link">Twitter</a>
                    <a href="https://discord.gg/finely" target="_blank" className="link">Discord</a>
                    <a href="https://opensea.io/collection/finely" target="_blank" className="link">OpenSea</a>
                </div>
            </div>
        </footer>
    );
}