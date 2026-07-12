import Link from 'next/link';
import { Trash2, ArrowRight } from 'lucide-react';
import styles from './page.module.css';

export default function CartPage() {
  const cartItems = [
    {
      id: 1,
      name: 'Premium Oversized Tee',
      color: 'Black',
      size: 'L',
      basePrice: 35,
      customizationFee: 15, // Front Print + Custom Image
      quantity: 1,
      image: 'Custom Design 1'
    },
    {
      id: 2,
      name: 'Classic Fit Cotton T-Shirt',
      color: 'White',
      size: 'M',
      basePrice: 25,
      customizationFee: 10, // Text only
      quantity: 2,
      image: 'Custom Design 2'
    }
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.basePrice + item.customizationFee) * item.quantity, 0);

  return (
    <div className={styles.cartPage}>
      <div className={styles.container}>
        <h1 className="heading-1">Your Cart</h1>
        
        <div className={styles.layout}>
          <div className={styles.itemsList}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemImage}>
                  {item.image}
                </div>
                <div className={styles.itemDetails}>
                  <div className={styles.itemHeader}>
                    <h3>{item.name}</h3>
                    <button className={styles.removeBtn}><Trash2 size={18} /></button>
                  </div>
                  <p className={styles.itemVariant}>{item.color} / {item.size}</p>
                  
                  <div className={styles.pricingBreakdown}>
                    <p>Base Price: ${item.basePrice.toFixed(2)}</p>
                    <p>Customization: +${item.customizationFee.toFixed(2)}</p>
                  </div>
                  
                  <div className={styles.itemFooter}>
                    <div className={styles.quantitySelector}>
                      <button className={styles.qtyBtn}>-</button>
                      <span>{item.quantity}</span>
                      <button className={styles.qtyBtn}>+</button>
                    </div>
                    <p className={styles.totalPrice}>
                      ${((item.basePrice + item.customizationFee) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.orderSummary}>
            <h2>Order Summary</h2>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Estimated Tax</span>
              <span>$0.00</span>
            </div>
            
            <div className={styles.totalRow}>
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            
            <button className="btn-primary" style={{ width: '100%', marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
              Proceed to Checkout <ArrowRight size={18} />
            </button>
            
            <p className={styles.secureCheckout}>
              Secure checkout powered by Shopify
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
