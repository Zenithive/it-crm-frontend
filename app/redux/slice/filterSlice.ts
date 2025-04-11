import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';


export interface FilterState {
  selectedOptionsByCategory: {
    [pageType: string]: {
      [category: string]: string[];
    };
  };
  startDates: {
    [pageType: string]: string;
  };
  endDates: {
    [pageType: string]: string;
  };
}

const initialState: FilterState = {
  selectedOptionsByCategory: {},
  startDates: {},
  endDates: {},
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSelectedOptions: (state, action: PayloadAction<{ 
      pageType: string; 
      categoryOptions: { [category: string]: string[] }; 
    }>) => {
      const { pageType, categoryOptions } = action.payload;
      state.selectedOptionsByCategory[pageType] = categoryOptions;
    },
    setDateRange: (state, action: PayloadAction<{ 
      pageType: string; 
      startDate: string; 
      endDate: string;
    }>) => {
      const { pageType, startDate, endDate } = action.payload;
      state.startDates[pageType] = startDate;
      state.endDates[pageType] = endDate;
    },
    clearReduxFilters: (state, action: PayloadAction<{ pageType: string }>) => {
      const { pageType } = action.payload;
      delete state.selectedOptionsByCategory[pageType];
      delete state.startDates[pageType];
      delete state.endDates[pageType];
    }
  },
});

export const { setSelectedOptions, setDateRange, clearReduxFilters } = filterSlice.actions;

const selectFilterState = (state: RootState) => state.filter;
const selectSelectedOptionsByCategory = createSelector(
  [selectFilterState, (_state: RootState, pageType: string) => pageType],
  (filterState, pageType) => filterState.selectedOptionsByCategory[pageType] || {}
);
const selectStartDate = createSelector(
  [selectFilterState, (_state: RootState, pageType: string) => pageType],
  (filterState, pageType) => filterState.startDates[pageType] || ''
);
const selectEndDate = createSelector(
  [selectFilterState, (_state: RootState, pageType: string) => pageType],
  (filterState, pageType) => filterState.endDates[pageType] || ''
);

// Main memoized selector that combines all results
export const selectFiltersByPageType = createSelector(
  [selectSelectedOptionsByCategory, selectStartDate, selectEndDate],
  (selectedOptionsByCategory, startDate, endDate) => ({
    selectedOptionsByCategory,
    startDate,
    endDate
  })
);

export default filterSlice.reducer;