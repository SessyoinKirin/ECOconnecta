/*
 * @Author: SessyoinKirin
 * @Date: 2025-11-19 23:11:59
 * @LastEditors: SessyoinKirin
 * @LastEditTime: 2025-11-19 23:12:24
 * @FilePath: \react\my-app\app\login\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2025 by SessyoinKirin, All Rights Reserved. 
 */
'use client';

import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  const handleLogin = () => {
    // Simulação de login
    const user = {
      name: 'Ricardo Menezes',
      email: 'ricardobasf@gmail.com'
    };
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
    router.push('/dashboard');
  };

  return (
    <div className="page login-page">
      <h1>Faça login</h1>
      <p className="register-link">
        Não tem conta? <span onClick={() => router.push('/register')}>Cadastre-se aqui</span>
      </p>
      
      <div className="form-group">
        <label>EMAIL</label>
        <input 
          type="email" 
          placeholder="ricardobasf@gmail.com"
        />
      </div>
      
      <div className="form-group">
        <label>SENHA</label>
        <input 
          type="password" 
          placeholder="*****"
        />
      </div>
      
      <button className="primary-btn" onClick={handleLogin}>
        Entrar
      </button>
    </div>
  );
}