import './App.css';
import MainPage from './components/MainPage.tsx';
import { Route, Routes } from 'react-router-dom';
import { Provider } from './components/ui/provider.tsx';
import OrderBook from './components/OrderBook.tsx';


function App() {

  return (
    <>
      <Provider>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/order" element={<OrderBook/>}/>
        </Routes>
      </Provider>
    </>
  );
}

export default App;
