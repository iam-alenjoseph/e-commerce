import React, { useEffect, useRef } from 'react';
import { Stage, Layer, Text, Image as KonvaImage, Transformer } from 'react-konva';
import { DesignElement } from './StudioLayout';

interface CanvasEditorProps {
  elements: DesignElement[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onChange: (id: string, newProps: Partial<DesignElement>) => void;
}

export default function CanvasEditor({ elements, selectedId, onSelect, onChange }: CanvasEditorProps) {
  const trRef = useRef<any>(null);
  const stageRef = useRef<any>(null);

  // Effect to attach transformer to selected node
  useEffect(() => {
    if (selectedId && trRef.current && stageRef.current) {
      const node = stageRef.current.findOne(`#${selectedId}`);
      if (node) {
        trRef.current.nodes([node]);
        trRef.current.getLayer().batchDraw();
      }
    }
  }, [selectedId, elements]);

  const checkDeselect = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      onSelect(null);
    }
  };

  return (
    <Stage 
      width={200} 
      height={280} 
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
      ref={stageRef}
    >
      <Layer>
        {elements.map((el) => {
          if (el.type === 'text') {
            return (
              <Text
                key={el.id}
                id={el.id}
                x={el.x}
                y={el.y}
                text={el.text}
                fontSize={el.fontSize}
                fontFamily={el.fontFamily}
                fill={el.fill}
                rotation={el.rotation}
                scaleX={el.scaleX}
                scaleY={el.scaleY}
                draggable
                onClick={() => onSelect(el.id)}
                onTap={() => onSelect(el.id)}
                onDragEnd={(e) => {
                  onChange(el.id, { x: e.target.x(), y: e.target.y() });
                }}
                onTransformEnd={(e) => {
                  const node = e.target;
                  onChange(el.id, {
                    x: node.x(),
                    y: node.y(),
                    rotation: node.rotation(),
                    scaleX: node.scaleX(),
                    scaleY: node.scaleY(),
                  });
                }}
              />
            );
          } else if (el.type === 'image' && el.image) {
            return (
              <KonvaImage
                key={el.id}
                id={el.id}
                image={el.image}
                x={el.x}
                y={el.y}
                width={el.width}
                height={el.height}
                rotation={el.rotation}
                scaleX={el.scaleX}
                scaleY={el.scaleY}
                draggable
                onClick={() => onSelect(el.id)}
                onTap={() => onSelect(el.id)}
                onDragEnd={(e) => {
                  onChange(el.id, { x: e.target.x(), y: e.target.y() });
                }}
                onTransformEnd={(e) => {
                  const node = e.target;
                  onChange(el.id, {
                    x: node.x(),
                    y: node.y(),
                    rotation: node.rotation(),
                    scaleX: node.scaleX(),
                    scaleY: node.scaleY(),
                  });
                }}
              />
            );
          }
          return null;
        })}
        {selectedId && (
          <Transformer
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) => {
              // Limit resize
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
        )}
      </Layer>
    </Stage>
  );
}
