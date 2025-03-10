import { chakra } from "@chakra-ui/react";

export const ErrorContainer = chakra('div', {
    baseStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        flexDirection: 'column',
        textAlign: 'center',
        padding: '20px',
    }
});
