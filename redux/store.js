import { configureStore } from "@reduxjs/toolkit";
import reactotron from "../ReactotronConfig";
import carSlice from "./reducers/car/carSlice";
import carDetailSlice from "./reducers/car/carDetailsSlice";

export const store = configureStore({
	reducer: {
		car: carSlice,
		carDetail: carDetailSlice,
	},
	enhancers: (getDefaultEnhancers) =>
		__DEV__
			? getDefaultEnhancers().concat(reactotron.createEnhancer())
			: getDefaultEnhancers(),
});
