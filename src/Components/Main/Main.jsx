import React from 'react';
import Post from './Post/Post.jsx';
import './Main.css';
import Vue from './Category/Vue.jsx';
import { Sort, Population } from './Sort/Sort.jsx';
import Skeleton from './Skeleton/Skeleton.jsx';
import Pagination from '../Pagination/Pagination.jsx';
import { SearchContext } from '../../App.js';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCategoryId,
  setSortId,
  setPageCount,
  setFilters,
} from './../../Redux/Slices/filterSlice.js';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

const newArrays = [...new Array(8)];

const Main = () => {

  const Navigate = useNavigate();

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.pizzas);

  const vueSelectorId = useSelector((state) => state.filter.VueId);

  const sortSelectorId = useSelector((state) => state.filter.SortId);

  const pageSelectorCount = useSelector((state) => state.filter.pageCount);

  const isSearch = React.useRef(false);

  const isMounted = React.useRef(false);

  const isMountedT = React.useRef(false);

  const { searchValue } = React.useContext(SearchContext);

  const [items, setItems] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(true);

  const [timeout, isTimeout] = React.useState(false);

  const fetchPosts = () => {
    const categoryChange = vueSelectorId !== 0 ? vueSelectorId : '';

    const sortBy = '&sortBy=' + sortSelectorId.property.replace('-', '');

    const checkerIncludes = sortSelectorId.property.split('').includes('-') ? 'asc' : 'desc';

    setIsLoading(true);
    axios
      .get(
        `https://64607fc3fe8d6fb29e31cd6d.mockapi.io/items?${
          'category=' + categoryChange
        }${sortBy}${'&order=' + checkerIncludes}&page=${pageSelectorCount}&limit=8`,
      )
      .then(({ data }) => {
        setItems(data);
        setIsLoading(false);
      })
      .catch((er) => {
        console.log(er);
      });
  };
  // Если был первый рендер, то парсим URl и передаем фильтры в редакс
  React.useEffect(() => {
    if (window.location.search) {
      const { sortProperty, vueProperty, pageSelectorCount } = qs.parse(
        window.location.search.substring(1),
      );
      const sort = Population.find((el) => el.property == sortProperty);
      dispatch(
        setFilters({
          SortId: sort,
          VueId: vueProperty,
          pageCount: pageSelectorCount,
        }),
      );
      isSearch.current = true;
    }
  }, []);
  //Если первого рендера не было, то не нужно вшивать параметры
  React.useEffect(() => {
    if (isMounted) {
      const queryString = qs.stringify({
        sortProperty: sortSelectorId.property,
        vueProperty: vueSelectorId,
        pageSelectorCount,
      });
      Navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [vueSelectorId, sortSelectorId, pageSelectorCount]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPosts();
    }

    isSearch.current = false;
  }, [vueSelectorId, sortSelectorId, pageSelectorCount]);

  const renderPizza = items
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return obj;
      }
    })
    .map((el, index) => (
      <div key={index} className="MainContentCatalogPost">
        <Post {...el} />
      </div>
    ));
  const renderSkelet = newArrays.map((el, index) => (
    <div key={index} className="MainContentCatalogPost">
      <Skeleton />
    </div>
  ));

  const onClickVue = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (el) => {
    dispatch(setPageCount(el));
  };

  const onClickSort = (id) => {
    dispatch(setSortId(id));
  };

  return (
    <div className="Main">
      <div className="MainContent">
        <div className="MainContentSettings">
          <div className="MainContentSettingsCategory">
            <Vue value={vueSelectorId} onClickVue={(id) => onClickVue(id)} />
          </div>
          <div className="MainContentSettingsPopulation">
            <Sort value={sortSelectorId} onClickSort={(id) => onClickSort(id)} />
          </div>
        </div>
        <div className="MainContentCatalog">{isLoading ? renderSkelet : renderPizza}</div>
        <div className="MainContentPagination">
          <Pagination value={pageSelectorCount} onChangePage={(el) => onChangePage(el)} />
        </div>
      </div>
    </div>
  );
};

export default Main;
