import { createAsyncThunk } from "@reduxjs/toolkit";

export const postLogin = createAsyncThunk(
	"postLogin",
	async (formData, { rejectWithValue }) => {
		try {
			const req = await fetch(
				"https://api-car-rental.binaracademy.org/customer/auth/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: formData.email,
						password: formData.password,
					}),
				}
			);
			const body = await req?.json();
			if (!req.ok) throw new Error(body.message);
			return body;
		} catch (e) {
			console.log(e);
			return rejectWithValue(e.message);
		}
	}
);

export const fetchCarDetails = createAsyncThunk(
	"fetchCarDetails",
	async ({ id, signal }) => {
		const res = await fetch(
			"https://api-car-rental.binaracademy.org/customer/car/" + id,
			{ signal }
		);
		return res?.json();
	}
);
