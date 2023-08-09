import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPizza, addSum } from '../../../Redux/Slices/cartSlice';
import './Post.css';
import { toast } from 'react-hot-toast';

const SortOfPizza = ['тонкое', 'традиционное'];

const Post = (pizza) => {
  const [sortOf, setSortOf] = React.useState(0);

  const [sizeOf, setSizeOf] = React.useState(0);

  const dispatch = useDispatch();

  const pizzas = useSelector((state) => state.cart.pizzas);

  return (
    <div className="Post">
      <div className="PostContent">
        <div className="PostContentImage">
          <img src={pizza.imageUrl} alt="" />
        </div>
        <div className="PostContentTitle">
          <h2>{pizza.title}</h2>
        </div>
        <div className="PostContentSettings">
          <ul className="PostContentSettingsSort">
            {pizza.types.map((el, index) => (
              <li
                onClick={() => {
                  setSortOf(index);
                }}
                className={sortOf == index ? 'active' : ''}
                key={index}
              >
                {SortOfPizza[el]}
              </li>
            ))}
          </ul>
          <ul className="PostContentSettingsSize">
            {pizza.sizes.map((el, index) => (
              <li
                onClick={() => {
                  setSizeOf(index);
                }}
                className={sizeOf == index ? 'active' : ''}
                key={index}
              >
                {el + ' см.'}
              </li>
            ))}
          </ul>
        </div>
        <div className="PostContentBottom">
          <div className="PostContentBottomPrice">
            <p>{'от ' + pizza.price + ' ₽'}</p>
          </div>
          <div className="PostContentBottomSelect">
            <button
              onClick={() => {
                dispatch(addPizza({ ...pizza, sizeOf, sortOf, count: 1 }));
              }}
              id="select"
              type="button"
            >
              Выбрать
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
