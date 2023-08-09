import React from 'react';
import './Cart.css';
import { useDispatch, useSelector } from 'react-redux';
import CartsPost from './Posts/CartsPost.jsx';
import { deletePizzas, endsOrder, orderPizza } from '../../Redux/Slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const pizzas = useSelector((state) => state.cart.pizzas);

  const sumOfPizza = useSelector((state) => state.cart.sumOfPizza);

  return (
    <div className={pizzas.length >= 1 ? 'Cart' : 'NoneCart'}>
      {pizzas.length >= 1 ? (
        <div className="CartHeader">
          <div className="CartTitle">
            <img src="https://cdn-icons-png.flaticon.com/512/711/711897.png" />
            <h2>Корзина</h2>
          </div>
          <div className="CartBtnClean">
            <button
              onClick={() => {
                dispatch(deletePizzas());
              }}
            >
              <img src="https://i.ibb.co/y6jFMLx/bin.png" />
              Очистить корзину
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
      <ul className={pizzas.length >= 1 ? 'CartContent' : 'emptyCart'}>
        {pizzas.length >= 1 ? (
          pizzas.map((el, index) => (
            <li key={index}>
              <CartsPost {...el} />
            </li>
          ))
        ) : (
          <>
            <h2>КОРЗИНА ПУСТА 😔</h2>
            <p>
              <i>
                Если вы хотите добавить пиццу в корзину, <br />
                вам нужно выбрать ее в каталоге пицц
              </i>
            </p>
          </>
        )}
      </ul>
      {pizzas.length >= 1 ? (
        <div className="CartFooter">
          <div className="CartTotal">
            <p>
              Всего пицц:{' '}
              <b>
                {pizzas.reduce((sum, obj) => {
                  return obj.count + sum;
                }, 0)}
              </b>
            </p>
            <p>
              Итого: <b id="sum">{sumOfPizza} ₽</b>
            </p>
          </div>
          <div className="CartForm">
            <button
              type="button"
              id="toBack"
              onClick={() => {
                navigate('/');
              }}
            >
              <img src="https://i.ibb.co/qY0LRB5/left-arrow.png" />
              Вернуться назад
            </button>
            <button
              onClick={() => {
                dispatch(orderPizza());
              }}
              type="button"
              id="order"
            >
              Заказать
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Cart;
