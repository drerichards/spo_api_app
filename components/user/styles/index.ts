import styled from 'styled-components';
import Image from 'next/image';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const ProfileImage = styled(Image)`
  border-radius: 50%;
  margin-right: 5px;
  margin-bottom: 10px;
`;
