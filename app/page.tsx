'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './globals.css';

export default function Welcome() {
  const router = useRouter();

  return (
    <div className="page welcome-page">
      <div className="welcome-content">
        <h1 className="logo">Eco<br />Conecta</h1>
        <h2>SEJA BEM VINDO!</h2>
        <p className="tagline">Conecte. Reduza. Transforme.</p>
        <button className="primary-btn" onClick={() => router.push('/register')}>
          Começar!
        </button>
        <button className="secondary-btn" onClick={() => router.push('/login')}>
          Pular
        </button>
      </div>
    </div>
  );
}