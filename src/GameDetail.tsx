import React from 'react';
import { useParams, Link } from 'react-router-dom';

interface GameInfo {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  url: string;
  features: string[];
  difficulty: string;
  developer: string;
  releaseDate: string;
  tags: string[];
  instructions: string[];
}

const GameDetail: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();

  const gameData: Record<string, GameInfo> = {
    'merge': {
      id: 'merge',
      title: 'Merge Fellas: Brainrot Merge',
      description: 'Merge identical characters to create new ones in this addictive puzzle game',
      longDescription: 'BrainrotMerge is an innovative merge puzzle game that combines the viral Italian Brainrot meme culture with addictive gameplay mechanics. Players merge identical characters to evolve them into new, more powerful forms while experiencing the surreal humor and creativity that defines the Brainrot phenomenon.',
      image: 'https://raw.githubusercontent.com/sagarrudani302/BrainRotMerge/main/TemplateData/favicon.ico',
      url: 'https://sagarrudani302.github.io/BrainRotMerge/',
      features: ['Merge Mechanics', 'Character Evolution', 'Score System', 'Unity WebGL', 'Progressive Difficulty'],
      difficulty: 'Medium',
      developer: 'sagarrudani302',
      releaseDate: '2025',
      tags: ['Puzzle', 'Merge', 'Brainrot', 'Casual', 'Strategy'],
      instructions: [
        'Drag and drop identical characters to merge them',
        'Create higher-tier characters through strategic merging',
        'Plan your moves to maximize score and space efficiency',
        'Unlock new character types as you progress',
        'Challenge yourself to reach the highest evolution levels'
      ]
    }
  };

  const game = gameData[gameId || ''];

  if (!game) {
    return (
      <div style={{ 
        maxWidth: 900, 
        margin: '0 auto', 
        padding: '48px 16px',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#1976d2', fontSize: '2rem', marginBottom: '16px' }}>
          Game Not Found
        </h1>
        <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '24px' }}>
          The game you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/games"
          style={{
            background: '#1976d2',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '1rem'
          }}
        >
          Back to Games
        </Link>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: 1000, 
      margin: '0 auto', 
      padding: '24px 16px',
      background: '#fff'
    }}>
      {/* Back Button */}
      <Link 
        to="/games" 
        style={{
          display: 'inline-block',
          marginBottom: 24,
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
      >
        ← Back to Games
      </Link>

      {/* Game Header */}
      <header style={{ 
        display: 'flex', 
        gap: '24px', 
        marginBottom: '32px',
        alignItems: 'flex-start',
        flexWrap: 'wrap'
      }}>
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '16px',
          overflow: 'hidden',
          flexShrink: 0,
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '3px solid #e3eaf2',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
        }}>
          <img 
            src={game.image} 
            alt={`${game.title} icon`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).parentElement!.innerHTML = '🎮';
              (e.target as HTMLImageElement).parentElement!.style.fontSize = '3rem';
            }}
          />
        </div>
        
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h1 style={{ 
            color: '#1976d2', 
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
            fontWeight: 800, 
            marginBottom: '12px',
            margin: '0 0 12px 0',
            lineHeight: 1.2
          }}>
            {game.title}
          </h1>
          
          <p style={{ 
            color: '#666', 
            fontSize: '1.1rem', 
            marginBottom: '16px',
            margin: '0 0 16px 0',
            lineHeight: 1.6
          }}>
            {game.description}
          </p>
          
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '16px'
          }}>
            <span style={{
              background: '#e8f5e8',
              color: '#2e7d32',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '0.9rem',
              fontWeight: 600
            }}>
              {game.difficulty}
            </span>
            
            {game.tags.map((tag, index) => (
              <span 
                key={index}
                style={{
                  background: '#f3e5f5',
                  color: '#7b1fa2',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: 500
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div style={{ 
            display: 'flex', 
            gap: '16px',
            fontSize: '0.9rem',
            color: '#666'
          }}>
            <span><strong>Developer:</strong> {game.developer}</span>
            <span><strong>Released:</strong> {game.releaseDate}</span>
          </div>
        </div>
      </header>

      {/* Game Iframe */}
      <section style={{ 
        marginBottom: '32px',
        border: '3px solid #e3eaf2',
        borderRadius: '16px',
        overflow: 'hidden',
        background: '#fff',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)',
          padding: '16px 20px',
          color: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '1.2rem' }}>🎮</span>
            <h2 style={{ 
              fontSize: '1.2rem', 
              fontWeight: 700,
              margin: 0,
              color: '#fff'
            }}>
              Play {game.title}
            </h2>
          </div>
          <a 
            href={game.url} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              background: 'rgba(255,255,255,0.2)',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: '20px',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 600,
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.3)'}
            onMouseOut={(e) => (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.2)'}
          >
            Fullscreen ↗
          </a>
        </div>
        <div style={{
          width: '100%',
          height: '600px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f8faff',
          border: '2px dashed #e3eaf2',
          borderRadius: '12px'
        }}>
          <div style={{ textAlign: 'center', padding: '32px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔒</div>
            <h3 style={{ 
              color: '#1976d2', 
              fontSize: '1.3rem', 
              marginBottom: '12px',
              margin: '0 0 12px 0'
            }}>
              Game Cannot be Embedded
            </h3>
            <p style={{ 
              color: '#666', 
              fontSize: '1rem', 
              marginBottom: '24px',
              maxWidth: '400px',
              lineHeight: 1.6
            }}>
              Due to security restrictions, this game cannot be played within an iframe. 
              Please click the button below to play in a new tab.
            </p>
            <a 
              href={game.url} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                background: '#1976d2',
                color: '#fff',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => (e.currentTarget as HTMLAnchorElement).style.background = '#1565c0'}
              onMouseOut={(e) => (e.currentTarget as HTMLAnchorElement).style.background = '#1976d2'}
            >
              🎮 Play Game in New Tab
            </a>
          </div>
        </div>
      </section>

      {/* Game Information */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '32px'
      }}>
        {/* About */}
        <section style={{
          background: '#f8faff',
          border: '2px solid #e3eaf2',
          borderRadius: '16px',
          padding: '24px'
        }}>
          <h3 style={{ 
            color: '#1976d2', 
            fontSize: '1.4rem', 
            fontWeight: 700, 
            marginBottom: '16px',
            margin: '0 0 16px 0'
          }}>
            About This Game
          </h3>
          <p style={{ 
            color: '#333', 
            fontSize: '1rem', 
            lineHeight: 1.7,
            margin: 0
          }}>
            {game.longDescription}
          </p>
        </section>

        {/* Features */}
        <section style={{
          background: '#f8faff',
          border: '2px solid #e3eaf2',
          borderRadius: '16px',
          padding: '24px'
        }}>
          <h3 style={{ 
            color: '#1976d2', 
            fontSize: '1.4rem', 
            fontWeight: 700, 
            marginBottom: '16px',
            margin: '0 0 16px 0'
          }}>
            Key Features
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
                  border: '2px solid #e3eaf2',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '0.95rem',
                  color: '#555',
                  fontWeight: 500
                }}
              >
                ✓ {feature}
              </span>
            ))}
          </div>
        </section>

        {/* How to Play */}
        <section style={{
          background: '#f8faff',
          border: '2px solid #e3eaf2',
          borderRadius: '16px',
          padding: '24px',
          gridColumn: 'span 2'
        }}>
          <h3 style={{ 
            color: '#1976d2', 
            fontSize: '1.4rem', 
            fontWeight: 700, 
            marginBottom: '16px',
            margin: '0 0 16px 0'
          }}>
            How to Play
          </h3>
          <ol style={{ 
            color: '#333', 
            fontSize: '1rem', 
            lineHeight: 1.7,
            paddingLeft: '20px',
            margin: 0
          }}>
            {game.instructions.map((instruction, index) => (
              <li key={index} style={{ marginBottom: '8px' }}>
                {instruction}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
};

export default GameDetail;