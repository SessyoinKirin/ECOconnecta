'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Logistics() {
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
    <div className="page logistics-page">
      <h1>Logística</h1>
      
      <div className="logistics-form">
        <div className="form-group">
          <label>Insira sua localização</label>
          <input type="text" />
        </div>
        
        <div className="form-group">
          <label>Insira o destinatário</label>
          <input type="text" />
        </div>
        
        <button className="primary-btn">Confirmar</button>
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