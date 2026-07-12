import Link from 'next/link';
import { Share2, MessageCircle, Globe, Mail } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>SHOPIEE</Link>
            <p className={styles.description}>
              Premium custom apparel designed by you. We bring your creativity to life with high-quality printing and sustainable fabrics.
            </p>
            <div className={styles.socials}>
              <a href="#" className={styles.socialIcon}><Globe size={20} /></a>
              <a href="#" className={styles.socialIcon}><MessageCircle size={20} /></a>
              <a href="#" className={styles.socialIcon}><Share2 size={20} /></a>
            </div>
          </div>
          
          <div className={styles.links}>
            <h4 className={styles.heading}>Shop</h4>
            <Link href="/catalog?category=oversized" className={styles.link}>Oversized Fits</Link>
            <Link href="/catalog?category=hoodies" className={styles.link}>Premium Hoodies</Link>
            <Link href="/catalog?category=basics" className={styles.link}>Everyday Basics</Link>
            <Link href="/studio" className={styles.link}>Custom Studio</Link>
          </div>
          
          <div className={styles.links}>
            <h4 className={styles.heading}>Help</h4>
            <Link href="/faq" className={styles.link}>FAQ</Link>
            <Link href="/shipping" className={styles.link}>Shipping & Returns</Link>
            <Link href="/size-guide" className={styles.link}>Size Guide</Link>
            <Link href="/contact" className={styles.link}>Contact Us</Link>
          </div>
          
          <div className={styles.newsletter}>
            <h4 className={styles.heading}>Stay Connected</h4>
            <p className={styles.description}>Subscribe for exclusive drops and design tips.</p>
            <form className={styles.form}>
              <div className={styles.inputWrapper}>
                <Mail className={styles.inputIcon} size={18} />
                <input type="email" placeholder="Your email address" className={styles.input} />
              </div>
              <button type="submit" className="btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Shopiee. All rights reserved.</p>
          <div className={styles.legalLinks}>
            <Link href="/privacy" className={styles.link}>Privacy</Link>
            <Link href="/terms" className={styles.link}>Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
