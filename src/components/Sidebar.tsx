import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const games = [
    {
      id: 'puzzle',
      title: 'Brainrot Puzzle',
      shortTitle: 'Puzzle',
      image: '/puzzles/img1.webp',
      route: '/',
      icon: '🧩'
    },
    {
      id: 'azgame-merge',
      title: 'AZ Brainrot Merge',
      shortTitle: 'AZ Merge',
      image: 'https://game.azgame.io/merge-brainrot/25060601/logo.png',
      route: '/games/azgame-merge',
      icon: '⚡'
    },
    {
      id: 'brainrot-clicker',
      title: 'Italian Brainrot Clicker 2',
      shortTitle: 'Clicker 2',
      image: 'https://game.azgame.io/italian-brainrot-clicker-2/25050902/logo.png',
      route: '/games/brainrot-clicker',
      icon: '👆'
    },
    {
      id: 'brainrot-2048',
      title: '2048 Italian Brainrot',
      shortTitle: '2048',
      image: 'https://game.azgame.io/2048-italian-brainrot/25051605/logo_mini.png',
      route: '/games/brainrot-2048',
      icon: '🔢'
    },
    {
      id: 'brainrot-playground',
      title: 'Italian Brainrot Animals Playground',
      shortTitle: 'Playground',
      image: 'https://www.gameflare.com/favicon.ico',
      route: '/games/brainrot-playground',
      icon: '🎪'
    },
    {
      id: 'brainrot-head-soccer',
      title: 'Italian Brainrot Head Soccer',
      shortTitle: 'Head Soccer',
      image: 'https://www.gameflare.com/favicon.ico',
      route: '/games/brainrot-head-soccer',
      icon: '⚽'
    }
  ];

  const isActive = (route: string) => {
    if (route === '/') {
      return location.pathname === '/';
    }
    return location.pathname === route;
  };

  return (
    <aside style={{
      width: '260px',
      minHeight: '100vh',
      background: '#f7f7f5',
      borderRight: '1px solid #e6e6e4',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid #e6e6e4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
      }}>
        <Link 
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            padding: '8px',
            borderRadius: '6px',
            transition: 'background 0.15s ease',
            margin: '-8px'
          }}
          onMouseOver={(e) => (e.currentTarget as HTMLAnchorElement).style.background = '#f1f1ef'}
          onMouseOut={(e) => (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'}
        >
          <div style={{
            color: '#1976d2',
            fontSize: '1.5rem'
          }}>
            🎮
          </div>
          <div>
            <h1 style={{
              color: '#37352f',
              fontSize: '1.1rem',
              fontWeight: 600,
              margin: 0,
              lineHeight: 1.2
            }}>
              Brainrot Games
            </h1>
            <p style={{
              color: '#787774',
              fontSize: '0.8rem',
              margin: 0,
              lineHeight: 1.2
            }}>
              Game Collection
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav style={{
        flex: 1,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <h3 style={{
          color: '#787774',
          fontSize: '0.75rem',
          fontWeight: 500,
          margin: 0,
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Games
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px'
        }}>
          {games.map((game) => (
            <Link
              key={game.id}
              to={game.route}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '12px 8px',
                background: isActive(game.route) ? '#e9e9e7' : 'transparent',
                borderRadius: '6px',
                textDecoration: 'none',
                color: '#37352f',
                transition: 'all 0.15s ease',
                position: 'relative'
              }}
              onMouseOver={(e) => {
                if (!isActive(game.route)) {
                  (e.currentTarget as HTMLAnchorElement).style.background = '#f1f1ef';
                }
              }}
              onMouseOut={(e) => {
                if (!isActive(game.route)) {
                  (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                }
              }}
              title={game.title}
            >
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '6px',
                overflow: 'hidden',
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                marginBottom: '8px',
                border: '1px solid #e6e6e4'
              }}>
                <img
                  src={game.image}
                  alt={`${game.title} icon`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const parent = target.parentElement;
                    if (parent) {
                      target.style.display = 'none';
                      parent.innerHTML = game.icon;
                      parent.style.fontSize = '1.6rem';
                      parent.style.color = '#1976d2';
                    }
                  }}
                />
              </div>
              
              <span style={{
                fontSize: '0.7rem',
                fontWeight: 500,
                textAlign: 'center',
                lineHeight: 1.3,
                color: '#37352f',
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {game.shortTitle}
              </span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div style={{
        padding: '16px 20px',
        borderTop: '1px solid #e6e6e4'
      }}>
        <Link
          to="/games"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '10px 16px',
            background: '#fff',
            borderRadius: '6px',
            textDecoration: 'none',
            color: '#37352f',
            fontSize: '0.8rem',
            fontWeight: 500,
            transition: 'all 0.15s ease',
            border: '1px solid #e6e6e4',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}
          onMouseOver={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = '#f1f1ef';
          }}
          onMouseOut={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = '#fff';
          }}
          title="All Games"
        >
          <span style={{ fontSize: '1rem' }}>📋</span>
          All Games
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;