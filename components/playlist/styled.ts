import styled from 'styled-components';

export const CenteredLayout = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

export const GridContainer = styled.div`
  width: 100%;
  max-width: 1000px;
`;

export const Card = styled.div`
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.2s ease-in-out;
  text-align: center;
  min-width: 150px;
  border-radius: 2px;

  &:hover {
    transform: scale(1.05);
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%; // ✅ Maintains square aspect ratio
  overflow: hidden;
`;

export const PlaylistName = styled.p`
  margin-top: 8px;
  font-weight: bold;
  text-align: center;
`;
