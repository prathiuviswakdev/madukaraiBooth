import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="text-4xl font-bold text-white mb-6">404 - Page Not Found</h1>
      <p className="text-xl mb-8 text-white/80">Sorry, the page you are looking for does not exist.</p>
      <Link href="/">
        <button className="bg-booth-DEFAULT hover:bg-booth-dark text-white font-bold py-3 px-8 rounded-xl transition-colors">
          Return Home
        </button>
      </Link>
    </div>
  );
}

// Set the page title
Custom404.pageTitle = "Page Not Found"; 