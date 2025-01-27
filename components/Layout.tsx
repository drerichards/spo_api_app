import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <header>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/user/dashboard">Dashboard</Link>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
