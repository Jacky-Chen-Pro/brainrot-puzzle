import React, { useState, useEffect } from 'react';

const MobileNotice: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor;
      const isMobileDevice = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  if (!isMobile || isDismissed) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
      color: '#fff',
      padding: '12px 16px',
      zIndex: 1000,
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      fontSize: '0.9rem',
      lineHeight: 1.4
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.2rem' }}>💻</span>
          <span>
            <strong>Better Experience on Desktop:</strong> For the best gaming experience, we recommend playing on a computer or tablet with a larger screen.
          </span>
        </div>
        <button
          onClick={handleDismiss}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            color: '#fff',
            padding: '4px 8px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            flexShrink: 0,
            marginLeft: '12px'
          }}
          onMouseOver={(e) => (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.3)'}
          onMouseOut={(e) => (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.2)'}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default MobileNotice;