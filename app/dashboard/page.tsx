/*
 * @Author: SessyoinKirin
 * @Date: 2025-11-19 23:12:42
 * @LastEditors: SessyoinKirin
 * @LastEditTime: 2025-11-19 23:41:11
 * @FilePath: \react\my-app\app\dashboard\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2025 by SessyoinKirin, All Rights Reserved. 
 */
'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Dashboard() {
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
    <div className="page dashboard">
      <header className="dashboard-header">
        <h1>BEM-VINDO!</h1>
        <h2>{user?.name} - BASF</h2>
      </header>
      
      <div className="categories">
    <h3>Categorias</h3>
    <div className="category-grid">
        <div className="category-item">Compra</div>
        <div className="category-item">Venda</div>
        <div className="category-item">Negócios</div>
        <div className="category-item" onClick={() => router.push('/logistics')}>Logística</div>
    </div>
    </div>
      
      <div className="quotation">
        <h3>Cotação</h3>
        <div className="quotation-grid">
          <div className="quotation-item">Composições</div>
          <div className="quotation-item" onClick={() => router.push('/connections')}>Conexão</div>
          <div className="quotation-item">Catálogo</div>
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