import { configureStore } from "@reduxjs/toolkit";

import sparesSlice from "../components/sparesList/sparesSlice";
import sparePartSlice from "../pages/sparePartCreatePage/sparePartSlice";

const store = configureStore({
  reducer: { sparesSlice, sparePartSlice },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
