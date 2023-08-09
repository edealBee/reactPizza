import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    pageCount: 1,
    VueId: 0,
    SortId: {
      name: 'популярности (DESC)',
      property: 'rating',
    },
  },
  reducers: {
    setCategoryId(state, action) {
      state.VueId = action.payload;
    },
    setSortId(state, action) {
      state.SortId = action.payload;
    },
    setPageCount(state, action) {
      state.pageCount = action.payload;
    },
    setFilters(state, action) {
      state.SortId = action.payload.SortId,
      state.pageCount = Number(action.payload.pageCount),
      state.VueId = Number(action.payload.VueId)
    }
  },
});

export const { setCategoryId, setSortId, setPageCount, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
