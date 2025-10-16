import { VStack, Text, HStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface Order {
  price: number;
  amount: number;
  total: number;
}

const OrderBook = () => {
  const [bids, setBids] = useState<Order[]>([]);
  const [asks, setAsks] = useState<Order[]>([]);

  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@depth');

    ws.onopen = () => {
      console.log('Websocket connection opened');
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);

      const newAsks = data.a.map(([price, amount]: [string, string]) => {
        const p = parseFloat(price);
        const q = parseFloat(amount);
        return {
          price: p,
          amount: q,
          total: p * q,
        };
      });

      const newBids = data.b.map(([price, amount]: [string, string]) => {
        const p = parseFloat(price);
        const q = parseFloat(amount);
        return {
          price: p,
          amount: q,
          total: p * q,
        };
      });

      setBids(newBids);
      setAsks(newAsks);
    };

    ws.onclose = (e) => {
      console.log('WebSocket closed', e);
    };

    ws.onerror = (err) => {
      console.log('WebSocket error', err);
    };

    return () => ws.close();
  }, []);

  useEffect(() => {
  }, []);

  return (
    <VStack mt="100px" w="100%" h="100vh">
      <Text fontSize="2xl">Order Book</Text>

      <VStack>
        <VStack w={400}>
          <HStack justify="space-between" w="100%">
            <Text color="red.400" textAlign="left">Price</Text>
            <Text color="red.400" textAlign="center">Amount</Text>
            <Text color="red.400" textAlign="right">Total</Text>
          </HStack>

          {asks.slice(0, 17).map((ask, i) => (
            <HStack key={i} justify="space-between" w="100%">
              <Text color="red.400" textAlign="left">{ask.price.toFixed(5)}</Text>
              <Text textAlign="center">{ask.amount.toFixed(4)}</Text>
              <Text textAlign="right">{ask.total.toFixed(5)}</Text>
            </HStack>
          ))}
        </VStack>

        <VStack w={400}>
          <HStack justify="space-between" w="100%">
            <Text color="green.400" textAlign="left">Price</Text>
            <Text color="green.400" textAlign="center">Amount</Text>
            <Text color="green.400" textAlign="right">Total</Text>
          </HStack>

          {bids.slice(0, 17).map((bid, i) => (
            <HStack key={i} justify="space-between" w="100%">
              <Text color="green.400" textAlign="left">{bid.price.toFixed(2)}</Text>
              <Text textAlign="center">{bid.amount.toFixed(4)}</Text>
              <Text textAlign="right">{bid.total.toFixed(5)}</Text>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </VStack>
  );
};

export default OrderBook;