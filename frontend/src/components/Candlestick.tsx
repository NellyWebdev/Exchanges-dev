const Candlestick = () => {

  // useEffect(() => {
  //   const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_1m');
  //
  //   ws.onopen = () => {
  //     console.log('Websocket connection opened');
  //   };
  //
  //   ws.onmessage = (e) => {
  //     const data = JSON.parse(e.data);
  //
  //   };
  //
  //   ws.onclose = (e) => {
  //     console.log('WebSocket closed', e);
  //   };
  //
  //   ws.onerror = (err) => {
  //     console.log('WebSocket error', err);
  //   };
  //
  //   return () => ws.close();
  // }, []);

  return (
    <>

    </>
  );
};

export default Candlestick;