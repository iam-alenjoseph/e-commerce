import Link from 'next/link';
import { ArrowLeft, Star, Truck, Shield, Shirt } from 'lucide-react';
import styles from './page.module.css';

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  // Mock data for the product
  const product = {
    id: params.id,
    name: 'Premium Oversized Tee',
    price: 35,
    description: 'The ultimate canvas for your designs. Crafted from 100% organic heavy-weight cotton for a premium feel and perfect drape. Features dropped shoulders and a boxy, relaxed fit.',
    features: [
      '100% Organic Cotton',
      'Heavyweight 240gsm fabric',
      'Dropped shoulder fit',
      'Pre-shrunk to minimize shrinkage'
    ],
    colors: ['#000000', '#ffffff', '#e2e8f0', '#fef08a'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  };

  return (
    <div className={styles.productPage}>
      <div className={styles.container}>
        <div className={styles.breadcrumbs}>
          <Link href="/catalog" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to Catalog
          </Link>
        </div>

        <div className={styles.layout}>
          {/* Image Gallery */}
          <div className={styles.gallery}>
            <div className={styles.mainImage}>
              <div className={styles.placeholderImage}>Front View</div>
            </div>
            <div className={styles.thumbnailList}>
              <div className={styles.thumbnail}><div className={styles.placeholderImage}>Front</div></div>
              <div className={styles.thumbnail}><div className={styles.placeholderImage}>Back</div></div>
              <div className={styles.thumbnail}><div className={styles.placeholderImage}>Detail</div></div>
            </div>
          </div>

          {/* Product Info */}
          <div className={styles.info}>
            <h1 className={styles.productName}>{product.name}</h1>
            <div className={styles.priceReview}>
              <span className={styles.price}>${product.price}.00</span>
              <div className={styles.reviews}>
                <Star size={16} fill="var(--warning)" color="var(--warning)" />
                <Star size={16} fill="var(--warning)" color="var(--warning)" />
                <Star size={16} fill="var(--warning)" color="var(--warning)" />
                <Star size={16} fill="var(--warning)" color="var(--warning)" />
                <Star size={16} fill="var(--warning)" color="var(--warning)" />
                <span>(124 Reviews)</span>
              </div>
            </div>

            <p className={styles.description}>{product.description}</p>

            {/* Selectors */}
            <div className={styles.selectorSection}>
              <div className={styles.selectorHeader}>
                <span className={styles.selectorLabel}>Color</span>
                <span className={styles.selectorValue}>Black</span>
              </div>
              <div className={styles.colorGrid}>
                {product.colors.map((color, index) => (
                  <button 
                    key={index} 
                    className={`${styles.colorBtn} ${index === 0 ? styles.colorActive : ''}`}
                    style={{ background: color, border: color === '#ffffff' ? '1px solid #ccc' : 'none' }}
                  ></button>
                ))}
              </div>
            </div>

            <div className={styles.selectorSection}>
              <div className={styles.selectorHeader}>
                <span className={styles.selectorLabel}>Size</span>
                <Link href="#" className={styles.sizeGuide}>Size Guide</Link>
              </div>
              <div className={styles.sizeGrid}>
                {product.sizes.map((size, index) => (
                  <button 
                    key={index} 
                    className={`${styles.sizeBtn} ${index === 2 ? styles.sizeActive : ''}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className={styles.actions}>
              <Link href={`/studio?product=${product.id}`} className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                Customize Design
              </Link>
              <button className="btn-secondary">Add Blank to Cart</button>
            </div>

            {/* Features & Shipping */}
            <div className={styles.accordion}>
              <div className={styles.accordionItem}>
                <h4 className={styles.accordionTitle}>
                  <Shirt size={18} /> Product Features
                </h4>
                <ul className={styles.featureList}>
                  {product.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.accordionItem}>
                <h4 className={styles.accordionTitle}>
                  <Truck size={18} /> Shipping & Returns
                </h4>
                <p className={styles.shippingText}>Free shipping on orders over $100. Custom products ship within 3-5 business days.</p>
              </div>
              <div className={styles.accordionItem}>
                <h4 className={styles.accordionTitle}>
                  <Shield size={18} /> Print Guarantee
                </h4>
                <p className={styles.shippingText}>Our advanced DTG printing ensures vibrant colors that last wash after wash.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
