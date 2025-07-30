import React from 'react';
import { useLocation } from 'react-router-dom';

const GameInfo: React.FC = () => {
  const location = useLocation();

  // 根据当前路径确定游戏信息
  const getGameInfo = () => {
    const path = location.pathname;
    
    if (path === '/') {
      return {
        title: 'Brainrot Puzzle',
        description: 'Classic sliding puzzle game featuring Italian Brainrot characters',
        features: ['3x3 Sliding Puzzle', 'Character Gallery', 'Background Music', 'Timer'],
        instructions: [
          'Choose any character from the gallery below',
          'Click "Shuffle Puzzle" to start a new game',
          'Drag and swap tiles to complete the puzzle',
          'Enjoy the background music for each character',
          'Try to solve the puzzle as fast as you can'
        ],
        difficulty: 'Easy to Medium',
        tips: [
          'Start by positioning corner pieces first',
          'Work on edges before filling the center',
          'Each character has unique background music',
          'Gallery auto-scrolls to showcase all characters'
        ]
      };
    } else if (path.includes('/games/azgame-merge')) {
      return {
        title: 'AZ Brainrot Merge',
        description: 'Merge identical characters to create new and more powerful entities',
        features: ['Merge Gameplay', 'Character Collection', 'Progressive Difficulty', 'Web Based'],
        instructions: [
          'Click and drag characters to move them around the board',
          'Merge identical characters by combining them together',
          'Watch as characters evolve into new forms when merged',
          'Strategically manage your board space for optimal merging',
          'Aim for high scores by creating longer merge chains'
        ],
        difficulty: 'Medium',
        tips: [
          'Plan your moves to maximize merge opportunities',
          'Keep some space available for new character spawns',
          'Higher-tier characters give more points',
          'Look for combo opportunities to boost your score'
        ]
      };
    } else if (path.includes('/games/brainrot-clicker')) {
      return {
        title: 'Italian Brainrot Clicker 2',
        description: 'Click your way through Italian Brainrot characters in this addictive incremental experience',
        features: ['Click Mechanics', 'Character Upgrades', 'Idle Progression', 'Achievement System'],
        instructions: [
          'Click on the main character to earn points',
          'Purchase upgrades to increase your clicking power',
          'Buy generators to earn points automatically',
          'Unlock new characters and upgrades as you progress',
          'Complete achievements for bonus rewards'
        ],
        difficulty: 'Easy',
        tips: [
          'Balance between manual clicking and auto-generators',
          'Upgrade early for exponential growth',
          'Check back regularly for idle progression',
          'Focus on achievements for extra bonuses'
        ]
      };
    } else if (path.includes('/games/brainrot-2048')) {
      return {
        title: '2048 Italian Brainrot',
        description: 'Classic 2048 puzzle with Italian Brainrot character tiles',
        features: ['2048 Mechanics', 'Brainrot Characters', 'High Score System', 'Smooth Animations'],
        instructions: [
          'Use arrow keys or swipe to move tiles in any direction',
          'When two tiles with the same character touch, they merge into one',
          'Try to create the highest-tier Brainrot character possible',
          'Plan your moves carefully to avoid getting stuck',
          'Beat your high score and challenge your friends'
        ],
        difficulty: 'Medium',
        tips: [
          'Keep your highest tile in a corner',
          'Build up tiles in ascending order',
          'Don\'t make random moves - plan ahead',
          'Focus on one direction for major movements'
        ]
      };
    } else if (path.includes('/games/brainrot-playground')) {
      return {
        title: 'Italian Brainrot Animals Playground',
        description: 'Interactive playground featuring Italian Brainrot animals with creative activities',
        features: ['Interactive Playground', 'Animal Characters', 'Creative Activities', 'Free Play'],
        instructions: [
          'Click and interact with different animal characters',
          'Explore various playground activities and mini-games',
          'Experiment with character combinations and interactions',
          'Discover hidden features and easter eggs',
          'Enjoy the creative sandbox environment with no time limits'
        ],
        difficulty: 'Easy',
        tips: [
          'Try clicking on different parts of the screen',
          'Experiment with dragging characters around',
          'Look for interactive elements in the background',
          'There\'s no wrong way to play - be creative!'
        ]
      };
    } else if (path.includes('/games/brainrot-head-soccer')) {
      return {
        title: 'Italian Brainrot Head Soccer',
        description: 'Play head soccer with Italian Brainrot characters in this fun sports game',
        features: ['Head Soccer Gameplay', 'Brainrot Characters', 'Sports Action', 'Multiplayer Fun'],
        instructions: [
          'Use arrow keys to move your character left and right',
          'Press spacebar or up arrow to jump and hit the ball',
          'Try to score goals by hitting the ball into opponent\'s goal',
          'Defend your own goal while attacking the opponent\'s',
          'First to score the target number of goals wins the match'
        ],
        difficulty: 'Medium',
        tips: [
          'Time your jumps carefully to hit the ball',
          'Watch your opponent\'s movements and react quickly',
          'Use the walls to bounce the ball strategically',
          'Practice different angles for more precise shots'
        ]
      };
    }

    // 默认游戏中心信息
    return {
      title: 'Brainrot Games Collection',
      description: 'Explore our growing collection of Italian Brainrot-themed games',
      features: ['Multiple Game Types', 'Character Gallery', 'Progressive Difficulty', 'Free to Play'],
      instructions: [
        'Choose any game from the left sidebar',
        'Each game has unique mechanics and characters',
        'All games feature Italian Brainrot themes',
        'No registration required - start playing instantly'
      ],
      difficulty: 'Varies',
      tips: [
        'Try different games to find your favorite',
        'Each game offers unique challenges',
        'Games are regularly updated with new features',
        'Share your favorite games with friends'
      ]
    };
  };

  const gameInfo = getGameInfo();

  return (
    <div style={{
      width: '300px',
      minHeight: '100vh',
      background: '#f7f7f5',
      borderLeft: '1px solid #e6e6e4',
      position: 'fixed',
      right: 0,
      top: 0,
      padding: '20px',
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    }}>
      {/* Game Title */}
      <div>
        <h2 style={{
          color: '#37352f',
          fontSize: '1.2rem',
          fontWeight: 600,
          margin: '0 0 8px 0',
          lineHeight: 1.3
        }}>
          {gameInfo.title}
        </h2>
        <p style={{
          color: '#787774',
          fontSize: '0.9rem',
          margin: 0,
          lineHeight: 1.4
        }}>
          {gameInfo.description}
        </p>
      </div>

      {/* Difficulty */}
      <div>
        <h3 style={{
          color: '#787774',
          fontSize: '0.75rem',
          fontWeight: 500,
          margin: '0 0 8px 0',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Difficulty
        </h3>
        <span style={{
          display: 'inline-block',
          background: gameInfo.difficulty === 'Easy' ? '#e8f5e8' : 
                     gameInfo.difficulty === 'Medium' ? '#fff3e0' : '#f3e5f5',
          color: gameInfo.difficulty === 'Easy' ? '#2e7d32' : 
                 gameInfo.difficulty === 'Medium' ? '#f57c00' : '#7b1fa2',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '0.8rem',
          fontWeight: 500,
          border: '1px solid',
          borderColor: gameInfo.difficulty === 'Easy' ? '#c8e6c9' : 
                      gameInfo.difficulty === 'Medium' ? '#ffcc02' : '#ce93d8'
        }}>
          {gameInfo.difficulty}
        </span>
      </div>

      {/* Features */}
      <div>
        <h3 style={{
          color: '#787774',
          fontSize: '0.75rem',
          fontWeight: 500,
          margin: '0 0 12px 0',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Features
        </h3>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}>
          {gameInfo.features.map((feature, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 0'
            }}>
              <span style={{ color: '#1976d2', fontSize: '0.8rem' }}>✓</span>
              <span style={{
                color: '#37352f',
                fontSize: '0.85rem',
                lineHeight: 1.4
              }}>
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* How to Play */}
      <div>
        <h3 style={{
          color: '#787774',
          fontSize: '0.75rem',
          fontWeight: 500,
          margin: '0 0 12px 0',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          How to Play
        </h3>
        <ol style={{
          margin: 0,
          paddingLeft: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {gameInfo.instructions.map((instruction, index) => (
            <li key={index} style={{
              color: '#37352f',
              fontSize: '0.85rem',
              lineHeight: 1.4
            }}>
              {instruction}
            </li>
          ))}
        </ol>
      </div>

      {/* Tips */}
      <div>
        <h3 style={{
          color: '#787774',
          fontSize: '0.75rem',
          fontWeight: 500,
          margin: '0 0 12px 0',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Tips
        </h3>
        <div style={{
          background: '#fff',
          border: '1px solid #e6e6e4',
          borderRadius: '6px',
          padding: '12px'
        }}>
          {gameInfo.tips.map((tip, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
              marginBottom: index < gameInfo.tips.length - 1 ? '8px' : '0'
            }}>
              <span style={{ color: '#1976d2', fontSize: '0.8rem', marginTop: '2px' }}>💡</span>
              <span style={{
                color: '#37352f',
                fontSize: '0.8rem',
                lineHeight: 1.4
              }}>
                {tip}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameInfo;