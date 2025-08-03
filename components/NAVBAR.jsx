import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export const NAVBAR = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const isActive = (path) => {
    return router.pathname === path ? "bg-booth-dark" : "bg-booth-DEFAULT hover:bg-booth-dark";
  };
  
  return (
    <nav className="bg-white/20 backdrop-blur-md p-4 rounded-2xl shadow-lg mb-8">
      <div className="flex justify-between items-center">
        <Link href="/">
          <span className="text-xl sm:text-2xl font-bold text-white">Voter Portal</span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-lg bg-booth-DEFAULT text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>
        
        {/* Desktop menu */}
        <div className="hidden md:flex space-x-2">
          <Link href="/" className={`text-white font-semibold py-2 px-4 rounded-xl ${isActive('/')} transition-all`}>
            HOME
          </Link>
          <Link href="/fetchid" className={`text-white font-semibold py-2 px-4 rounded-xl ${isActive('/fetchid')} transition-all`}>
            Voter ID
          </Link>
          <Link href="/fetchname" className={`text-white font-semibold py-2 px-4 rounded-xl ${isActive('/fetchname')} transition-all`}>
            Voter NAME
          </Link>
          <Link href="/fetchfhname" className={`text-white font-semibold py-2 px-4 rounded-xl ${isActive('/fetchfhname')} transition-all`}>
            RELATIVE'S NAME
          </Link>
          <Link href="/fetchphone" className={`text-white font-semibold py-2 px-4 rounded-xl ${isActive('/fetchphone')} transition-all`}>
            Phone Number
          </Link>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${menuOpen ? 'block' : 'hidden'} md:hidden mt-4 space-y-2 transition-all duration-300`}>
        <Link href="/" className={`block text-white font-semibold py-2 px-4 rounded-xl ${isActive('/')} transition-all`}>
          HOME
        </Link>
        <Link href="/fetchid" className={`block text-white font-semibold py-2 px-4 rounded-xl ${isActive('/fetchid')} transition-all`}>
          Voter ID
        </Link>
        <Link href="/fetchname" className={`block text-white font-semibold py-2 px-4 rounded-xl ${isActive('/fetchname')} transition-all`}>
          Voter NAME
        </Link>
        <Link href="/fetchfhname" className={`block text-white font-semibold py-2 px-4 rounded-xl ${isActive('/fetchfhname')} transition-all`}>
          RELATIVE'S NAME
        </Link>
        <Link href="/fetchphone" className={`block text-white font-semibold py-2 px-4 rounded-xl ${isActive('/fetchphone')} transition-all`}>
          Phone Number
        </Link>
      </div>
    </nav>
  );
}; 