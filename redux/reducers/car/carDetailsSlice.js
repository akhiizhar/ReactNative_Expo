import { createSlice } from "@reduxjs/toolkit";
import { fetchCarDetails } from "./carApi";

const carDetailSlice = createSlice({
	name: "carDetail",
	initialState: {
		isLoading: false,
		data: [],
		isError: false,
		errorMessage: null,
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCarDetails.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(fetchCarDetails.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		});
		builder.addCase(fetchCarDetails.rejected, (state, action) => {
			state.isLoading = true;
			state.errorMessage = action.error.message;
		});
	},
});

export const getCarDetail = fetchCarDetails;
export const selectCarDetail = (state) => state.carDetail; //selector
export default carDetailSlice.reducer;
