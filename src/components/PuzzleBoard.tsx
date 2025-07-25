import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';

interface Tile {
  id: number;
  x: number;
  y: number;
  imgSrc: string;
}

const GRID_SIZE = 3; // 3x3 拼图

interface PuzzleBoardProps {
  onImageIndexChange?: (index: number) => void;
  selectedImageIndex?: number;
}

const PuzzleBoard = forwardRef<{ handleUpload: () => void; handleShuffle: () => void; getCurrentImageIndex: () => number }, PuzzleBoardProps>(({ onImageIndexChange, selectedImageIndex }, ref) => {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTiming, setIsTiming] = useState(false);
  const timerRef = useRef<number | null>(null);
  // 新增：每个块的打勾动画状态
  const [checkMarks, setCheckMarks] = useState<boolean[]>([]);
  // 新增拖拽相关状态
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<{x: number, y: number}>({x: 0, y: 0});
  const [mousePos, setMousePos] = useState<{x: number, y: number}>({x: 0, y: 0});
  const [isMusicOn, setIsMusicOn] = useState(true);
  const [showModal, setShowModal] = useState(false);
  // 1. 获取拼图区实际宽度
  // 移除未使用的setBoardSize
  // const [boardSize, setBoardSize] = useState(360);
  const boardSize = 360;

  // 自动导入所有图片和音乐，并按编号排序一一对应
  const imageModules = import.meta.glob('/public/puzzles/img*.webp', { eager: true, as: 'url' });
  const musicModules = import.meta.glob('/public/music/bgm*.mp3', { eager: true, as: 'url' });

  function extractNum(filename: string) {
    const match = filename.match(/(img|bgm)(\d+)/);
    return match ? parseInt(match[2], 10) : 0;
  }

  const images = Object.entries(imageModules)
    .sort(([a], [b]) => extractNum(a) - extractNum(b))
    .map(([, url]) => url as string);

  const musicList = Object.entries(musicModules)
    .sort(([a], [b]) => extractNum(a) - extractNum(b))
    .map(([, url]) => url as string);

  // 随机初始索引
  const getRandomIndex = () => Math.floor(Math.random() * images.length);
  const [currentImgIndex, setCurrentImgIndex] = useState(selectedImageIndex ?? getRandomIndex());

  // 当外部传入选择的图片索引时，更新当前图片
  useEffect(() => {
    if (selectedImageIndex !== undefined && selectedImageIndex !== currentImgIndex) {
      setCurrentImgIndex(selectedImageIndex);
    }
  }, [selectedImageIndex, currentImgIndex]);

  // 通知外部当前图片索引变化
  useEffect(() => {
    if (onImageIndexChange) {
      onImageIndexChange(currentImgIndex);
    }
  }, [currentImgIndex, onImageIndexChange]);

  // 上传图片后，直接切割并按顺序排列
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        // 切割图片并按顺序排列
        const img = new window.Image();
        img.src = ev.target?.result as string;
        img.onload = () => {
          // 确保使用正方形切割 - 取最小边作为基准
          const minSize = Math.min(img.width, img.height);
          const tileSize = minSize / GRID_SIZE;
          
          // 计算居中偏移量，确保从图片中心切割
          const offsetX = (img.width - minSize) / 2;
          const offsetY = (img.height - minSize) / 2;
          
          const newTiles: Tile[] = [];
          for (let y = 0; y < GRID_SIZE; y++) {
            for (let x = 0; x < GRID_SIZE; x++) {
              const canvas = document.createElement('canvas');
              canvas.width = tileSize;
              canvas.height = tileSize;
              const ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.drawImage(
                  img,
                  offsetX + x * tileSize,
                  offsetY + y * tileSize,
                  tileSize,
                  tileSize,
                  0,
                  0,
                  tileSize,
                  tileSize
                );
                newTiles.push({
                  id: y * GRID_SIZE + x,
                  x,
                  y,
                  imgSrc: canvas.toDataURL(),
                });
              }
            }
          }
          setTiles(newTiles); // 正常顺序
          setIsCompleted(false);
          setCheckMarks(new Array(newTiles.length).fill(false));
        };
      };
      reader.readAsDataURL(file);
    }
  };

  // 自动加载第一张图片
  useEffect(() => {
    loadAndSliceImage(images[currentImgIndex]);
    // eslint-disable-next-line
  }, [currentImgIndex]);

  // 加载图片并切割打乱
  function loadAndSliceImage(imgPath: string) {
    setIsCompleted(false);
    setTimer(0);
    setIsTiming(true);
    const img = new window.Image();
    img.src = imgPath;
    img.onload = () => {
      // 确保使用正方形切割 - 取最小边作为基准
      const minSize = Math.min(img.width, img.height);
      const tileSize = minSize / GRID_SIZE;
      
      // 计算居中偏移量，确保从图片中心切割
      const offsetX = (img.width - minSize) / 2;
      const offsetY = (img.height - minSize) / 2;
      
      const newTiles: Tile[] = [];
      for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
          const canvas = document.createElement('canvas');
          canvas.width = tileSize;
          canvas.height = tileSize;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(
              img,
              offsetX + x * tileSize,
              offsetY + y * tileSize,
              tileSize,
              tileSize,
              0,
              0,
              tileSize,
              tileSize
            );
            newTiles.push({
              id: y * GRID_SIZE + x,
              x,
              y,
              imgSrc: canvas.toDataURL(),
            });
          }
        }
      }
      setTiles(shuffleArray(newTiles));
      setCheckMarks(new Array(newTiles.length).fill(false));
    };
  }

  // 计时器副作用
  useEffect(() => {
    if (isTiming) {
      timerRef.current = window.setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isTiming]);

  // 切割并打乱拼图时重置计时器并开始计时
  const handleSliceImage = () => {
    setIsCompleted(false);
    setTiles(prev => shuffleArray([...prev]));
    setTimer(0);
    setIsTiming(true);
    setCheckMarks(prev => new Array(prev.length).fill(false));
  };

  // 简单洗牌算法
  function shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const checkCompleted = (tiles: Tile[]) => {
    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i].id !== i) return false;
    }
    return true;
  };

  // 监听鼠标移动和松开事件
  useEffect(() => {
    if (draggingIdx === null) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    const handleMouseUp = (e: MouseEvent) => {
      // 计算落点
      const boardRect = (document.querySelector('#puzzle-board') as HTMLElement)?.getBoundingClientRect();
      if (!boardRect) {
        setDraggingIdx(null);
        document.body.style.userSelect = '';
        return;
      }
      const x = e.clientX - boardRect.left;
      const y = e.clientY - boardRect.top;
      const col = Math.floor(x / (360 / GRID_SIZE));
      const row = Math.floor(y / (360 / GRID_SIZE));
      const dropIdx = row * GRID_SIZE + col;
      if (
        dropIdx >= 0 &&
        dropIdx < tiles.length &&
        dropIdx !== draggingIdx &&
        tiles[dropIdx].id !== dropIdx // 不能拖到已锁定块
      ) {
        const newTiles = [...tiles];
        [newTiles[draggingIdx], newTiles[dropIdx]] = [newTiles[dropIdx], newTiles[draggingIdx]];
        setTiles(newTiles);
        // 检查是否新到位
        if (newTiles[dropIdx].id === dropIdx) {
          setCheckMarks(prev => {
            const arr = [...prev];
            arr[dropIdx] = true;
            return arr;
          });
          setTimeout(() => {
            setCheckMarks(prev => {
              const arr = [...prev];
              arr[dropIdx] = false;
              return arr;
            });
          }, 600);
        }
        // 完成拼图时弹出自定义弹窗
        if (checkCompleted(newTiles)) {
          setIsCompleted(true);
          setIsTiming(false);
          setShowModal(true);
        }
      }
      setDraggingIdx(null);
      document.body.style.userSelect = '';
    };
    // 2. touchmove时阻止默认滚动（只在拖拽时阻止）
    const handleTouchMove = (e: TouchEvent) => {
      if (draggingIdx !== null) {
        e.preventDefault();
        const touch = e.touches[0];
        setMousePos({ x: touch.clientX, y: touch.clientY });
      }
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const boardRect = (document.querySelector('#puzzle-board') as HTMLElement)?.getBoundingClientRect();
      if (!boardRect) {
        setDraggingIdx(null);
        document.body.style.userSelect = '';
        return;
      }
      // 用changedTouches[0]，因为touchend时touches为空
      const touch = e.changedTouches[0];
      const x = touch.clientX - boardRect.left;
      const y = touch.clientY - boardRect.top;
      const col = Math.floor(x / (boardRect.width / GRID_SIZE));
      const row = Math.floor(y / (boardRect.height / GRID_SIZE));
      const dropIdx = row * GRID_SIZE + col;
      if (
        dropIdx >= 0 &&
        dropIdx < tiles.length &&
        dropIdx !== draggingIdx &&
        tiles[dropIdx].id !== dropIdx
      ) {
        const newTiles = [...tiles];
        [newTiles[draggingIdx], newTiles[dropIdx]] = [newTiles[dropIdx], newTiles[draggingIdx]];
        setTiles(newTiles);
        if (newTiles[dropIdx].id === dropIdx) {
          setCheckMarks(prev => {
            const arr = [...prev];
            arr[dropIdx] = true;
            return arr;
          });
          setTimeout(() => {
            setCheckMarks(prev => {
              const arr = [...prev];
              arr[dropIdx] = false;
              return arr;
            });
          }, 600);
        }
        if (checkCompleted(newTiles)) {
          setIsCompleted(true);
          setIsTiming(false);
          setShowModal(true);
        }
      }
      setDraggingIdx(null);
      document.body.style.userSelect = '';
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    // useEffect中监听touchmove时，设置{ passive: false }，以允许preventDefault
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [draggingIdx, tiles]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 切换图片时播放对应音乐（受 isMusicOn 控制）
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.src = musicList[currentImgIndex];
    audioRef.current.currentTime = 0;
    if (isMusicOn) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [currentImgIndex, isMusicOn]);

  // 解决首次加载音乐不自动播放问题
  useEffect(() => {
    const tryPlay = () => {
      if (audioRef.current && isMusicOn) {
        audioRef.current.play();
      }
      window.removeEventListener('click', tryPlay);
    };
    window.addEventListener('click', tryPlay);
    return () => window.removeEventListener('click', tryPlay);
  }, [isMusicOn]);

  // 页面加载时尝试播放音乐
  useEffect(() => {
    if (audioRef.current && isMusicOn) {
      audioRef.current.play().catch(() => {});
    }
  }, []);

  // 音乐播放完自动循环（未完成拼图且音乐开时）
  const handleMusicEnded = () => {
    if (!isCompleted && isMusicOn && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  // 音乐按钮渲染逻辑
  const musicButton = (
    <div style={{ position: 'relative', zIndex: 10 }}>
      <button
        onClick={async () => {
          if (!audioRef.current) return;
          if (isMusicOn) {
            audioRef.current.pause();
            setIsMusicOn(false);
          } else {
            try {
              await audioRef.current.play();
            } catch (e) {}
            setIsMusicOn(true);
          }
        }}
        style={{
          background: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: 44,
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isMusicOn ? '0 2px 8px #90caf9' : '0 2px 8px #eee',
          cursor: 'pointer',
          transition: 'box-shadow 0.2s',
          outline: 'none',
          padding: 0
        }}
        title={isMusicOn ? 'Turn off music' : 'Turn on music'}
      >
        {isMusicOn ? (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1976d2" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5,9 9,9 13,5 13,19 9,15 5,15" fill="#90caf9" stroke="#1976d2"/>
            <path d="M16 8.82a4 4 0 0 1 0 6.36" />
            <path d="M19 5a9 9 0 0 1 0 14" />
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5,9 9,9 13,5 13,19 9,15 5,15" fill="#eee" stroke="#aaa"/>
            <line x1="18" y1="6" x2="6" y2="18" stroke="#e57373" strokeWidth="2.5"/>
          </svg>
        )}
      </button>
    </div>
  );

  const [musicBtnSlot, setMusicBtnSlot] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setMusicBtnSlot(document.getElementById('music-btn-slot'));
  }, []);

  // 暴露方法给外部
  useImperativeHandle(ref, () => ({
    handleUpload: () => {
      fileInputRef.current?.click();
    },
    handleShuffle: () => {
      handleSliceImage();
    },
    getCurrentImageIndex: () => {
      return currentImgIndex;
    }
  }));

  return (
    <div style={{ textAlign: 'center' }}>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />
      {/* 计时器显示 */}
      <div style={{ margin: '12px 0', fontSize: 20, color: '#1976d2', fontWeight: 700 }}>
        Time: {timer}s
      </div>
      {/* 只保留拼图内容和其它功能，不再渲染按钮 */}
      {/* 拼图区美化，修正溢出 */}
      <div id="puzzle-board"
        onTouchMove={e => {
          if (draggingIdx !== null) e.preventDefault();
        }}
        style={{
          position: 'relative',
          margin: '24px auto',
          width: 360,
          height: 360,
          background: '#fff',
          borderRadius: 18,
          boxShadow: '0 4px 32px rgba(25, 118, 210, 0.10)',
          border: '2px solid #e3eaf2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden', // 防止图片溢出
          boxSizing: 'border-box',
        }}>
        <div style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
          gap: 3,
          background: '#e3eaf2',
          borderRadius: 12,
          boxShadow: '0 2px 8px #e3eaf2',
          boxSizing: 'border-box',
          overflow: 'hidden',
          aspectRatio: '1 / 1',
        }}>
          {tiles.map((tile, idx) => {
            const isCorrect = tile.id === idx;
            const isDragging = draggingIdx === idx;
            return (
              <div
                key={tile.id}
                style={{ 
                  position: 'relative', 
                  width: '100%', 
                  height: '100%',
                  aspectRatio: '1 / 1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseDown={e => {
                  if (isCorrect) return;
                  setDraggingIdx(idx);
                  const rect = (e.target as HTMLElement).getBoundingClientRect();
                  setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                  setMousePos({ x: e.clientX, y: e.clientY });
                  document.body.style.userSelect = 'none';
                }}
                onTouchStart={e => {
                  if (isCorrect) return;
                  e.preventDefault();
                  setDraggingIdx(idx);
                  const touch = e.touches[0];
                  const rect = (e.target as HTMLElement).getBoundingClientRect();
                  setDragOffset({ x: touch.clientX - rect.left, y: touch.clientY - rect.top });
                  setMousePos({ x: touch.clientX, y: touch.clientY });
                  document.body.style.userSelect = 'none';
                }}
              >
                {/* 拖拽时原位置半透明 */}
                <img
                  src={tile.imgSrc}
                  alt={`Puzzle tile ${tile.id + 1} of ${tiles.length}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    aspectRatio: '1 / 1',
                    border: draggingIdx === idx ? '2px solid #1976d2' : '1px solid #ccc',
                    boxSizing: 'border-box',
                    cursor: isCorrect ? 'default' : 'grab',
                    opacity: isDragging ? 0.3 : (isCorrect ? 0.7 : 1),
                    transition: 'border 0.2s, opacity 0.2s',
                    pointerEvents: isDragging ? 'none' : 'auto',
                  }}
                />
                {/* 打勾动画 */}
                {checkMarks[idx] && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none',
                    animation: 'fadeCheck 0.6s',
                    zIndex: 2
                  }}>
                    <svg width="48" height="48" viewBox="0 0 48 48">
                      <circle cx="24" cy="24" r="22" fill="rgba(255,255,255,0.7)"/>
                      <polyline points="14,26 22,34 34,16" fill="none" stroke="#4caf50" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {/* 拖拽预览块 */}
        {draggingIdx !== null && (
          <img
            src={tiles[draggingIdx].imgSrc}
            alt={`Dragging puzzle tile ${tiles[draggingIdx].id + 1}`}
            style={{
              position: 'fixed',
              left: mousePos.x - dragOffset.x,
              top: mousePos.y - dragOffset.y,
              width: boardSize / GRID_SIZE,
              height: boardSize / GRID_SIZE,
              pointerEvents: 'none',
              zIndex: 9999,
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              border: '2px solid #1976d2',
              borderRadius: 6,
              opacity: 0.95,
              transition: 'none',
            }}
          />
        )}
      </div>
      {isCompleted && (
        <div style={{color: 'green', fontWeight: 'bold', fontSize: 24, marginTop: 16}}>Puzzle Completed!</div>
      )}
      {isCompleted && (
        <button
          style={{ marginTop: 16, fontSize: 18, padding: '8px 24px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}
          onClick={() => {
            const nextIdx = (currentImgIndex + 1) % images.length;
            setCurrentImgIndex(nextIdx);
          }}
        >
          Next Image
        </button>
      )}
      {/* 音乐按钮用portal渲染到标题右侧 */}
      {musicBtnSlot ? ReactDOM.createPortal(musicButton, musicBtnSlot) : musicButton}
      <audio ref={audioRef} src={musicList[currentImgIndex]} onEnded={handleMusicEnded} autoPlay loop={false} />
      {/* 自定义弹窗 */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.32)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 16,
            boxShadow: '0 8px 32px rgba(25,118,210,0.18)',
            padding: '32px 36px 24px 36px',
            minWidth: 320,
            textAlign: 'center',
            animation: 'fadeInModal 0.3s',
          }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#1976d2', marginBottom: 12 }}>Puzzle Completed!</div>
            <div style={{ fontSize: 18, color: '#333', marginBottom: 24 }}>Congratulations! You solved the puzzle in <b>{timer}s</b>.</div>
            <button
              style={{
                fontSize: 18,
                padding: '8px 32px',
                background: '#1976d2',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                fontWeight: 600,
                boxShadow: '0 2px 8px #e3eaf2',
                transition: 'background 0.2s',
              }}
              onClick={() => setShowModal(false)}
              autoFocus
            >OK</button>
          </div>
          <style>{`
            @keyframes fadeInModal {
              0% { opacity: 0; transform: scale(0.92); }
              100% { opacity: 1; transform: scale(1); }
            }
          `}</style>
        </div>
      )}
    </div>
  );
});

export default PuzzleBoard;

// 在组件外部加上动画样式
<style>{`
@keyframes fadeCheck {
  0% { opacity: 0; transform: scale(0.7); }
  30% { opacity: 1; transform: scale(1.1); }
  60% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.9); }
}
`}</style> 