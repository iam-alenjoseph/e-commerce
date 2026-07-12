import Link from 'next/link';
import { Filter, ChevronDown } from 'lucide-react';
import styles from './page.module.css';

const MOCK_PRODUCTS = [
  { id: 1, name: 'Premium Oversized Tee', price: 35, category: 'Oversized', image: 'Black Tee' },
  { id: 2, name: 'Essential Heavyweight Hoodie', price: 65, category: 'Hoodies', image: 'Grey Hoodie' },
  { id: 3, name: 'Classic Fit Cotton T-Shirt', price: 25, category: 'Basics', image: 'White Tee' },
  { id: 4, name: 'Vintage Wash Graphic Blank', price: 40, category: 'Vintage', image: 'Washed Tee' },
  { id: 5, name: 'Performance Active Tee', price: 30, category: 'Activewear', image: 'Blue Tee' },
  { id: 6, name: 'Drop Shoulder Sweatshirt', price: 55, category: 'Sweatshirts', image: 'Cream Sweatshirt' },
];

export default function Catalog() {
  return (
    <div className={styles.catalogPage}>
      <div className={styles.header}>
        <h1 className="heading-1">Shop Custom Blanks</h1>
        <p className={styles.subtitle}>Premium quality apparel ready for your designs.</p>
      </div>

      <div className={styles.layout}>
        {/* Sidebar Filters */}
        <aside className={styles.sidebar}>
          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>
              Categories <ChevronDown size={16} />
            </h3>
            <div className={styles.filterOptions}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" /> All Products
              </label>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" /> Oversized Fits
              </label>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" /> Hoodies & Sweats
              </label>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" /> Basics
              </label>
            </div>
          </div>
          
          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>
              Color <ChevronDown size={16} />
            </h3>
            <div className={styles.colorGrid}>
              <button className={styles.colorBtn} style={{ background: '#000000' }}></button>
              <button className={styles.colorBtn} style={{ background: '#ffffff', border: '1px solid #ccc' }}></button>
              <button className={styles.colorBtn} style={{ background: '#e2e8f0' }}></button>
              <button className={styles.colorBtn} style={{ background: '#fef08a' }}></button>
              <button className={styles.colorBtn} style={{ background: '#fca5a5' }}></button>
              <button className={styles.colorBtn} style={{ background: '#93c5fd' }}></button>
            </div>
          </div>
        </aside>

        {/* Main Product Grid */}
        <main className={styles.main}>
          <div className={styles.toolbar}>
            <button className={styles.mobileFilterBtn}>
              <Filter size={18} /> Filters
            </button>
            <div className={styles.sort}>
              <span className={styles.sortLabel}>Sort by:</span>
              <select className={styles.sortSelect}>
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest Arrivals</option>
              </select>
            </div>
          </div>

          <div className={styles.grid}>
            {MOCK_PRODUCTS.map(product => (
              <Link href={`/product/${product.id}`} key={product.id} className={styles.productCard}>
                <div className={styles.imageContainer}>
                  <div className={styles.placeholderImage}>{product.image}</div>
                </div>
                <div className={styles.productInfo}>
                  <p className={styles.category}>{product.category}</p>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.price}>${product.price}.00</p>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
