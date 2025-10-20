import './App.css';
import MainPage from './pages/MainPage.tsx';
import { Route, Routes } from 'react-router-dom';
import { Provider } from './components/ui/provider.tsx';

function App() {

  return (
    <>
      <Provider>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
        </Routes>
      </Provider>
    </>
  );
}

export default App;
