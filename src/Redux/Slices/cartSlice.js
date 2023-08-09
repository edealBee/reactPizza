import { createSlice, current } from '@reduxjs/toolkit';
import { getCartFromLS, getSumCart } from '../../utils/getCartFromLS';
import { toast } from 'react-hot-toast';

const cartSlise = createSlice({
  name: 'cart',
  initialState: {
    pizzas: getCartFromLS(),
    sumOfPizza: getSumCart(),
  },
  reducers: {
    calculateTotalSum: (state) => {},
    orderPizza: (state) => {
      state.pizzas = [];
      const number = Math.round(Math.random() * 50000);
      toast.success(`Ваш заказ №${number} уже готовится!`, {
        duration: 1500,
        position: 'top-right',
      });
      state.sumOfPizza = 0;
    },
    addPizza: (state, action) => {
      const objectCondidate = current(state.pizzas).find(
        (el) =>
          el.id == action.payload.id &&
          el.sizeOf == action.payload.sizeOf &&
          el.sortOf == action.payload.sortOf,
      );
      if (objectCondidate) {
        state.pizzas.filter((el) =>
          JSON.stringify(el) == JSON.stringify(objectCondidate) ? (el.count += 1) : '',
        );
      } else {
        state.pizzas.push(action.payload);
      }
      toast(`🍕 Пицца "${action.payload.title}" была добавлена!`, {
        duration: 1500,
        position: 'top-right',
      });
      state.sumOfPizza += action.payload.price;
    },
    plusCount: (state, action) => {
      const objectCondidate = current(state.pizzas).find(
        (el) => JSON.stringify(el) == JSON.stringify(action.payload),
      );
      const index = current(state.pizzas).findIndex(
        (el) => JSON.stringify(el) == JSON.stringify(objectCondidate),
      );
      state.pizzas[index].count += 1;
      toast(`🍕 Пицца "${action.payload.title}" была добавлена!`, {
        duration: 1500,
        position: 'top-right',
      });
      state.sumOfPizza += action.payload.price;
    },
    minusCount: (state, action) => {
      const objectCondidate = current(state.pizzas).find((el) => el.id == action.payload.id);
      const index = current(state.pizzas).findIndex((el) => el.id == objectCondidate.id);
      if (objectCondidate.count == 1) {
        state.pizzas.splice(index, 1);
      } else {
        state.pizzas[index].count -= 1;
      }
      toast(`🍕 Пицца "${action.payload.title}" была удалена`, {
        duration: 1500,
        position: 'top-right',
      });
      state.sumOfPizza -= action.payload.price;
    },
    deletePizza: (state, action) => {
      const index = current(state.pizzas).findIndex(
        (el) => JSON.stringify(el) == JSON.stringify(action.payload),
      );
      toast(`🍕 Пицца "${current(state.pizzas)[index].title}" была удалена`, {
        duration: 1500,
        position: 'top-right',
      });
      state.pizzas.splice(index, 1);
      state.sumOfPizza -= action.payload.price * action.payload.count;
    },
    deletePizzas: (state) => {
      state.sumOfPizza = 0;
      state.pizzas = [];
      toast.success('Корзина была очищена!', {
        duration: 1500,
        position: 'top-right',
      });
    },
  },
});

export const { addPizza, addPizzas, deletePizza, deletePizzas, orderPizza, plusCount, minusCount } =
  cartSlise.actions;

export default cartSlise.reducer;
