'use client';

import Link from 'next/link';
import { ArrowRight, PenTool, Shirt, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './page.module.css';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="heading-1">
            Wear Your <span className="text-gradient">Imagination</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Design premium quality custom T-shirts in minutes. Express yourself with our easy-to-use 3D design studio and vibrant printing technology.
          </p>
          <div className={styles.heroActions}>
            <Link href="/studio" className="btn-primary">
              Start Designing
            </Link>
            <Link href="/catalog" className="btn-secondary">
              Browse Collections
            </Link>
          </div>
        </motion.div>
        <div className={styles.heroImageContainer}>
          {/* Using a placeholder for the 3D t-shirt visual */}
          <div className={styles.floatingTshirt}>
             <div className={styles.shirtMockup}>
                <span className={styles.mockupText}>YOUR<br/>DESIGN<br/>HERE</span>
             </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorks}>
        <div className={styles.sectionHeader}>
          <h2 className="heading-2">How It Works</h2>
          <p className={styles.sectionSubtitle}>Three simple steps to your perfect custom tee.</p>
        </div>
        <div className={styles.stepsGrid}>
          <div className={styles.stepCard}>
            <div className={styles.stepIcon}><Shirt size={32} /></div>
            <h3>1. Choose Your Canvas</h3>
            <p>Select from our range of premium tees, hoodies, and oversized fits.</p>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepIcon}><PenTool size={32} /></div>
            <h3>2. Customize</h3>
            <p>Use our advanced studio to add artwork, text, and apply templates.</p>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepIcon}><Truck size={32} /></div>
            <h3>3. We Print & Ship</h3>
            <p>We use high-quality DTG printing and ship straight to your door.</p>
          </div>
        </div>
      </section>

      {/* Featured Templates */}
      <section className={styles.featured}>
        <div className={styles.sectionHeader}>
          <h2 className="heading-2">Trending Templates</h2>
          <Link href="/templates" className={styles.viewAll}>
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className={styles.productGrid}>
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className={styles.productCard}>
              <div className={styles.productImage}>
                <div className={styles.placeholderImg}>Template {item}</div>
              </div>
              <div className={styles.productInfo}>
                <h4>Urban Streetwear Collection</h4>
                <p>Customize starting at $29</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
