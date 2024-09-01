import { View, Image, Text, Button, StyleSheet } from "react-native";
import React from "react";
import * as SecureStore from "expo-secure-store";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, logout } from "@/redux/reducers/auth/authLogin";
import { router } from "expo-router";

export default function Profile() {
	const { data, isLogin } = useSelector(selectUser);
	const dispatch = useDispatch();

	const [user, setUser] = useState("");

	useEffect(() => {
		const getEmail = async () => {
			try {
				const userData = await SecureStore.getItemAsync("user");
				if (userData) {
					const parsedEmail = JSON.parse(userData);
					console.log("User data:", parsedEmail);
					setUser(parsedEmail);
				}
			} catch (error) {
				console.error("Failed to fetch email from SecureStore:", error);
			}
		};

		getEmail();
	}, []);
	return (
		<View style={styles.container}>
			<Text style={styles.akun}>Akun</Text>
			<View style={styles.content}>
				{data.email ? (
					<>
						<Text>{user.email}</Text>
						<View>
							{isLogin ? (
								<Button
									title={"Logout"}
									onPress={() => {
										dispatch(logout());
										router.replace("../(auth)");
									}}
								/>
							) : (
								<Button
									title={"Register"}
									onPress={() => {
										router.navigate("../(auth)/register");
									}}
								/>
							)}
						</View>
					</>
				) : (
					<>
						<Image
							source={require("@/assets/images/allura.png")}
							style={styles.image}
						/>
						<Text style={styles.text}>
							Upss kamu belum memiliki akun. Mulai buat akun agar transaksi di
							TMMIN Car Rental lebih mudah
						</Text>
						<View style={styles.button}>
							<Button color="#3D7B3F" title="Register" />
						</View>
					</>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	akun: {
		position: "absolute",
		top: 20,
		left: 20,
		fontFamily: "PoppinsBold",
		fontSize: 16,
		marginTop: 20,
	},
	content: {
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		marginBottom: 30, // Add some margin to separate image from text
	},
	text: {
		justifyContent: "center",
		textAlign: "center",
		// marginBottom: 10, // Add margin to separate text from button
		fontFamily: "PoppinsBold",
		fontSize: 16,
		paddingHorizontal: 30,
	},
	button: {
		marginTop: 10,
		fontFamily: "PoppinsBold",
		// padding: 5,
	},
});
