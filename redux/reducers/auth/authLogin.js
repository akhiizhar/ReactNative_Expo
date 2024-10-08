import { createSlice } from "@reduxjs/toolkit";
import { postLogin } from "./authApi";
import * as SecureStore from "expo-secure-store";

const getStore = () => JSON.parse(SecureStore.getItem("user") || "{}"); // ambil
const setStore = (value) => SecureStore.setItem("user", JSON.stringify(value));

const authLogin = createSlice({
	name: "user",
	initialState: {
		isLoading: false,
		dataLogin: getStore() ? getStore() : {},
		isModalVisible: false,
		isLogin: getStore() ? true : false,
		isError: false,
		errorMessage: null,
	},
	reducers: {
		closeModal: (state) => {
			state.isModalVisible = false;
			state.isError = false;
			state.errorMessage = null;
		},
		logout: (state) => {
			state.dataLogin = {};
			state.isLogin = false;
			SecureStore.deleteItemAsync("user");
		},
	},
	extraReducers: (builder) => {
		builder.addCase(postLogin.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(postLogin.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isLogin = true;
			state.dataLogin = action.payload;
			console.log(action.payload);
			setStore(action.payload);
			state.isModalVisible = true;
		});
		builder.addCase(postLogin.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.errorMessage = action.payload;
			state.isModalVisible = true;
		});
	},
});

export { postLogin };
export const { closeModal, logout } = authLogin.actions; // action ini dapat dari reducer
export const selectUser = (state) => state.user; //selector
export default authLogin.reducer;
