'use client';

const LoginButton = () => {
  const handleLogin = () => {
    // Redirect to the login page
    window.location.href = '/api/auth/login';
  };
  return <button onClick={handleLogin}>Login</button>;
};

export default LoginButton;
