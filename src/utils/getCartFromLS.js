export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  return data ? JSON.parse(data) : [];
};
export const getSumCart = () => {
  const data = localStorage.getItem('cart');
  return data
    ? JSON.parse(data).reduce((sum, el) => {
        return el.price * el.count + sum;
      }, 0)
    : 0;
};
