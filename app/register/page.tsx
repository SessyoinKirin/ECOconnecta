
/*
 * @Author: SessyoinKirin
 * @Date: 2025-11-19 23:11:09
 * @LastEditors: SessyoinKirin
 * @LastEditTime: 2025-11-19 23:26:17
 * @FilePath: \react\my-app\app\register\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2025 by SessyoinKirin, All Rights Reserved. 
 */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleRegister = () => {
    if (form.name && form.email && form.password) {
      // Salvar no localStorage (opcional)
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(form));
      }
      router.push('/dashboard');
    }
  };

  return (
    <div className="page register-page">
      <h1>Crie sua conta</h1>
      <p className="login-link">
        Já possui cadastro? <span onClick={() => router.push('/login')}>Faça login aqui</span>
      </p>
      
      <div className="form-group">
        <label>NOME</label>
        <input 
          type="text" 
          name="name"
          value={form.name}
          onChange={handleInputChange}
          placeholder="Ricardo Menezes"
        />
      </div>
      
      <div className="form-group">
        <label>EMAIL</label>
        <input 
          type="email" 
          name="email"
          value={form.email}
          onChange={handleInputChange}
          placeholder="ricardobasf@gmail.com"
        />
      </div>
      
      <div className="form-group">
        <label>SENHA</label>
        <input 
          type="password" 
          name="password"
          value={form.password}
          onChange={handleInputChange}
          placeholder="*****"
        />
      </div>
      
      <button className="primary-btn" onClick={
        ()=>{
            alert("Cadastro realizado com sucesso!");
            router.push('/login')
        }
      }>
        Cadastrar-se
      </button>
    </div>
  );
}