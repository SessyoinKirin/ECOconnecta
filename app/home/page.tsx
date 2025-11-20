/*
 * @Author: SessyoinKirin
 * @Date: 2025-11-19 23:13:19
 * @LastEditors: SessyoinKirin
 * @LastEditTime: 2025-11-19 23:16:49
 * @FilePath: \react\my-app\app\home\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2025 by SessyoinKirin, All Rights Reserved. 
 */
'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        router.push('/login');
      }
    }
  }, [router]);

  if (!user) {
    return (
      <div className="page welcome-page">
        <div className="welcome-content">
          <h2>Carregando...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="page home-page">
      <header className="home-header">
        <div className="user-info">
          <h2>{user?.name}</h2>
          <p>BASF - We Create Chemistry</p>
        </div>
      </header>
      
      <div className="waste-info">
        <div className="waste-item">
          <span className="number">8.</span>
          <span className="text">Composição e classificação do resíduo</span>
        </div>
        <div className="waste-item">
          <span className="number">2.</span>
          <span className="text">Volume</span>
        </div>
        <div className="waste-item">
          <span className="number">3.</span>
          <span className="text">Características físicas</span>
        </div>
        <div className="waste-item">
          <span className="number">1.</span>
          <span className="text">Grau de contaminação</span>
          <span className="more">Mais</span>
        </div>
        <div className="waste-item">
          <span className="number">5.</span>
          <span className="text">Acondicionamento</span>
        </div>
        <div className="waste-item">
          <span className="number">6.</span>
          <span className="text">Documentação Legal</span>
        </div>
      </div>
      
      <nav className="bottom-nav">
        <div className={`nav-item ${pathname === '/home' ? 'active' : ''}`} onClick={() => router.push('/home')}>Home</div>
        <div className={`nav-item ${pathname === '/dashboard' ? 'active' : ''}`} onClick={() => router.push('/dashboard')}>Dashboard</div>
        <div className={`nav-item ${pathname === '/connections' ? 'active' : ''}`} onClick={() => router.push('/connections')}>Conexão</div>
        <div className={`nav-item ${pathname === '/profile' ? 'active' : ''}`} onClick={() => router.push('/profile')}>Perfil</div>
      </nav>
    </div>
  );
}