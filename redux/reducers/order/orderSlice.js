import { createSlice } from "@reduxjs/toolkit";
import { postOrder, putOrderSlip } from "./orderApi";

const initialState = {
	isLoading: false,
	carId: null,
	dataOrder: [],
	errorMessage: null,
	currentStepOrder: null,
	selectedBank: null,
	promo: null,
};

const orderSlice = createSlice({
	name: "order",
	initialState: initialState,
	reducers: {
		setCarId: (state, { payload }) => {
			state.carId = payload;
		},
		setStateByName: (state, { payload }) => {
			const { name, value } = payload;
			state[name] = value;
		},
		resetState: (state) => {
			state = initialState;
		},
	},

	extraReducers: (builder) => {
		builder.addCase(postOrder.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(postOrder.fulfilled, (state, action) => {
			state.isLoading = false;
			state.dataOrder = action.payload;
			// console.log(action.payload);
			// setStore(action.payload);
			// state.isModalVisible = true;
		});
		builder.addCase(postOrder.rejected, (state, action) => {
			state.isLoading = false;
			state.errorMessage = action.payload;
			// state.isError = true;
			// state.isModalVisible = true;
		});

		builder.addCase(putOrderSlip.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(putOrderSlip.fulfilled, (state, action) => {
			state.isLoading = false;
			state.dataOrder = action.payload;
			// console.log(action.payload);
			// setStore(action.payload);
			// state.isModalVisible = true;
		});
		builder.addCase(putOrderSlip.rejected, (state, action) => {
			state.isLoading = false;
			state.errorMessage = action.payload;
			// state.isError = true;
			// state.isModalVisible = true;
		});
	},
});

export { postOrder, putOrderSlip };
export const { setCarId, setStateByName, resetState } = orderSlice.actions;
export const selectOrder = (state) => state.order;
export default orderSlice.reducer;
