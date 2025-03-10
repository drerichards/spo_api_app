// pages/error.tsx
import { useRouter } from 'next/router';

const ErrorPage = () => {
    const router = useRouter();
    const { message, status, data } = router.query;

    const handleGoToHome = () => {
        router.push('/');
    };

    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'center', padding: '20px' }}>
            <h1>Oops! Something Went Wrong</h1>
            <p><strong>Message:</strong> {message || 'Unknown error'}</p>
            <p><strong>Status:</strong> {status || 'N/A'}</p>
            <p><strong>Details:</strong> {data || 'No additional details'}</p>
            <button onClick={handleGoToHome} style={{ marginTop: '20px', padding: '10px 20px' }}>
                Go to Home
            </button>
        </div>
    );
};

export default ErrorPage;