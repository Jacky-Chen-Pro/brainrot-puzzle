import React from 'react';
import { useParams, Link } from 'react-router-dom';
import GameIframe from './components/GameIframe';

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
    'brainrot-2048': {
      id: 'brainrot-2048',
      title: '2048 Italian Brainrot',
      description: 'Classic 2048 puzzle game with Italian Brainrot character tiles',
      longDescription: '2048 Italian Brainrot combines the addictive gameplay of the classic 2048 puzzle with the viral humor of Italian Brainrot characters. Slide tiles to combine identical characters and work your way up to higher evolutions. Each merge reveals new character designs and unlocks the next tier in the Brainrot hierarchy.',
      image: 'https://game.azgame.io/2048-italian-brainrot/25051605/logo_mini.png',
      url: 'https://game.azgame.io/2048-italian-brainrot/',
      features: ['2048 Mechanics', 'Brainrot Characters', 'High Score System', 'Smooth Animations', 'Progressive Unlocks'],
      difficulty: 'Medium',
      developer: 'AZGame',
      releaseDate: '2025',
      tags: ['Puzzle', '2048', 'Brainrot', 'Logic', 'Casual'],
      instructions: [
        'Use arrow keys or swipe to move tiles in any direction',
        'When two tiles with the same character touch, they merge into one',
        'Try to create the highest-tier Brainrot character possible',
        'Plan your moves carefully to avoid getting stuck',
        'Beat your high score and challenge your friends'
      ]
    },
    'brainrot-head-soccer': {
      id: 'brainrot-head-soccer',
      title: 'Italian Brainrot Head Soccer',
      description: 'Play head soccer with Italian Brainrot characters in this fun sports game',
      longDescription: 'Italian Brainrot Head Soccer brings the beloved Italian Brainrot characters to the soccer field in this exciting head soccer game. Choose your favorite character and compete in fast-paced matches using only your head to score goals. With intuitive controls and addictive gameplay, this sports game combines the humor of Italian Brainrot with classic head soccer mechanics.',
      image: 'https://www.gameflare.com/favicon.ico',
      url: 'https://www.gameflare.com/embed/italian-brainrot-head-soccer/',
      features: ['Head Soccer Gameplay', 'Brainrot Characters', 'Sports Action', 'Multiplayer Fun', 'Tournament Mode'],
      difficulty: 'Medium',
      developer: 'GameFlare',
      releaseDate: '2025',
      tags: ['Sports', 'Soccer', 'Brainrot', 'Head Soccer', 'Competitive'],
      instructions: [
        'Use arrow keys to move your character left and right',
        'Press spacebar or up arrow to jump and hit the ball',
        'Try to score goals by hitting the ball into opponent\'s goal',
        'Defend your own goal while attacking the opponent\'s',
        'First to score the target number of goals wins the match'
      ]
    },
    'merge-brainrot': {
      id: 'merge-brainrot',
      title: 'Merge Brainrot',
      description: 'Merge identical Italian Brainrot characters to create new evolved forms',
      longDescription: 'Merge Brainrot is an addictive puzzle game where you combine identical Italian Brainrot characters to create new, more powerful forms. Strategic thinking and planning are required to maximize your score and progress through increasingly challenging levels. Experience the viral humor of Italian Brainrot while exercising your puzzle-solving skills.',
      image: 'https://game.azgame.io/merge-brainrot/25060601/logo.png',
      url: 'https://game.azgame.io/merge-brainrot/',
      features: ['Merge Mechanics', 'Character Evolution', 'Strategic Gameplay', 'Score System', 'Progressive Difficulty'],
      difficulty: 'Medium',
      developer: 'AZGame',
      releaseDate: '2025',
      tags: ['Merge', 'Puzzle', 'Brainrot', 'Strategy', 'Evolution'],
      instructions: [
        'Drag and drop identical characters to merge them',
        'Create higher-tier characters through strategic combinations',
        'Plan your moves to maximize space efficiency',
        'Watch characters evolve into new forms when merged',
        'Aim for high scores by creating longer merge chains'
      ]
    },
    'brainrot-mini-challenge': {
      id: 'brainrot-mini-challenge',
      title: 'Brainrot Mini Challenge',
      description: 'Take on fun mini-challenges with Italian Brainrot characters',
      longDescription: 'Brainrot Mini Challenge is a collection of quick and entertaining mini-games featuring Italian Brainrot characters. Test your skills across various challenge types, from reflex-based games to puzzle-solving tasks. Each mini-challenge offers unique gameplay mechanics and scoring systems, providing endless entertainment and replayability.',
      image: 'https://www.twoplayergames.org/favicon.ico',
      url: 'https://www.twoplayergames.org/embed/brainrot-mini-challenge',
      features: ['Mini Games', 'Challenge Mode', 'Quick Gameplay', 'Score Competition', 'Variety'],
      difficulty: 'Medium',
      developer: 'Two Player Games',
      releaseDate: '2025',
      tags: ['Mini Games', 'Challenge', 'Brainrot', 'Competition', 'Variety'],
      instructions: [
        'Choose from a variety of available mini-challenges',
        'Read the specific instructions for each challenge',
        'Use mouse or keyboard controls as indicated',
        'Complete challenges as quickly and accurately as possible',
        'Try to beat your high scores and compete with others'
      ]
    },
    'italian-brainrot-quiz': {
      id: 'italian-brainrot-quiz',
      title: 'Italian Brainrot Quiz',
      description: 'Test your knowledge about Italian Brainrot memes and characters',
      longDescription: 'Italian Brainrot Quiz is the ultimate test of your knowledge about the viral Italian Brainrot phenomenon. Challenge yourself with questions about characters, memes, catchphrases, and the cultural impact of this internet sensation. From Bombardino Crocodilo to Cappuccino Assassino, see how well you know the Brainrot universe!',
      image: 'https://www.gameflare.com/favicon.ico',
      url: 'https://www.gameflare.com/embed/italian-brainrot-quiz/',
      features: ['Quiz Questions', 'Brainrot Knowledge', 'Multiple Choice', 'Score Tracking', 'Educational Fun'],
      difficulty: 'Easy',
      developer: 'GameFlare',
      releaseDate: '2025',
      tags: ['Quiz', 'Knowledge', 'Brainrot', 'Educational', 'Trivia'],
      instructions: [
        'Read each question carefully about Italian Brainrot',
        'Select the correct answer from multiple choice options',
        'Learn interesting facts about Brainrot characters and memes',
        'Track your score and see how well you know the topic',
        'Challenge friends to beat your quiz score'
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
      paddingTop: '48px',
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
        </div>
        <GameIframe 
          url={game.url}
          title={game.title}
          width="100%"
          height="600px"
        />
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