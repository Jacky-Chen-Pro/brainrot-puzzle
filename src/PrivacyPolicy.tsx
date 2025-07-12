import React from 'react';

const PrivacyPolicy = () => (
  <main style={{ maxWidth: 700, margin: '48px auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px #e3eaf2', padding: '40px 32px' }}>
    <h1 style={{ color: '#1976d2', fontWeight: 800, fontSize: 32, marginBottom: 18 }}>Privacy Policy</h1>
    <p style={{ fontSize: 16, color: '#222', marginBottom: 18, lineHeight: 1.7 }}>
      We value your privacy. This page explains how Brainrot Puzzle collects, uses, and protects your information.
    </p>
    <h2 style={{ color: '#1976d2', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Information We Collect</h2>
    <ul style={{ fontSize: 15, color: '#444', marginBottom: 16, paddingLeft: 22 }}>
      <li>We do not require registration or collect personal information.</li>
      <li>We may use cookies to remember your preferences (e.g., music on/off).</li>
      <li>Anonymous analytics may be used to improve the site.</li>
    </ul>
    <h2 style={{ color: '#1976d2', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Cookies</h2>
    <p style={{ fontSize: 15, color: '#444', marginBottom: 16 }}>
      Cookies are small files stored on your device to enhance your experience. You can disable cookies in your browser settings, but some features may not work as intended.
    </p>
    <h2 style={{ color: '#1976d2', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Third-Party Services</h2>
    <p style={{ fontSize: 15, color: '#444', marginBottom: 16 }}>
      We may use third-party analytics or hosting providers. These services may collect anonymous usage data in accordance with their own privacy policies.
    </p>
    <h2 style={{ color: '#1976d2', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Your Rights</h2>
    <p style={{ fontSize: 15, color: '#444', marginBottom: 0 }}>
      You have the right to request deletion of any data we may have about you. For questions, please contact us via the <a href="/contact" style={{ color: '#1976d2', textDecoration: 'underline', fontWeight: 600 }}>Contact</a> page.
    </p>
  </main>
);

export default PrivacyPolicy; 