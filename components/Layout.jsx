import Head from 'next/head';
import { NAVBAR } from './NAVBAR';

export default function Layout({ children, title = 'Voter Booth Application' }) {
  return (
    <div className="min-h-screen">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Voter information portal" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-6 animate-fadeIn">
        <NAVBAR />
        <main className="mb-8 md:mb-12">{children}</main>
        <footer className="mt-8 md:mt-16 text-center text-xs sm:text-sm text-white/70 pb-4">
          <p>© {new Date().getFullYear()} Voter Booth Application. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
} 