import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { useHttp } from "../../hooks/http.hook";

const initialState = {
  statusLoading: "loading",
  spares: [],
  filterSearch: "",
  filterOriginal: "все",
  filterAvailability: "все",
};

export const getSpares = createAsyncThunk("spares/getSpares", async () => {
  const { getData } = useHttp();
  return await getData("http://localhost:3001/spares");
});

const sparesSlice = createSlice({
  name: "spares",
  initialState,
  reducers: {
    filterSearchSpares: (state, action) => {
      state.filterSearch = action.payload;
    },
    filterOriginalSpares: (state, action) => {
      state.filterOriginal = action.payload;
    },
    filterAvailabilitySpares: (state, action) => {
      state.filterAvailability = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSpares.pending, (state) => {
        state.statusLoading = "loading";
      })
      .addCase(getSpares.fulfilled, (state, action) => {
        state.statusLoading = "loaded";
        state.spares = action.payload;
      })
      .addCase(getSpares.rejected, (state) => {
        state.statusLoading = "error";
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = sparesSlice;

export default reducer;
export const {
  filterSearchSpares,
  filterOriginalSpares,
  filterAvailabilitySpares,
} = actions;
