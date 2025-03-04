import { Spinner } from '@chakra-ui/react';
import { ToolkitSpinnerContainer } from './styles/css-uiToolkit';

export const ToolkitSpinner = () => (
  <ToolkitSpinnerContainer>
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  </ToolkitSpinnerContainer>
);
