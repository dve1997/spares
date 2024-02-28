import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { useHttp } from "../../hooks/http.hook";

const initialState = {
  statusLoading: "loading",
  createSparePartObj: null,
  deleteSparePartId: null,
  infoSparePartId: null,
  infoSparePartObj: null,
};

export const createSparePart = createAsyncThunk(
  "sparePart/createSparePart",
  async (body) => {
    const { postData } = useHttp();
    return await postData("http://localhost:3001/spares", "POST", body);
  }
);

export const deleteSparePart = createAsyncThunk(
  "sparePart/deleteSparePart",
  async (id) => {
    const { deleteData } = useHttp();
    return await deleteData("http://localhost:3001/spares/" + id);
  }
);

export const infoSparePart = createAsyncThunk(
  "sparePart/infoSparePart",
  async (id) => {
    const { getData } = useHttp();
    return await getData("http://localhost:3001/spares/" + id);
  }
);

export const updateAvailabilityPropInSparePart = createAsyncThunk(
  "sparePart/updateAvailabilityPropInSparePart",
  async (body) => {
    const { patchData } = useHttp();
    const bodyString = JSON.stringify(body);
    return await patchData(
      "http://localhost:3001/spares/" + body.id,
      "PATCH",
      bodyString
    );
  }
);

const sparePartSlice = createSlice({
  name: "sparePart",
  initialState,
  reducers: {
    updateCreateSparePart: (state, action) => {
      state.createSparePartObj = action.payload;
    },
    updateInfoSparePart: (state, action) => {
      state.infoSparePartObj = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSparePart.pending, (state) => {
        state.statusLoading = "loading";
      })
      .addCase(createSparePart.fulfilled, (state) => {
        state.statusLoading = "loaded";
      })
      .addCase(createSparePart.rejected, (state) => {
        state.statusLoading = "error";
      })
      .addCase(deleteSparePart.pending, (state) => {
        state.statusLoading = "loading";
      })
      .addCase(deleteSparePart.fulfilled, (state, action) => {
        state.statusLoading = "loaded";
        state.deleteSparePartId = action.payload;
      })
      .addCase(deleteSparePart.rejected, (state) => {
        state.statusLoading = "error";
      })
      .addCase(infoSparePart.pending, (state) => {
        state.statusLoading = "loading";
      })
      .addCase(infoSparePart.fulfilled, (state, action) => {
        state.statusLoading = "loaded";
        state.infoSparePartId = action.payload;
      })
      .addCase(infoSparePart.rejected, (state) => {
        state.statusLoading = "error";
      })
      .addCase(updateAvailabilityPropInSparePart.pending, (state) => {
        state.statusLoading = "loading";
      })
      .addCase(updateAvailabilityPropInSparePart.fulfilled, (state) => {
        state.statusLoading = "loaded";
      })
      .addCase(updateAvailabilityPropInSparePart.rejected, (state) => {
        state.statusLoading = "error";
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = sparePartSlice;

export default reducer;
export const { updateCreateSparePart, updateInfoSparePart } = actions;
