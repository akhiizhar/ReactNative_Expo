import { configureStore } from "@reduxjs/toolkit";
import reactotron from "../ReactotronConfig";
import carSlice from "./reducers/car/carSlice";
import carDetailSlice from "./reducers/car/carDetailsSlice";
import authLogin from "./reducers/auth/authLogin";
import orderSlice from "./reducers/order/orderSlice";

export const store = configureStore({
	reducer: {
		car: carSlice,
		carDetail: carDetailSlice,
		user: authLogin,
		order: orderSlice,
	},
	enhancers: (getDefaultEnhancers) =>
		__DEV__
			? getDefaultEnhancers().concat(reactotron.createEnhancer())
			: getDefaultEnhancers(),
});
