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
  // Try direct first, then proxy if that fails
  const [useProxy, setUseProxy] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleIframeError = () => {
    setIsLoading(false);
    console.log('Iframe error occurred, retry count:', retryCount);
    
    if (!useProxy && retryCount === 0) {
      // First try: direct failed, try proxy
      console.log('Direct URL failed, trying proxy');
      setUseProxy(true);
      setIsLoading(true);
      setRetryCount(1);
    } else {
      // Both failed, show fallback
      console.log('Both direct and proxy failed, showing fallback');
      setShowFallback(true);
    }
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    setTimeout(() => {
      const iframe = iframeRef.current;
      if (iframe) {
        console.log('Iframe loaded successfully');
        console.log('Iframe src:', iframe.src);
        console.log('Using proxy:', useProxy);
        
        // Try to inspect what we got
        try {
          if (iframe.contentDocument) {
            const body = iframe.contentDocument.body;
            console.log('Iframe content body:', body ? body.innerHTML.substring(0, 200) + '...' : 'No body');
          } else {
            console.log('Cannot access iframe contentDocument (cross-origin)');
          }
        } catch (e) {
          console.log('Cross-origin iframe - cannot inspect content');
        }
      }
    }, 1000);
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
    <div style={{ position: 'relative', width, height }}>
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f8faff',
          zIndex: 1
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>🎮</div>
            <div style={{ color: '#1976d2', fontWeight: 600 }}>Loading game...</div>
            <div style={{ color: '#666', fontSize: '0.9rem', marginTop: '8px' }}>
              {useProxy ? 'Trying proxy server...' : 'Loading directly...'}
              {retryCount > 0 && ' (retry)'}
            </div>
          </div>
        </div>
      )}
      
      <iframe
        ref={iframeRef}
        src={iframeSrc}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block'
        }}
        title={title}
        loading="eager"
        sandbox="allow-same-origin allow-scripts allow-forms allow-pointer-lock allow-popups allow-top-navigation allow-popups-to-escape-sandbox allow-downloads allow-modals"
        onError={handleIframeError}
        onLoad={handleIframeLoad}
        allow="fullscreen; gamepad; microphone"
      />
    </div>
  );
};

export default GameIframe;