import { useEffect, useRef } from 'react';
import { CandlestickSeries, createChart } from 'lightweight-charts';

const Candlestick = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: {color: '#222'},
        textColor: '#DDD',
      },
      grid: {
        vertLines: {color: '#444'},
        horzLines: {color: '#444'},
      },
      width: chartContainerRef.current.clientWidth,
      height: 600,
    });

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    candlestickSeries.setData([]);

    chart.priceScale('right').applyOptions({
      borderColor: '#71649C',
    });

    chart.timeScale().applyOptions({
      borderColor: '#71649C',
    });

    const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_1s');

    ws.onopen = () => {
      console.log('Websocket connection opened');
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);

      const k = data.k;

      const newCandle = {
        time: (k.t),
        open: parseFloat(k.o),
        high: parseFloat(k.h),
        low: parseFloat(k.l),
        close: parseFloat(k.c),
      };

      candlestickSeries.update(newCandle);
    };

    ws.onclose = (e) => {
      console.log('WebSocket closed', e);
    };

    ws.onerror = (err) => {
      console.log('WebSocket error', err);
    };

    const handleResize = () => {
      if (!chartContainerRef.current) return;

      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      ws.close();
      chart.remove();
    };
  }, []);

  return (
    <>
      <div ref={chartContainerRef}></div>
    </>
  );
};

export default Candlestick;