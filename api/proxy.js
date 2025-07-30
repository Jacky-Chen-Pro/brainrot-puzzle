// Vercel Serverless Function to proxy the game
export default async function handler(req, res) {
  const { url } = req.query;
  
  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  console.log('Proxying URL:', url);

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Upgrade-Insecure-Requests': '1'
      },
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type') || '';
    console.log('Content type:', contentType);
    
    if (!contentType.includes('text/html')) {
      // If it's not HTML, just proxy it as-is
      const buffer = await response.arrayBuffer();
      res.setHeader('Content-Type', contentType);
      res.setHeader('X-Frame-Options', 'ALLOWALL');
      return res.send(Buffer.from(buffer));
    }

    const html = await response.text();
    console.log('HTML length:', html.length);
    console.log('HTML preview:', html.substring(0, 500));
    
    // Check if this looks like a GameFlare embed page
    if (url.includes('gameflare.com/embed/')) {
      // For GameFlare embeds, we need special handling
      const modifiedHtml = html
        .replace(/<head>/i, `<head>
          <script>
            console.log('GameFlare iframe loaded via proxy');
            // Prevent frame busting
            window.top = window.self;
            window.parent = window.self;
            // Remove any X-Frame-Options
            document.addEventListener('DOMContentLoaded', function() {
              const metaTags = document.querySelectorAll('meta[http-equiv="X-Frame-Options"]');
              metaTags.forEach(tag => tag.remove());
            });
          </script>`)
        .replace(/X-Frame-Options/gi, 'X-Frame-Options-Disabled')
        .replace(/frame-ancestors[^;]*/gi, 'frame-ancestors *');
    
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('X-Frame-Options', 'ALLOWALL');
      res.setHeader('Content-Security-Policy', 'frame-ancestors *');
      return res.send(modifiedHtml);
    }
    
    // For other sites, use general approach
    const modifiedHtml = html.replace(
      /<head>/i,
      `<head>
        <script>
          console.log('Game loaded via proxy');
          // Override frame busting attempts
          window.top = window.self;
          window.parent = window.self;
          
          // Remove any existing X-Frame-Options meta tags
          document.addEventListener('DOMContentLoaded', function() {
            const metaTags = document.querySelectorAll('meta[http-equiv="X-Frame-Options"]');
            metaTags.forEach(tag => tag.remove());
          });
        </script>`
    );

    // Set headers to allow iframe embedding
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('X-Frame-Options', 'ALLOWALL');
    res.setHeader('Content-Security-Policy', 'frame-ancestors *; default-src * data: blob:; script-src * \'unsafe-inline\' \'unsafe-eval\' data: blob:; style-src * \'unsafe-inline\' data:');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    return res.send(modifiedHtml);
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ error: 'Failed to fetch the game', details: error.message, url });
  }
}