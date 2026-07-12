import { useState } from 'react';
import { Type, Image as ImageIcon, LayoutTemplate, Upload } from 'lucide-react';
import styles from './AssetLibrary.module.css';

interface AssetLibraryProps {
  onAddText: () => void;
  onAddImage: (src: string) => void;
}

export default function AssetLibrary({ onAddText, onAddImage }: AssetLibraryProps) {
  const [activeTab, setActiveTab] = useState<'templates' | 'text' | 'uploads'>('text');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onAddImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.library}>
      <div className={styles.tabs}>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'templates' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('templates')}
        >
          <LayoutTemplate size={20} />
          <span>Templates</span>
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'text' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('text')}
        >
          <Type size={20} />
          <span>Text</span>
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'uploads' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('uploads')}
        >
          <ImageIcon size={20} />
          <span>Uploads</span>
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'text' && (
          <div className={styles.textPanel}>
            <button className={styles.addTextBtn} onClick={onAddText}>
              <Type size={18} /> Add Heading
            </button>
            <p className={styles.helperText}>Click the button above to add a new text layer to your design.</p>
          </div>
        )}

        {activeTab === 'uploads' && (
          <div className={styles.uploadPanel}>
            <label className={styles.uploadArea}>
              <input 
                type="file" 
                accept="image/png, image/jpeg, image/svg+xml" 
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              <Upload size={24} className={styles.uploadIcon} />
              <span className={styles.uploadText}>Click to upload artwork</span>
              <span className={styles.uploadSubtext}>Supports PNG, JPG, SVG</span>
            </label>
            
            <div className={styles.savedUploads}>
              {/* This would map over previously uploaded images */}
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className={styles.templatePanel}>
            <div className={styles.templateGrid}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={styles.templateItem}>
                  <div className={styles.templatePlaceholder}>T{i}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
