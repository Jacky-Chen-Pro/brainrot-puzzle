import React from 'react';

const AboutUs = () => (
  <main style={{ maxWidth: 700, margin: '48px auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px #e3eaf2', padding: '40px 32px' }}>
    <h1 style={{ color: '#1976d2', fontWeight: 800, fontSize: 32, marginBottom: 18 }}>About Us</h1>
    <p style={{ fontSize: 18, color: '#222', marginBottom: 24, lineHeight: 1.7 }}>
      <b>Brainrot Puzzle</b> is a passion project created by a small team of meme and puzzle enthusiasts. Our mission is to bring joy, challenge, and a touch of Italian Brainrot humor to puzzle lovers around the world. We believe in the power of creativity, community, and fun.
    </p>
    <h2 style={{ color: '#1976d2', fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Our Vision</h2>
    <p style={{ fontSize: 16, color: '#444', marginBottom: 20 }}>
      We aim to create a unique, engaging, and accessible online puzzle experience inspired by the viral Italian Brainrot meme. We are committed to continuous improvement and welcome feedback from our players.
    </p>
    <h2 style={{ color: '#1976d2', fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Contact</h2>
    <p style={{ fontSize: 16, color: '#444', marginBottom: 0 }}>
      For suggestions, bug reports, or collaboration, please visit our <a href="/contact" style={{ color: '#1976d2', textDecoration: 'underline', fontWeight: 600 }}>Contact</a> page.
    </p>
  </main>
);

export default AboutUs; 