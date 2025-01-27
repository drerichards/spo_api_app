import styled from "styled-components";
import Image from 'next/image';

export const Container = styled.div`
    padding: 16px;
`;

export const Title = styled.h1`
    font-size: 2rem;
    margin-bottom: 24px;
    text-align: center;
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    justify-content: center;
`;

export const Card = styled.div`
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 16px;
    text-align: center;
`;

export const PlaylistName = styled.h3`
    margin: 12px 0;
    font-size: 1.2rem;
    color: #333;
    text-transform: capitalize;
`;

export const StyledImage = styled(Image)`
    border-radius: 8px;
    object-fit: cover;
`;