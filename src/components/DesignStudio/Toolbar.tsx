import { Trash2, Type, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { DesignElement } from './StudioLayout';
import styles from './Toolbar.module.css';

interface ToolbarProps {
  selectedElement: DesignElement | null;
  onUpdate: (props: Partial<DesignElement>) => void;
  onDelete: () => void;
  tshirtColor: string;
  onColorChange: (color: string) => void;
}

const COLORS = ['#ffffff', '#000000', '#fca5a5', '#93c5fd', '#fef08a', '#86efac'];
const FONTS = ['Outfit', 'Arial', 'Times New Roman', 'Courier New'];

export default function Toolbar({ selectedElement, onUpdate, onDelete, tshirtColor, onColorChange }: ToolbarProps) {
  return (
    <div className={styles.toolbar}>
      {/* Global Product Properties (Always visible if nothing is selected or shown at top) */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Product Color</h3>
        <div className={styles.colorGrid}>
          {COLORS.map(c => (
            <button
              key={c}
              className={`${styles.colorBtn} ${tshirtColor === c ? styles.colorActive : ''}`}
              style={{ background: c }}
              onClick={() => onColorChange(c)}
            />
          ))}
        </div>
      </div>

      {selectedElement ? (
        <div className={styles.elementProperties}>
          <div className={styles.header}>
            <h3 className={styles.sectionTitle}>Properties</h3>
            <button onClick={onDelete} className={styles.deleteBtn}>
              <Trash2 size={16} />
            </button>
          </div>

          {selectedElement.type === 'text' && (
            <div className={styles.textProps}>
              <div className={styles.propRow}>
                <label>Text</label>
                <input 
                  type="text" 
                  value={selectedElement.text || ''} 
                  onChange={(e) => onUpdate({ text: e.target.value })}
                  className={styles.input}
                />
              </div>

              <div className={styles.propRow}>
                <label>Font Family</label>
                <select 
                  value={selectedElement.fontFamily || 'Outfit'}
                  onChange={(e) => onUpdate({ fontFamily: e.target.value })}
                  className={styles.select}
                >
                  {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>

              <div className={styles.propRow}>
                <label>Color</label>
                <input 
                  type="color" 
                  value={selectedElement.fill || '#000000'}
                  onChange={(e) => onUpdate({ fill: e.target.value })}
                  className={styles.colorPicker}
                />
              </div>
            </div>
          )}

          {selectedElement.type === 'image' && (
            <div className={styles.imageProps}>
              <p className={styles.helperText}>Use the corner handles to resize or rotate the image.</p>
              {/* Could add filters or opacity controls here */}
            </div>
          )}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>Select an element to edit its properties.</p>
        </div>
      )}
    </div>
  );
}
