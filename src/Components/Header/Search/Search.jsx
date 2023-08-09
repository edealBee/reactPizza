import React from 'react';
import debounce from 'lodash.debounce';
import { SearchContext } from './../../../App';
import './Search.css';

const Search = () => {
  const { searchValue, setSearchValue } = React.useContext(SearchContext);
  const [value, setValue] = React.useState('');

  const input = React.useRef();

  const clearInput = () => {
    setValue('');
    setSearchValue('');
    input.current.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((value) => {
      setSearchValue(value);
    }, 1000),
    [],
  );

  const changeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className="HeaderSearch">
      <img width="14" height="14" src="https://i.ibb.co/F3979kN/search-interface-symbol-1.png" />
      <input
        ref={input}
        onChange={changeInput}
        type="text"
        placeholder="Поиск пиццы..."
        value={value}
      />
      {searchValue && (
        <button onClick={clearInput} type="button">
          <svg
            height="16px"
            width="16px"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 460.775 460.775"
          >
            <path
              d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
	c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
	c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
	c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
	l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
	c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Search;
