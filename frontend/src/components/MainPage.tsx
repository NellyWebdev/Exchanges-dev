import { Button, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

  const toCandle = () => navigate('/candle');
  const toDepth = () => navigate('/order');

  return (
    <HStack justify="center" minH="100vh">
      <Button w="200px" h="200px" fontSize="20px" onClick={toCandle}>Candlestick Chart</Button>
      <Button w="200px" h="200px" fontSize="20px" onClick={toDepth}>Depth Chart</Button>
    </HStack>
  );
};

export default MainPage;