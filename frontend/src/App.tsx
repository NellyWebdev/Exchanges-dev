import './App.css';
import MainPage from './pages/MainPage.tsx';
import { Route, Routes } from 'react-router-dom';
import { Provider } from './components/ui/provider.tsx';
import OrderBook from './components/OrderBook.tsx';
import Candlestick from './components/Candlestick.tsx';


function App() {

  return (
    <>
      <Provider>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/order" element={<OrderBook/>}/>
          <Route path="/candlestick" element={<Candlestick/>}/>
        </Routes>
      </Provider>
    </>
  );
}

export default App;
