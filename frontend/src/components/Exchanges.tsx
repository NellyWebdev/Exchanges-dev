import { useEffect, useRef, useState } from 'react';
import OrderBook from './OrderBook.tsx';
import Candlestick from './Candlestick.tsx';
import { Box } from '@chakra-ui/react';

interface Order {
  price: number;
  amount: number;
  total: number;
}

interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}


const Exchanges = () => {
  const [bids, setBids] = useState<Order[]>([]);
  const [asks, setAsks] = useState<Order[]>([]);
  const [candles, setCandles] = useState<Candle[]>([]);

  const bidsMap = useRef(new Map<number, Order>());
  const asksMap = useRef(new Map<number, Order>());
  const lastUpdateId = useRef<number | null>(null);

  useEffect(() => {

    const ws = new WebSocket(
      'wss://stream.binance.com:9443/stream?streams=btcusdt@depth/btcusdt@kline_1s'
    );

    // const wss = new WebSocket('wss://stream.bybit.com/v5/public/spot');

    ws.onopen = () => console.log('WebSocket connection opened');

    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);

      const {stream, data} = msg;

      if (stream.includes('depth')) {
        if (!data.a || !data.b || data.u === undefined || data.U === undefined)
          return;

        if (lastUpdateId.current === null) {
          lastUpdateId.current = data.u;
        }

        if (data.u < (lastUpdateId.current ?? 0)) return;

        if (data.U > (lastUpdateId.current ?? 0) + 1) {
          console.log('Missed updates, resetting order book...');
          bidsMap.current.clear();
          asksMap.current.clear();
          lastUpdateId.current = data.u;
          return;
        }

        data.a.forEach(([priceStr, qtyStr]: [string, string]) => {
          const price = parseFloat(priceStr);
          const amount = parseFloat(qtyStr);
          if (amount === 0) asksMap.current.delete(price);
          else asksMap.current.set(price, {price, amount, total: price * amount});
        });

        data.b.forEach(([priceStr, qtyStr]: [string, string]) => {
          const price = parseFloat(priceStr);
          const amount = parseFloat(qtyStr);
          if (amount === 0) bidsMap.current.delete(price);
          else bidsMap.current.set(price, {price, amount, total: price * amount});
        });

        lastUpdateId.current = data.u;

        const bidsArr = Array.from(bidsMap.current.values()).sort(
          (a, b) => b.price - a.price
        );
        const asksArr = Array.from(asksMap.current.values()).sort(
          (a, b) => a.price - b.price
        );

        setBids(bidsArr);
        setAsks(asksArr);
      }

      if (stream.includes('kline')) {
        const k = data.k;

        const newCandle = {
          time: k.t,
          open: parseFloat(k.o),
          high: parseFloat(k.h),
          low: parseFloat(k.l),
          close: parseFloat(k.c),
        };
        setCandles((prev) => [...prev.slice(-50), newCandle]);
      }
    };

    ws.onclose = () => console.log('WebSocket closed');
    ws.onerror = (err) => console.log('WebSocket error', err);

    return () => ws.close();
  }, []);

  return (
    <>
      <Box display="flex" flexDirection="column" height="100vh" p={2} gap={2} mt={10}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box>
            <select>
              <option>sdsd</option>
            </select>
          </Box>
        </Box>
        <Box display="flex" flex={1} gap={2}>
          <Box flex="1">
            <OrderBook bids={bids} asks={asks} />
          </Box>
          <Box flex="1">
            <Candlestick candles={candles} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Exchanges;