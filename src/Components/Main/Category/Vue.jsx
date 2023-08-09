import React from 'react';
import './Vue.css';

const VueOfPizza = ['Всё', 'Мясная', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Vue = ({ value, onClickVue }) => {
  return (
    <div className="Vue">
      <ul className="VueContent">
        {VueOfPizza.map((el, id) => (
          <li onClick={() => onClickVue(id)} key={id} className={value == id ? 'active' : ''}>
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Vue;
