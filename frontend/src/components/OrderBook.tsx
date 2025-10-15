import { Table, VStack, Text, Stack } from '@chakra-ui/react';
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
      <Text fontSize="2xl" >
       Order Book
      </Text>
      <Stack w={500}>
        <Table.Root size="sm" w="100%" border={1}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader color="red.400">Price</Table.ColumnHeader>
              <Table.ColumnHeader color="red.400">Amount</Table.ColumnHeader>
              <Table.ColumnHeader color="red.400" textAlign="end">
                Total
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {asks.slice(0, 17).map((ask, i) => (
              <Table.Row key={i}>
                <Table.Cell color="red.400">{ask.price.toFixed(5)}</Table.Cell>
                <Table.Cell>{ask.amount.toFixed(5)}</Table.Cell>
                <Table.Cell textAlign="end">{ask.total.toFixed(5)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>

        <Table.Root size="sm" w="100%">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader color="green.400">Price</Table.ColumnHeader>
              <Table.ColumnHeader color="green.400">Amount</Table.ColumnHeader>
              <Table.ColumnHeader color="green.400" textAlign="end">
                Total
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {bids.slice(0, 17).map((bid, i) => (
              <Table.Row key={i}>
                <Table.Cell color="green.400">{bid.price.toFixed(2)}</Table.Cell>
                <Table.Cell>{bid.amount.toFixed(5)}</Table.Cell>
                <Table.Cell textAlign="end">{bid.total.toFixed(2)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Stack>
    </VStack>
  );
};

export default OrderBook;