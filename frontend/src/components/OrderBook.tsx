import { VStack, HStack, Box, Text } from '@chakra-ui/react';
import React from 'react';

interface Order {
  price: number;
  amount: number;
  total: number;
}

interface Props {
  bids: Order[];
  asks: Order[];
}

const OrderBook: React.FC<Props> = ({bids, asks}) => {
  return (
    <VStack w="100%">
      <Text fontSize="2xl">Order Book</Text>

      <VStack bg="#444" p={5} borderRadius="xl">
        <VStack w={300}>
          <HStack justify="space-between" w="100%">
            <Box w="90px" color="red.400" textAlign="left" fontFamily="monospace">
              Price
            </Box>
            <Box w="90px" color="red.400" textAlign="center" fontFamily="monospace">
              Amount
            </Box>
            <Box w="100px" color="red.400" textAlign="right" fontFamily="monospace">
              Total
            </Box>
          </HStack>

          <VStack w="100%" maxH="400px" overflowY="auto">
            {asks.map((ask, i) => (
              <HStack key={i} justify="space-between" w="100%">
                <Box w="90px" color="red.400" textAlign="left" fontFamily="monospace">
                  {ask.price.toFixed(2)}
                </Box>
                <Box w="90px" textAlign="center" fontFamily="monospace">
                  {ask.amount.toFixed(4)}
                </Box>
                <Box w="100px" textAlign="right" fontFamily="monospace">
                  {ask.total.toFixed(5)}
                </Box>
              </HStack>
            ))}
          </VStack>
        </VStack>

        <VStack w={300} mt={5} align="stretch" maxH="400px" overflowY="auto">
          {bids.map((bid, i) => (
            <HStack key={i} justify="space-between" w="100%">
              <Box w="90px" color="green.400" textAlign="left" fontFamily="monospace">
                {bid.price.toFixed(2)}
              </Box>
              <Box w="90px" textAlign="center" fontFamily="monospace">
                {bid.amount.toFixed(4)}
              </Box>
              <Box w="100px" textAlign="right" fontFamily="monospace">
                {bid.total.toFixed(5)}
              </Box>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </VStack>
  );
};

export default OrderBook;
