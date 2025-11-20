/*
 * @Author: SessyoinKirin
 * @Date: 2025-11-19 23:22:48
 * @LastEditors: SessyoinKirin
 * @LastEditTime: 2025-11-20 01:03:11
 * @FilePath: \my-app\app\profile\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2025 by SessyoinKirin, All Rights Reserved. 
 */
'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Profile() {
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

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

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
    <div className="page profile-page">
      <header className="profile-header">
        {/* Substitua o avatar por uma imagem local */}
        <div className="avatar-image">
          <Image 
            src="/capivara.png" // Caminho da imagem na pasta public
            alt="Avatar do usuário"
            width={120}
            height={120}
            className="avatar-img"
          />
        </div>
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
      </header>
      
      <div className="profile-actions">
        <div className="action-item" onClick={() => router.push('/logistics')}>
          Logística
        </div>
        <div className="action-item">
          Configurações
        </div>
        <div className="action-item" onClick={handleLogout}>
          Sair
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