// Vercel Serverless Function to proxy the game
export default async function handler(req, res) {
  const { url } = req.query;
  
  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Proxy/1.0)',
      },
    });

    const html = await response.text();
    
    // Remove X-Frame-Options headers by modifying the HTML
    const modifiedHtml = html.replace(
      /<head>/i,
      `<head>
        <script>
          // Remove X-Frame-Options restrictions
          if (window.top !== window.self) {
            // We're in an iframe, which is what we want
          }
        </script>`
    );

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Frame-Options', 'ALLOWALL');
    res.setHeader('Content-Security-Policy', 'frame-ancestors *');
    
    return res.send(modifiedHtml);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch the game' });
  }
}