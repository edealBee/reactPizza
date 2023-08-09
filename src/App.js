import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Main from './Components/Main/Main';
import { Route, Routes } from 'react-router-dom';
import NotFound from './Components/NotFound/NotFound';
import Cart from './Components/Cart/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { addPizzas } from './Redux/Slices/cartSlice';
import { Toaster } from 'react-hot-toast';

export const SearchContext = React.createContext('No Provider Here');

function App() {
  const cart = useSelector((state) => state.cart.pizzas);

  const isMounted = React.useRef(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(cart);
      localStorage.setItem('cart', json);
    }
    isMounted.current = true;
  }, [cart]);

  const [searchValue, setSearchValue] = React.useState('');
  return (
    <div className="windowApp">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <div className="App">
          <Header />
          <Toaster />
          <div className="AppContent">
            <Routes>
              <Route path="" element={<Main />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
