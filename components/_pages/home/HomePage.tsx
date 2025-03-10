// pages/index.tsx
const HomePage = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1>Welcome to the App</h1>
            <p>Please <a href="/login">log in</a> to access your library.</p>
        </div>
    );
};

export default HomePage;