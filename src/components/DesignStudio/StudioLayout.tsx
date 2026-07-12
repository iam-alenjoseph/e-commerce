'use client';

import { useState, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Download, Save, Undo, Redo, ZoomIn, ZoomOut, ShoppingCart } from 'lucide-react';
import styles from './StudioLayout.module.css';
import Toolbar from './Toolbar';
import AssetLibrary from './AssetLibrary';

// Konva components must be loaded dynamically with ssr: false
const CanvasEditor = dynamic(() => import('./CanvasEditor'), { ssr: false });

export type DesignElement = {
  id: string;
  type: 'text' | 'image';
  x: number;
  y: number;
  width?: number;
  height?: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  // Text specific
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fill?: string;
  // Image specific
  src?: string;
  image?: HTMLImageElement;
};

export default function StudioLayout() {
  const [elements, setElements] = useState<DesignElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tshirtColor, setTshirtColor] = useState('#ffffff');
  const [scale, setScale] = useState(1);

  const handleSelect = (id: string | null) => {
    setSelectedId(id);
  };

  const handleAddText = () => {
    const newElement: DesignElement = {
      id: `text-${Date.now()}`,
      type: 'text',
      x: 100,
      y: 100,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      text: 'Add Text Here',
      fontSize: 32,
      fontFamily: 'Outfit',
      fill: '#000000',
    };
    setElements([...elements, newElement]);
    setSelectedId(newElement.id);
  };

  const handleAddImage = (src: string) => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      const newElement: DesignElement = {
        id: `img-${Date.now()}`,
        type: 'image',
        x: 50,
        y: 50,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        width: img.width,
        height: img.height,
        src,
        image: img,
      };
      // Scale down large images
      if (newElement.width && newElement.width > 200) {
        newElement.scaleX = 200 / newElement.width;
        newElement.scaleY = 200 / newElement.width;
      }
      setElements([...elements, newElement]);
      setSelectedId(newElement.id);
    };
  };

  const updateElement = (id: string, newProps: Partial<DesignElement>) => {
    setElements(elements.map(el => (el.id === id ? { ...el, ...newProps } : el)));
  };

  const deleteElement = (id: string) => {
    setElements(elements.filter(el => el.id !== id));
    setSelectedId(null);
  };

  return (
    <div className={styles.studioContainer}>
      {/* Top Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Custom Design Studio</h1>
        </div>
        <div className={styles.headerCenter}>
          <button className={styles.iconBtn}><Undo size={20} /></button>
          <button className={styles.iconBtn}><Redo size={20} /></button>
          <div className={styles.divider} />
          <button className={styles.iconBtn} onClick={() => setScale(Math.max(0.5, scale - 0.1))}><ZoomOut size={20} /></button>
          <span className={styles.zoomText}>{Math.round(scale * 100)}%</span>
          <button className={styles.iconBtn} onClick={() => setScale(Math.min(2, scale + 0.1))}><ZoomIn size={20} /></button>
        </div>
        <div className={styles.headerRight}>
          <button className="btn-secondary" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Save size={18} /> Save
          </button>
          <button className="btn-primary" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShoppingCart size={18} /> Add to Cart - $35.00
          </button>
        </div>
      </header>

      <div className={styles.mainLayout}>
        {/* Left Sidebar - Asset Library */}
        <AssetLibrary 
          onAddText={handleAddText} 
          onAddImage={handleAddImage}
        />

        {/* Center - Canvas Area */}
        <div className={styles.canvasArea}>
          <div className={styles.tshirtContainer} style={{ transform: `scale(${scale})` }}>
            {/* T-Shirt Mockup Background */}
            <div 
               className={styles.tshirtMockup} 
               style={{ backgroundColor: tshirtColor }}
            >
              <img src="/tshirt-mockup.png" alt="" className={styles.tshirtMask} style={{ mixBlendMode: 'multiply', opacity: 0.8 }}/>
            </div>
            
            {/* Konva Canvas Overlay */}
            <div className={styles.canvasWrapper}>
              <CanvasEditor 
                elements={elements}
                selectedId={selectedId}
                onSelect={handleSelect}
                onChange={updateElement}
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar - Properties Toolbar */}
        <Toolbar 
          selectedElement={elements.find(el => el.id === selectedId) || null}
          onUpdate={(props) => selectedId && updateElement(selectedId, props)}
          onDelete={() => selectedId && deleteElement(selectedId)}
          tshirtColor={tshirtColor}
          onColorChange={setTshirtColor}
        />
      </div>
    </div>
  );
}
