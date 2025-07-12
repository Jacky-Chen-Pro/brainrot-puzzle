import { useRef } from 'react';
import './App.css';
import PuzzleBoard from './components/PuzzleBoard';
import AboutUs from './AboutUs';
import PrivacyPolicy from './PrivacyPolicy';
import CookiePolicy from './CookiePolicy';
import Contact from './Contact';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  const puzzleRef = useRef<{ handleUpload: () => void; handleShuffle: () => void }>(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="App" style={{ maxWidth: 900, margin: '0 auto', padding: '16px 8px' }}>
            <header style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              <h1 style={{ fontSize: '2.6rem', color: '#1976d2', fontWeight: 800, marginBottom: 4, marginTop: 12 }}>Brainrot Puzzle</h1>
              <h2 style={{ fontSize: '1rem', color: '#333', fontWeight: 500, marginBottom: 8 }}>Free Online Sliding Puzzle Game</h2>
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
            <main>
              <PuzzleBoard ref={puzzleRef} />
              <section
                style={{
                  background: '#fff',
                  borderRadius: 18,
                  boxShadow: '0 4px 24px #e3eaf2',
                  padding: '38px 32px',
                  margin: '32px auto 0 auto',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 48,
                  alignItems: 'start',
                  maxWidth: 900,
                  border: '1.5px solid #e3eaf2',
                }}
              >
                <div style={{ textAlign: 'left', paddingRight: 12 }}>
                  <h2 style={{ color: '#1976d2', fontSize: 26, marginBottom: 16, fontWeight: 800, letterSpacing: 0.2 }}>What is Italian Brainrot?</h2>
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
                      <div style={{ margin: 0, color: '#444', fontSize: 15 }}>For more details, visit the <a href="https://italianbrainrot.miraheze.org/wiki/Main_Page" target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'underline', fontWeight: 600 }}>Italian Brainrot Wiki</a>.</div>
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
              <div style={{ margin: '48px auto 0 auto', textAlign: 'center', fontSize: 17, color: '#1976d2', fontWeight: 600, letterSpacing: 0.2 }}>
                <Link to="/about">About Us</Link>
                <span style={{ margin: '0 18px', color: '#aaa' }}>|</span>
                <Link to="/privacy">Privacy Policy</Link>
                <span style={{ margin: '0 18px', color: '#aaa' }}>|</span>
                <Link to="/cookie">Cookie Policy</Link>
                <span style={{ margin: '0 18px', color: '#aaa' }}>|</span>
                <Link to="/contact">Contact</Link>
              </div>
            </main>
          </div>
        } />
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
