'use client';

const LoginButton = () => {
  const handleLogin = () => {
    window.location.href = '/api/auth/login';
  };
  return <button onClick={handleLogin}>Login</button>;
};

export default LoginButton;
