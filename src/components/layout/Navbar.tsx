'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, User, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.left}>
          <button className={styles.mobileMenu}>
            <Menu size={24} />
          </button>
          <Link href="/" className={styles.logo}>
            SHOPIEE
          </Link>
          <div className={styles.desktopNav}>
            <Link href="/catalog" className={styles.navLink}>Shop</Link>
            <Link href="/studio" className={styles.navLink}>Design Studio</Link>
            <Link href="/collections" className={styles.navLink}>Collections</Link>
            <Link href="/about" className={styles.navLink}>About</Link>
          </div>
        </div>
        
        <div className={styles.right}>
          <button className={styles.iconButton}>
            <Search size={20} />
          </button>
          <Link href="/account" className={styles.iconButton}>
            <User size={20} />
          </Link>
          <Link href="/cart" className={styles.iconButton}>
            <ShoppingCart size={20} />
            <span className={styles.cartCount}>0</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
