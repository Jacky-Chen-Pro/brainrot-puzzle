import React, { useEffect, useState } from 'react';

interface ImageGalleryProps {
  onImageSelect?: (index: number) => void;
  currentImageIndex?: number;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ onImageSelect, currentImageIndex = 0 }) => {
  // 导入所有图片
  const imageModules = import.meta.glob('/public/puzzles/img*.webp', { eager: true, as: 'url' });
  
  function extractNum(filename: string) {
    const match = filename.match(/img(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  const images = Object.entries(imageModules)
    .sort(([a], [b]) => extractNum(a) - extractNum(b))
    .map(([, url]) => url as string);

  // 创建带索引信息的图片数组，复制3次实现无缝滚动
  const createImageItems = () => {
    const items = [];
    for (let cycle = 0; cycle < 3; cycle++) {
      for (let i = 0; i < images.length; i++) {
        items.push({
          src: images[i],
          originalIndex: i,
          key: `${cycle}-${i}`
        });
      }
    }
    return items;
  };

  const allImageItems = createImageItems();
  
  // 分成两行
  const row1Items = allImageItems.filter((_, index) => index % 2 === 0);
  const row2Items = allImageItems.filter((_, index) => index % 2 === 1);

  const [scrollPosition1, setScrollPosition1] = useState(0);
  const [scrollPosition2, setScrollPosition2] = useState(0);

  useEffect(() => {
    const scrollSpeed = 0.5; // 像素每帧
    const imageWidth = 120; // 图片宽度 + 间距
    const resetPoint = images.length * imageWidth;

    const animate = () => {
      setScrollPosition1(prev => {
        const newPos = prev + scrollSpeed;
        return newPos >= resetPoint ? 0 : newPos;
      });
      
      setScrollPosition2(prev => {
        const newPos = prev - scrollSpeed; // 反方向滚动
        return newPos <= -resetPoint ? 0 : newPos;
      });
    };

    const animationId = setInterval(animate, 16); // ~60fps
    
    return () => clearInterval(animationId);
  }, [images.length]);

  const handleImageClick = (originalIndex: number) => {
    if (onImageSelect) {
      onImageSelect(originalIndex);
    }
  };

  return (
    <section 
      style={{
        margin: '32px auto',
        maxWidth: '900px',
        overflow: 'hidden',
        borderRadius: '18px',
        boxShadow: '0 4px 24px rgba(227, 234, 242, 0.6)',
        background: '#fff',
        padding: '24px 0'
      }}
      aria-labelledby="gallery-heading"
    >
      <h3 
        id="gallery-heading"
        style={{
          textAlign: 'center',
          color: '#1976d2',
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '20px',
          marginTop: 0
        }}
      >
        Italian Brainrot Characters Gallery
      </h3>
      
      {/* 第一行 - 向右滚动 */}
      <div
        style={{
          display: 'flex',
          transform: `translateX(-${scrollPosition1}px)`,
          marginBottom: '16px',
          height: '100px'
        }}
        role="list"
        aria-label="First row of character images"
      >
        {row1Items.map((item) => {
          const isActive = item.originalIndex === currentImageIndex;
          
          return (
            <div
              key={`row1-${item.key}`}
              role="listitem"
              style={{
                minWidth: '100px',
                height: '100px',
                marginRight: '20px',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: isActive ? '3px solid #1976d2' : '2px solid #e3eaf2',
                boxShadow: isActive 
                  ? '0 4px 16px rgba(25, 118, 210, 0.4)' 
                  : '0 2px 8px rgba(227, 234, 242, 0.6)',
                transition: 'all 0.3s ease',
                background: '#f8faff'
              }}
              onClick={() => handleImageClick(item.originalIndex)}
              onMouseOver={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.05)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 20px rgba(25, 118, 210, 0.3)';
                }
              }}
              onMouseOut={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(227, 234, 242, 0.6)';
                }
              }}
            >
              <img
                src={item.src}
                alt={`Italian Brainrot character ${item.originalIndex + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                loading="lazy"
              />
            </div>
          );
        })}
      </div>

      {/* 第二行 - 向左滚动，错位显示 */}
      <div
        style={{
          display: 'flex',
          transform: `translateX(${scrollPosition2 - 80}px)`, // 错位 80px，让效果更明显
          height: '100px'
        }}
        role="list"
        aria-label="Second row of character images"
      >
        {row2Items.map((item) => {
          const isActive = item.originalIndex === currentImageIndex;
          
          return (
            <div
              key={`row2-${item.key}`}
              role="listitem"
              style={{
                minWidth: '100px',
                height: '100px',
                marginRight: '20px',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: isActive ? '3px solid #1976d2' : '2px solid #e3eaf2',
                boxShadow: isActive 
                  ? '0 4px 16px rgba(25, 118, 210, 0.4)' 
                  : '0 2px 8px rgba(227, 234, 242, 0.6)',
                transition: 'all 0.3s ease',
                background: '#f8faff'
              }}
              onClick={() => handleImageClick(item.originalIndex)}
              onMouseOver={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.05)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 20px rgba(25, 118, 210, 0.3)';
                }
              }}
              onMouseOut={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(227, 234, 242, 0.6)';
                }
              }}
            >
              <img
                src={item.src}
                alt={`Italian Brainrot character ${item.originalIndex + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                loading="lazy"
              />
            </div>
          );
        })}
      </div>

      <p style={{
        textAlign: 'center',
        color: '#666',
        fontSize: '0.9rem',
        marginTop: '16px',
        marginBottom: 0,
        fontStyle: 'italic'
      }}>
        Click any character to play their puzzle • Gallery auto-scrolls to showcase all characters
      </p>
    </section>
  );
};

export default ImageGallery;