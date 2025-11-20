'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

interface Message {
  text: string;
  isUser: boolean;
  time: string;
}

interface Connection {
  id: number;
  name: string;
  quote: string;
  time: string;
  messages: Message[];
}

export default function Connections() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null);
  const [message, setMessage] = useState('');
  const [connections, setConnections] = useState<Connection[]>([
    { 
      id: 1, 
      name: "Claudia BASF", 
      quote: "We bend so we don't break.", 
      time: "Now",
      messages: [
        { text: "Olá! Eu sou Claudia da BASF. Como posso ajudar?", isUser: false, time: '10:00' }
      ]
    },
    { 
      id: 2, 
      name: "Maria Petrobras", 
      quote: "Happiness is a habit.", 
      time: "2 Min",
      messages: [
        { text: "Oi! Sou Maria da Petrobras. Em que posso ajudar?", isUser: false, time: '09:58' }
      ]
    },
    { 
      id: 3, 
      name: "Paula Bayer", 
      quote: "Don't just fly. Soar.", 
      time: "1 Hour",
      messages: [
        { text: "Olá! Paula da Bayer aqui. Conte comigo!", isUser: false, time: '09:00' }
      ]
    },
    { 
      id: 4, 
      name: "José Tenaris", 
      quote: "Allow yourself joy.", 
      time: "3 Hours",
      messages: [
        { text: "Bom dia! José da Tenaris à disposição.", isUser: false, time: '07:30' }
      ]
    },
    { 
      id: 5, 
      name: "Lorena Oxiteno", 
      quote: "Keep it simple.", 
      time: "22 Hours",
      messages: [
        { text: "Oi! Lorena da Oxiteno. Como vai?", isUser: false, time: '14:00' }
      ]
    },
    { 
      id: 6, 
      name: "Olivia Merck", 
      quote: "You're wonderful.", 
      time: "4",
      messages: [
        { text: "Olá! Olivia da Merck. Prazer em conhecê-lo!", isUser: false, time: '08:45' }
      ]
    },
    { 
      id: 7, 
      name: "Yasmin Danfoss", 
      quote: "You got this.", 
      time: "2 Weeks ago",
      messages: [
        { text: "Oi! Yasmin da Danfoss. Como posso ajudar?", isUser: false, time: '10:20' }
      ]
    }
  ]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        router.push('/login');
      }

      // Carregar chats salvos do localStorage
      const savedChats = localStorage.getItem('connectionChats');
      if (savedChats) {
        setConnections(JSON.parse(savedChats));
      }
    }
  }, [router]);

  // Salvar chats no localStorage sempre que connections mudar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('connectionChats', JSON.stringify(connections));
    }
  }, [connections]);

  const handleConnectionClick = (connection: Connection) => {
    setSelectedConnection(connection);
  };

  const handleSendMessage = () => {
    if (message.trim() && selectedConnection) {
      const newMessage: Message = {
        text: message,
        isUser: true,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };

      // Atualizar as mensagens da conexão selecionada
      setConnections(prevConnections => 
        prevConnections.map(conn => 
          conn.id === selectedConnection.id 
            ? { ...conn, messages: [...conn.messages, newMessage] }
            : conn
        )
      );

      setMessage('');

      // Simular resposta automática após 1 segundo
      setTimeout(() => {
        const responses = [
          "Interessante! Podemos marcar uma reunião para discutir isso.",
          "Ótima ideia! Vou verificar com minha equipe.",
          "Obrigada pelo contato! Retorno em breve com mais informações.",
          "Perfeito! Estou ansiosa para colaborar com você.",
          "Excelente proposta! Vamos analisar os detalhes.",
          "Entendi! Tem alguma preferência de data para conversarmos?",
          "Maravilha! Compartilhei com o time e retorno em breve."
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const botMessage: Message = {
          text: randomResponse,
          isUser: false,
          time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        };

        setConnections(prevConnections => 
          prevConnections.map(conn => 
            conn.id === selectedConnection.id 
              ? { ...conn, messages: [...conn.messages, botMessage] }
              : conn
          )
        );
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Obter as mensagens da conexão selecionada
  const currentMessages = selectedConnection 
    ? connections.find(conn => conn.id === selectedConnection.id)?.messages || []
    : [];

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
    <div className="page connections-page">
      <h1>Conexões</h1>
      
      {selectedConnection ? (
        <div className="chat-container">
          <div className="chat-header">
            <button 
              className="back-button" 
              onClick={() => setSelectedConnection(null)}
            >
              ← Voltar
            </button>
            <div className="chat-contact">
              <h3>{selectedConnection.name}</h3>
              <span className="online-status">Online</span>
            </div>
          </div>

          <div className="chat-messages">
            {currentMessages.map((msg, index) => (
              <div 
                key={index} 
                className={`message ${msg.isUser ? 'user-message' : 'contact-message'}`}
              >
                <div className="message-bubble">
                  <p>{msg.text}</p>
                  <span className="message-time">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              className="message-input"
            />
            <button 
              onClick={handleSendMessage}
              className="send-button"
              disabled={!message.trim()}
            >
              Enviar
            </button>
          </div>
        </div>
      ) : (
        <div className="connections-list">
          {connections.map((connection) => (
            <div 
              key={connection.id} 
              className="connection-item"
              onClick={() => handleConnectionClick(connection)}
            >
              <div className="connection-info">
                <h3>{connection.name}</h3>
                <p>"{connection.quote}"</p>
                <span className="last-message">
                  {connection.messages[connection.messages.length - 1]?.text.slice(0, 30)}...
                </span>
              </div>
              <div className="connection-time">{connection.time}</div>
            </div>
          ))}
        </div>
      )}
      
      <nav className="bottom-nav">
        <div className={`nav-item ${pathname === '/home' ? 'active' : ''}`} onClick={() => router.push('/home')}>Home</div>
        <div className={`nav-item ${pathname === '/dashboard' ? 'active' : ''}`} onClick={() => router.push('/dashboard')}>Dashboard</div>
        <div className={`nav-item ${pathname === '/connections' ? 'active' : ''}`} onClick={() => router.push('/connections')}>Conexão</div>
        <div className={`nav-item ${pathname === '/profile' ? 'active' : ''}`} onClick={() => router.push('/profile')}>Perfil</div>
      </nav>
    </div>
  );
}