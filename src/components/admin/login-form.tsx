import React, { useState } from 'react';
import styles from '../../styles/admin/login-form.module.scss';

type LoginFormProps = {
  onLogin: (email: string, password: string) => void;
};

function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className={styles['login-form']}>
      <h2 className={styles['login-form__title']}>Форма входа в систему</h2>
      <form onSubmit={handleSubmit}>
        <label className={styles['login-form__label']}>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles['login-form__input']}
          />
        </label>
        <br />
        <label className={styles['login-form__label']}>
          Пароль:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles['login-form__input']}
          />
        </label>
        <br />
        <button type="submit" className={styles['login-form__button']}>
          Войти
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
