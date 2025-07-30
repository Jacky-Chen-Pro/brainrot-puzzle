import React from 'react';
import { Link } from 'react-router-dom';

const Games: React.FC = () => {

  const games = [
    {
      id: 'puzzle',
      title: 'Brainrot Puzzle',
      description: 'Classic sliding puzzle featuring Italian Brainrot characters with background music',
      image: '/puzzles/img1.webp',
      type: 'internal',
      route: '/',
      features: ['3x3 Sliding Puzzle', 'Character Gallery', 'Background Music', 'Timer'],
      difficulty: 'Easy to Medium'
    },
    {
      id: 'brainrot-2048',
      title: '2048 Italian Brainrot',
      description: 'Classic 2048 puzzle game with Italian Brainrot character tiles',
      image: 'https://game.azgame.io/2048-italian-brainrot/25051605/logo_mini.png',
      type: 'external',
      route: '/games/brainrot-2048',
      features: ['2048 Mechanics', 'Brainrot Characters', 'High Score System', 'Smooth Animations'],
      difficulty: 'Medium'
    },
    {
      id: 'brainrot-head-soccer',
      title: 'Italian Brainrot Head Soccer',
      description: 'Play head soccer with Italian Brainrot characters in this fun sports game',
      image: 'https://www.gameflare.com/favicon.ico',
      type: 'external',
      route: '/games/brainrot-head-soccer',
      features: ['Head Soccer Gameplay', 'Brainrot Characters', 'Sports Action', 'Multiplayer Fun'],
      difficulty: 'Medium'
    },
    {
      id: 'merge-brainrot',
      title: 'Merge Brainrot',
      description: 'Merge identical Italian Brainrot characters to create new evolved forms',
      image: 'https://game.azgame.io/merge-brainrot/25060601/logo.png',
      type: 'external',
      route: '/games/merge-brainrot',
      features: ['Merge Mechanics', 'Character Evolution', 'Strategic Gameplay', 'Score System'],
      difficulty: 'Medium'
    },
    {
      id: 'brainrot-mini-challenge',
      title: 'Brainrot Mini Challenge',
      description: 'Take on fun mini-challenges with Italian Brainrot characters',
      image: 'https://www.twoplayergames.org/favicon.ico',
      type: 'external',
      route: '/games/brainrot-mini-challenge',
      features: ['Mini Games', 'Challenge Mode', 'Quick Gameplay', 'Score Competition'],
      difficulty: 'Medium'
    },
    {
      id: 'italian-brainrot-quiz',
      title: 'Italian Brainrot Quiz',
      description: 'Test your knowledge about Italian Brainrot memes and characters',
      image: 'https://www.gameflare.com/favicon.ico',
      type: 'external',
      route: '/games/italian-brainrot-quiz',
      features: ['Quiz Questions', 'Brainrot Knowledge', 'Multiple Choice', 'Score Tracking'],
      difficulty: 'Easy'
    }
  ];

  return (
    <div style={{ 
      maxWidth: 1000, 
      margin: '0 auto', 
      padding: '32px 16px',
      paddingTop: '48px',
      background: '#fff',
      borderRadius: 18,
      boxShadow: '0 4px 24px #e3eaf2',
      lineHeight: 1.7,
      color: '#333'
    }}>
      <header style={{ marginBottom: '48px', textAlign: 'center' }}>
        <h1 style={{ 
          color: '#1976d2', 
          fontSize: 'clamp(2rem, 5vw, 3rem)', 
          fontWeight: 800, 
          marginBottom: '16px',
          lineHeight: 1.2 
        }}>
          Brainrot Games Collection
        </h1>
        <p style={{ 
          color: '#666', 
          fontSize: '1.2rem', 
          margin: 0,
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Explore our growing collection of Italian Brainrot-themed games. Challenge your mind with puzzles, merging, and more!
        </p>
      </header>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', 
        gap: '32px',
        marginBottom: '48px'
      }}>
        {games.map((game) => (
          <article 
            key={game.id}
            style={{
              background: '#f8faff',
              border: '2px solid #e3eaf2',
              borderRadius: '16px',
              padding: '24px',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(25, 118, 210, 0.15)';
              (e.currentTarget as HTMLElement).style.borderColor = '#1976d2';
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              (e.currentTarget as HTMLElement).style.borderColor = '#e3eaf2';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '20px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '12px',
                overflow: 'hidden',
                flexShrink: 0,
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #e3eaf2'
              }}>
                <img 
                  src={game.image} 
                  alt={`${game.title} icon`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.innerHTML = '🎮';
                    (e.target as HTMLImageElement).parentElement!.style.fontSize = '2rem';
                  }}
                />
              </div>
              
              <div style={{ flex: 1 }}>
                <h2 style={{ 
                  color: '#1976d2', 
                  fontSize: '1.5rem', 
                  fontWeight: 700, 
                  marginBottom: '8px',
                  margin: 0
                }}>
                  {game.title}
                </h2>
                <p style={{ 
                  color: '#666', 
                  fontSize: '1rem', 
                  marginBottom: '16px',
                  margin: 0
                }}>
                  {game.description}
                </p>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  marginBottom: '16px'
                }}>
                  <span style={{
                    background: game.difficulty === 'Easy to Medium' ? '#e8f5e8' : '#fff3e0',
                    color: game.difficulty === 'Easy to Medium' ? '#2e7d32' : '#f57c00',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: 600
                  }}>
                    {game.difficulty}
                  </span>
                  
                  <span style={{
                    background: game.type === 'internal' ? '#e3f2fd' : '#f3e5f5',
                    color: game.type === 'internal' ? '#1976d2' : '#7b1fa2',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: 600
                  }}>
                    {game.type === 'internal' ? 'Built-in' : 'Unity WebGL'}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ 
                color: '#1976d2', 
                fontSize: '1.1rem', 
                fontWeight: 600, 
                marginBottom: '12px',
                margin: '0 0 12px 0'
              }}>
                Features
              </h3>
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '8px'
              }}>
                {game.features.map((feature, index) => (
                  <span 
                    key={index}
                    style={{
                      background: '#fff',
                      border: '1px solid #e3eaf2',
                      padding: '6px 12px',
                      borderRadius: '16px',
                      fontSize: '0.9rem',
                      color: '#555'
                    }}
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '12px',
              alignItems: 'center'
            }}>
              <Link
                to={game.route!}
                style={{
                  background: '#1976d2',
                  color: '#fff',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  transition: 'background 0.2s',
                  flex: 1,
                  textAlign: 'center'
                }}
                onMouseOver={(e) => (e.currentTarget as HTMLAnchorElement).style.background = '#1565c0'}
                onMouseOut={(e) => (e.currentTarget as HTMLAnchorElement).style.background = '#1976d2'}
              >
                {game.type === 'internal' ? 'Play Now' : 'Play Game'}
              </Link>
            </div>
          </article>
        ))}
      </div>

      <section style={{
        background: '#f8faff',
        border: '2px solid #e3eaf2',
        borderRadius: '16px',
        padding: '32px',
        textAlign: 'center'
      }}>
        <h2 style={{ 
          color: '#1976d2', 
          fontSize: '1.8rem', 
          fontWeight: 700, 
          marginBottom: '16px',
          margin: '0 0 16px 0'
        }}>
          More Games Coming Soon!
        </h2>
        <p style={{ 
          color: '#666', 
          fontSize: '1.1rem', 
          marginBottom: '24px',
          maxWidth: '600px',
          margin: '0 auto 24px auto'
        }}>
          We're constantly adding new Italian Brainrot-themed games to our collection. 
          Stay tuned for memory games, word puzzles, racing games, and more!
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
          flexWrap: 'wrap',
          fontSize: '2rem'
        }}>
          <span title="Memory Game">🧠</span>
          <span title="Word Puzzle">📝</span>
          <span title="Racing Game">🏎️</span>
          <span title="RPG Adventure">⚔️</span>
          <span title="Music Game">🎵</span>
        </div>
      </section>
    </div>
  );
};

export default Games;