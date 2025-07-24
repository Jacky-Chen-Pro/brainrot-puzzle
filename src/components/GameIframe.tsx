import React, { useState, useRef } from 'react';

interface GameIframeProps {
  url: string;
  title: string;
  width?: string;
  height?: string;
}

const GameIframe: React.FC<GameIframeProps> = ({ 
  url, 
  title, 
  width = '100%', 
  height = '600px' 
}) => {
  const [useProxy, setUseProxy] = useState(true);
  const [showFallback, setShowFallback] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleIframeError = () => {
    if (useProxy) {
      // Try direct URL if proxy fails
      setUseProxy(false);
    } else {
      // Show fallback if both proxy and direct fail
      setShowFallback(true);
    }
  };

  const handleIframeLoad = () => {
    // Check if iframe is actually blocked
    setTimeout(() => {
      try {
        const iframe = iframeRef.current;
        if (iframe && iframe.contentWindow) {
          // Try to access iframe content to detect if it's blocked
          iframe.contentWindow.location.href;
        }
      } catch (error) {
        // If we can't access it, it might be blocked
        console.log('Iframe access blocked, trying alternatives');
        if (useProxy) {
          setUseProxy(false);
        } else {
          setShowFallback(true);
        }
      }
    }, 2000);
  };

  if (showFallback) {
    return (
      <div style={{
        width,
        height,
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
            href={url} 
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
    );
  }

  const iframeSrc = useProxy ? `/api/proxy?url=${encodeURIComponent(url)}` : url;

  return (
    <iframe
      ref={iframeRef}
      src={iframeSrc}
      style={{
        width,
        height,
        border: 'none',
        display: 'block'
      }}
      title={title}
      loading="lazy"
      sandbox="allow-same-origin allow-scripts allow-forms allow-pointer-lock allow-popups allow-top-navigation"
      onError={handleIframeError}
      onLoad={handleIframeLoad}
    />
  );
};

export default GameIframe;