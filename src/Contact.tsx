import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main style={{ maxWidth: 500, margin: '48px auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px #e3eaf2', padding: '40px 32px' }}>
      <h1 style={{ color: '#1976d2', fontWeight: 800, fontSize: 32, marginBottom: 18 }}>Contact Us</h1>
      {submitted ? (
        <div style={{ color: '#388e3c', fontSize: 20, fontWeight: 600, textAlign: 'center', marginTop: 32 }}>
          Thank you for your message!<br />We appreciate your feedback and will get back to you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <label style={{ fontWeight: 600, color: '#1976d2', fontSize: 16 }}>
            Name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #b3c6e6', marginTop: 6, fontSize: 15 }}
            />
          </label>
          <label style={{ fontWeight: 600, color: '#1976d2', fontSize: 16 }}>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #b3c6e6', marginTop: 6, fontSize: 15 }}
            />
          </label>
          <label style={{ fontWeight: 600, color: '#1976d2', fontSize: 16 }}>
            Message
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #b3c6e6', marginTop: 6, fontSize: 15, resize: 'vertical' }}
            />
          </label>
          <button
            type="submit"
            style={{
              fontSize: 18,
              fontWeight: 700,
              padding: '10px 0',
              background: 'linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 24,
              boxShadow: '0 2px 12px #90caf9',
              cursor: 'pointer',
              transition: 'background 0.2s, box-shadow 0.2s, transform 0.1s',
              letterSpacing: 1.1,
              outline: 'none',
            }}
            onMouseOver={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(90deg, #1565c0 60%, #42a5f5 100%)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 18px #64b5f6';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px) scale(1.04)';
            }}
            onMouseOut={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 12px #90caf9';
              (e.currentTarget as HTMLButtonElement).style.transform = 'none';
            }}
          >
            Send Message
          </button>
        </form>
      )}
    </main>
  );
};

export default Contact; 