import React from 'react';
import './Sort.css';

export const Population = [
  { name: 'популярности (DESC)', property: 'rating' },
  { name: 'популярности (ASC)', property: '-rating' },
  { name: 'цене (DESC)', property: 'price' },
  { name: 'цене (ASC)', property: '-price' },
  { name: 'алфавиту (DESC)', property: 'title' },
  { name: 'алфавиту (ASC)', property: '-title' },
];

export const Sort = ({ value, onClickSort }) => {
  const [modalWindow, setModalWindow] = React.useState(false);
  const sortRef = React.useRef();

  React.useEffect(() => {
    document.body.addEventListener('click', (event) => {
      if (!event.composedPath().includes(sortRef.current)) {
        setModalWindow(false);
      }
    });
  }, []);

  return (
    <div ref={sortRef} className="Sort">
      <ul className="SortContent">
        <p
          onClick={() => {
            setModalWindow(!modalWindow);
          }}
        >
          <img width="10" src="https://cdn-icons-png.flaticon.com/512/57/57055.png " alt="" />
          Сортировка по <span>{value.name}</span>
        </p>
      </ul>
      {modalWindow && (
        <div className="Modal">
          <nav className="ModalContent">
            {Population.map((el, index) => (
              <li
                className={value.name == Population[index].name ? 'active' : ''}
                onClick={() => {
                  setModalWindow(false);
                  onClickSort(el);
                }}
                key={index}
              >
                {el.name}
              </li>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};
