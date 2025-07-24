import { useRef, useState } from 'react';
import './App.css';
import PuzzleBoard from './components/PuzzleBoard';
import ImageGallery from './components/ImageGallery';
import Games from './Games';
import GameDetail from './GameDetail';
import AboutUs from './AboutUs';
import PrivacyPolicy from './PrivacyPolicy';
import CookiePolicy from './CookiePolicy';
import Contact from './Contact';
import Blog from './Blog';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  const puzzleRef = useRef<{ handleUpload: () => void; handleShuffle: () => void; getCurrentImageIndex: () => number }>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | undefined>(undefined);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="App" style={{ maxWidth: 900, margin: '0 auto', padding: '16px 8px' }}>
            <header role="banner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              {/* 游戏中心入口 - 顶部位置 */}
              <section style={{
                width: '100%',
                background: 'linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)',
                borderRadius: '12px',
                padding: '16px 20px',
                textAlign: 'center',
                color: '#fff',
                boxShadow: '0 4px 20px rgba(25, 118, 210, 0.25)',
                marginBottom: '24px'
              }}>
                <h2 style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: 700, 
                  marginBottom: '12px',
                  margin: '0 0 12px 0',
                  color: '#fff'
                }}>
                  🎮 Brainrot Games Center
                </h2>
                <p style={{ 
                  fontSize: '0.95rem', 
                  marginBottom: '16px',
                  opacity: 0.9,
                  margin: '0 auto 16px auto'
                }}>
                  Play sliding puzzles, merge games & more Italian Brainrot adventures!
                </p>
                <Link
                  to="/games"
                  style={{
                    display: 'inline-block',
                    background: '#fff',
                    color: '#1976d2',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseOver={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseOut={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  Explore All Games →
                </Link>
              </section>
              
              <h1 style={{ fontSize: '2.6rem', color: '#1976d2', fontWeight: 800, marginBottom: 4, marginTop: 0 }}>Brainrot Puzzle</h1>
              <p style={{ fontSize: '1rem', color: '#333', fontWeight: 500, marginBottom: 8, margin: 0 }} role="doc-subtitle">Free Online Sliding Puzzle Game</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
                {/* <button onClick={() => puzzleRef.current?.handleUpload()}>Upload Image</button> */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button
                    onClick={() => puzzleRef.current?.handleShuffle()}
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      padding: '10px 32px',
                      background: 'linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 24,
                      boxShadow: '0 2px 12px #90caf9',
                      cursor: 'pointer',
                      transition: 'background 0.2s, box-shadow 0.2s, transform 0.1s',
                      letterSpacing: 1.2,
                      outline: 'none',
                    }}
                    onMouseOver={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(90deg, #1565c0 60%, #42a5f5 100%)';
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 18px #64b5f6';
                      (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px) scale(1.04)';
                    }}
                    onMouseOut={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)';
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 12px #90caf9';
                      (e.currentTarget as HTMLButtonElement).style.transform = 'none';
                    }}
                  >
                    Shuffle Puzzle
                  </button>
                  <div id="music-btn-slot" style={{ marginLeft: 0 }}></div>
                </div>
              </div>
            </header>
            <main role="main" id="main">
              <section aria-labelledby="puzzle-section" style={{ marginBottom: '2rem' }}>
                <h2 id="puzzle-section" className="sr-only">Interactive Puzzle Game</h2>
                <PuzzleBoard 
                  ref={puzzleRef} 
                  onImageIndexChange={setCurrentImageIndex}
                  selectedImageIndex={selectedImageIndex}
                />
              </section>
              
              {/* 图片画廊 */}
              <ImageGallery 
                currentImageIndex={currentImageIndex}
                onImageSelect={(index) => {
                  setSelectedImageIndex(index);
                  // 延迟清除选择，让 PuzzleBoard 有时间响应
                  setTimeout(() => setSelectedImageIndex(undefined), 100);
                }}
              />
              
              {/* 说明内容 */}
              <section
                className="info-section"
                aria-labelledby="about-heading"
                style={{
                  background: '#fff',
                  borderRadius: 18,
                  boxShadow: '0 4px 24px #e3eaf2',
                  padding: '38px 32px',
                  margin: '32px auto 0 auto',
                  display: 'grid',
                  gap: 48,
                  alignItems: 'start',
                  maxWidth: 900,
                  border: '1.5px solid #e3eaf2',
                }}
              >
                <div style={{ textAlign: 'left', paddingRight: 12 }}>
                  <h2 id="about-heading" style={{ color: '#1976d2', fontSize: 26, marginBottom: 16, fontWeight: 800, letterSpacing: 0.2 }}>What is Italian Brainrot?</h2>
                  <p style={{ fontSize: 17, color: '#222', marginBottom: 24, lineHeight: 1.7 }}>
                    Italian Brainrot is a viral meme trend that started in early 2025, featuring bizarre, AI-generated animal-object hybrid characters with Italian narration. Each character has its own unique story, personality, and often a catchy background music. The meme is known for its surreal humor and creative designs.
                  </p>
                  <h2 style={{ color: '#1976d2', fontSize: 24, marginBottom: 14, fontWeight: 800, letterSpacing: 0.2 }}>About the Puzzle Images</h2>
                  <ul style={{ fontSize: 16, color: '#222', marginBottom: 0, paddingLeft: 22, lineHeight: 1.7 }}>
                    <li style={{ marginBottom: 14 }}>
                      <b style={{ fontWeight: 700 }}>Bombardiro Crocodilo:</b> A WWII bomber plane with a crocodile head, one of the most popular characters.
                      <div style={{ color: '#2e7d32', fontWeight: 700, fontSize: 15, margin: '8px 0 2px 0' }}>Origin & Popularity</div>
                      <div style={{ margin: 0, color: '#444', fontSize: 15 }}>Created in 2025, this character is a fan favorite and often appears in meme battles.</div>
                    </li>
                    <li style={{ marginBottom: 14 }}>
                      <b style={{ fontWeight: 700 }}>Ballerina Cappuccina:</b> A ballerina fused with a cappuccino cup, known for her dance and coffee theme.
                      <div style={{ color: '#2e7d32', fontWeight: 700, fontSize: 15, margin: '8px 0 2px 0' }}>Fun Fact</div>
                      <div style={{ margin: 0, color: '#444', fontSize: 15 }}>She is recognized for her graceful moves and whimsical appearance.</div>
                    </li>
                    <li>
                      <b style={{ fontWeight: 700 }}>More characters:</b> Each image in the game represents a unique Italian Brainrot character.
                      <div style={{ color: '#2e7d32', fontWeight: 700, fontSize: 15, margin: '8px 0 2px 0' }}>Learn More</div>
                      <div style={{ margin: 0, color: '#444', fontSize: 15 }}>
                        Want to dive deeper into Italian Brainrot? Read our comprehensive{' '}
                        <Link to="/blog" style={{ color: '#1976d2', textDecoration: 'underline', fontWeight: 600 }}>
                          Italian Brainrot Guide
                        </Link>{' '}
                        to learn about all the characters and the phenomenon behind them.
                      </div>
                    </li>
                  </ul>
                </div>
                <div style={{ textAlign: 'left', paddingLeft: 12 }}>
                  <h2 style={{ color: '#1976d2', fontSize: 26, marginBottom: 16, fontWeight: 800, letterSpacing: 0.2, textAlign: 'center' }}>How to Play</h2>
                  <div style={{ background: '#f5faff', borderRadius: 12, boxShadow: '0 2px 8px #e3eaf2', padding: '18px 20px 16px 24px', marginBottom: 18 }}>
                    <h3 style={{ color: '#1976d2', fontSize: 18, margin: '0 0 10px 0', fontWeight: 700 }}>Game Steps</h3>
                    <ol style={{ fontSize: 16, color: '#222', marginBottom: 0, paddingLeft: 22, lineHeight: 1.7 }}>
                      <li>Each time you start or refresh the page, a random Brainrot character image and music will be selected for your puzzle.</li>
                      <li>Drag and swap tiles to complete the puzzle.</li>
                      <li>When you finish, you’ll see a completion message and can try the next random character!</li>
                    </ol>
                  </div>
                  <div style={{ background: '#f5faff', borderRadius: 12, boxShadow: '0 2px 8px #e3eaf2', padding: '16px 20px 14px 24px' }}>
                    <h3 style={{ color: '#1976d2', fontSize: 18, margin: '0 0 10px 0', fontWeight: 700 }}>Tips</h3>
                    <ul style={{ fontSize: 15, color: '#444', margin: 0, paddingLeft: 22, lineHeight: 1.7 }}>
                      <li>Enjoy the background music for each character!</li>
                      <li>Try to solve the puzzle as fast as you can.</li>
                      <li>Share the game with your friends!</li>
                    </ul>
                  </div>
                </div>
              </section>
              {/* 信息页超链接 */}
              <footer role="contentinfo" style={{ margin: '48px auto 0 auto', textAlign: 'center', fontSize: 17, color: '#1976d2', fontWeight: 600, letterSpacing: 0.2 }}>
                <nav aria-label="Footer navigation">
                  <Link to="/games">All Games</Link>
                  <span style={{ margin: '0 18px', color: '#aaa' }} aria-hidden="true">|</span>
                  <Link to="/blog">Italian Brainrot Guide</Link>
                  <span style={{ margin: '0 18px', color: '#aaa' }} aria-hidden="true">|</span>
                  <Link to="/about">About Us</Link>
                  <span style={{ margin: '0 18px', color: '#aaa' }} aria-hidden="true">|</span>
                  <Link to="/privacy">Privacy Policy</Link>
                  <span style={{ margin: '0 18px', color: '#aaa' }} aria-hidden="true">|</span>
                  <Link to="/cookie">Cookie Policy</Link>
                  <span style={{ margin: '0 18px', color: '#aaa' }} aria-hidden="true">|</span>
                  <Link to="/contact">Contact</Link>
                </nav>
              </footer>
            </main>
          </div>
        } />
        <Route path="/games" element={<>
          <div style={{ width: '100%', maxWidth: 1000, margin: '0 auto', padding: '24px 0 0 0', textAlign: 'left' }}>
            <Link to="/" style={{
              display: 'inline-block',
              marginBottom: 24,
              marginLeft: 12,
              fontSize: 16,
              fontWeight: 700,
              color: '#1976d2',
              background: '#e3eaf2',
              borderRadius: 18,
              padding: '7px 22px',
              textDecoration: 'none',
              boxShadow: '0 2px 8px #e3eaf2',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseOver={(e: React.MouseEvent<HTMLAnchorElement>) => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#bbdefb';
              (e.currentTarget as HTMLAnchorElement).style.color = '#1565c0';
            }}
            onMouseOut={(e: React.MouseEvent<HTMLAnchorElement>) => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#e3eaf2';
              (e.currentTarget as HTMLAnchorElement).style.color = '#1976d2';
            }}
            >← Back to Home</Link>
          </div>
          <Games />
        </>} />
        <Route path="/games/:gameId" element={<>
          <GameDetail />
        </>} />
        <Route path="/blog" element={<>
          <div style={{ width: '100%', maxWidth: 900, margin: '0 auto', padding: '24px 0 0 0', textAlign: 'left' }}>
            <Link to="/" style={{
              display: 'inline-block',
              marginBottom: 24,
              marginLeft: 12,
              fontSize: 16,
              fontWeight: 700,
              color: '#1976d2',
              background: '#e3eaf2',
              borderRadius: 18,
              padding: '7px 22px',
              textDecoration: 'none',
              boxShadow: '0 2px 8px #e3eaf2',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseOver={(e: React.MouseEvent<HTMLAnchorElement>) => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#bbdefb';
              (e.currentTarget as HTMLAnchorElement).style.color = '#1565c0';
            }}
            onMouseOut={(e: React.MouseEvent<HTMLAnchorElement>) => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#e3eaf2';
              (e.currentTarget as HTMLAnchorElement).style.color = '#1976d2';
            }}
            >← Back to Home</Link>
          </div>
          <Blog />
        </>} />
        <Route path="/about" element={<>
          <div style={{ width: '100%', maxWidth: 900, margin: '0 auto', padding: '24px 0 0 0', textAlign: 'left' }}>
            <Link to="/" style={{
              display: 'inline-block',
              marginBottom: 24,
              marginLeft: 12,
              fontSize: 16,
              fontWeight: 700,
              color: '#1976d2',
              background: '#e3eaf2',
              borderRadius: 18,
              padding: '7px 22px',
              textDecoration: 'none',
              boxShadow: '0 2px 8px #e3eaf2',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseOver={(e: React.MouseEvent<HTMLAnchorElement>) => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#bbdefb';
              (e.currentTarget as HTMLAnchorElement).style.color = '#1565c0';
            }}
            onMouseOut={(e: React.MouseEvent<HTMLAnchorElement>) => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#e3eaf2';
              (e.currentTarget as HTMLAnchorElement).style.color = '#1976d2';
            }}
            >← Back to Home</Link>
          </div>
          <AboutUs />
        </>} />
        <Route path="/privacy" element={<>
          <div style={{ width: '100%', maxWidth: 900, margin: '0 auto', padding: '24px 0 0 0', textAlign: 'left' }}>
            <Link to="/" style={{
              display: 'inline-block',
              marginBottom: 24,
              marginLeft: 12,
              fontSize: 16,
              fontWeight: 700,
              color: '#1976d2',
              background: '#e3eaf2',
              borderRadius: 18,
              padding: '7px 22px',
              textDecoration: 'none',
              boxShadow: '0 2px 8px #e3eaf2',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseOver={(e: React.MouseEvent<HTMLAnchorElement>) => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#bbdefb';
              (e.currentTarget as HTMLAnchorElement).style.color = '#1565c0';
            }}
            onMouseOut={(e: React.MouseEvent<HTMLAnchorElement>) => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#e3eaf2';
              (e.currentTarget as HTMLAnchorElement).style.color = '#1976d2';
            }}
            >← Back to Home</Link>
          </div>
          <PrivacyPolicy />
        </>} />
        <Route path="/cookie" element={<>
          <div style={{ width: '100%', maxWidth: 900, margin: '0 auto', padding: '24px 0 0 0', textAlign: 'left' }}>
            <Link to="/" style={{
              display: 'inline-block',
              marginBottom: 24,
              marginLeft: 12,
              fontSize: 16,
              fontWeight: 700,
              color: '#1976d2',
              background: '#e3eaf2',
              borderRadius: 18,
              padding: '7px 22px',
              textDecoration: 'none',
              boxShadow: '0 2px 8px #e3eaf2',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseOver={(e: React.MouseEvent<HTMLAnchorElement>) => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#bbdefb';
              (e.currentTarget as HTMLAnchorElement).style.color = '#1565c0';
            }}
            onMouseOut={(e: React.MouseEvent<HTMLAnchorElement>) => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#e3eaf2';
              (e.currentTarget as HTMLAnchorElement).style.color = '#1976d2';
            }}
            >← Back to Home</Link>
          </div>
          <CookiePolicy />
        </>} />
        <Route path="/contact" element={<>
          <div style={{ width: '100%', maxWidth: 900, margin: '0 auto', padding: '24px 0 0 0', textAlign: 'left' }}>
            <Link to="/" style={{
              display: 'inline-block',
              marginBottom: 24,
              marginLeft: 12,
              fontSize: 16,
              fontWeight: 700,
              color: '#1976d2',
              background: '#e3eaf2',
              borderRadius: 18,
              padding: '7px 22px',
              textDecoration: 'none',
              boxShadow: '0 2px 8px #e3eaf2',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseOver={(e: React.MouseEvent<HTMLAnchorElement>) => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#bbdefb';
              (e.currentTarget as HTMLAnchorElement).style.color = '#1565c0';
            }}
            onMouseOut={(e: React.MouseEvent<HTMLAnchorElement>) => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#e3eaf2';
              (e.currentTarget as HTMLAnchorElement).style.color = '#1976d2';
            }}
            >← Back to Home</Link>
          </div>
          <Contact />
        </>} />
      </Routes>
    </Router>
  );
}

export default App;
