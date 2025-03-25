// src/components/admin/login-form.tsx
import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Отправка данных для авторизации:', { email, password });
    onLogin(email, password); // Вызываем коллбэк для выполнения авторизации
  };

  return (
    <div>
      <h2>Вход в админку</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Пароль:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default LoginForm;
