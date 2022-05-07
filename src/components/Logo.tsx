import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/">
      <a className="logo">
        <img src="./logo.svg" alt="Finely" />
      </a>
    </Link>
  );
}
