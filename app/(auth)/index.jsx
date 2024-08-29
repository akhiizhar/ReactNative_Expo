import {
	View,
	Text,
	Image,
	StyleSheet,
	TextInput,
	TouchableOpacity,
} from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { useState } from "react";
import ModalPopup from "../../components/Modal";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as SecureStore from "expo-secure-store";

async function save(key, value) {
	await SecureStore.setItemAsync(key, value);
}

export default function Login() {
	// const [email, onChangeEmail] = React.useState(null);
	// const [number, onChangeNumber] = React.useState(null);
	const [errorMessage, setErrorMessage] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const handleChange = (name, text) => {
		setFormData({
			...formData,
			[name]: text,
		});
	};
	const handleSubmit = async () => {
		try {
			if (!formData.email || !formData.password) {
				setErrorMessage("Email dan Password harus diisi");
				setModalVisible(true);
				setTimeout(() => {
					setModalVisible(false);
					setErrorMessage(null);
				}, 2500);
				return; // Menghentikan proses jika email atau password kosong
			}
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
			const body = await req.json();
			console.log(body);

			if (!req.ok) throw new Error(body.message);

			save("user", JSON.stringify(body));
			setModalVisible(true);
			setTimeout(() => {
				setModalVisible(false);
				router.navigate("../(tabs)");
			}, 2500);
		} catch (e) {
			setErrorMessage(e.message);
			setModalVisible(true);
			setTimeout(() => {
				setModalVisible(false);
				setErrorMessage(null);
			}, 2500);
		}
	};

	return (
		<View>
			<View>
				<Image
					source={require("@/assets/images/logoToyota.png")}
					style={{ margin: 10 }}
				/>
			</View>
			<View>
				<Text style={styles.heading}>Welcome Back!</Text>
			</View>
			<View style={styles.formContainer}>
				<Text style={styles.text}>Email</Text>
				<TextInput
					style={styles.input}
					onChangeText={(text) => handleChange("email", text)}
					// value={email}
					placeholder="Contoh: johndee@gmail.com"
				/>
			</View>
			<View style={styles.formContainer}>
				<Text style={styles.text}>Password</Text>
				<TextInput
					style={styles.input}
					onChangeText={(text) => handleChange("password", text)}
					// value={number}
					secureTextEntry={true}
					placeholder="6+ Karakter"
					keyboardType="numeric"
				/>
			</View>

			<View style={styles.formContainer}>
				<TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
					<Text
						style={{
							color: "white",
							textAlign: "center",
							fontFamily: "PoppinsBold",
							fontSize: 16,
						}}>
						Sign In
					</Text>
				</TouchableOpacity>
			</View>

			<View>
				<Text style={styles.textRegister}>
					Don’t have an account?{" "}
					<Link href="./Register" style={styles.linkRegister}>
						Sign Up for free
					</Link>
				</Text>
			</View>
			<ModalPopup visible={modalVisible}>
				<View style={styles.modalBackground}>
					{errorMessage !== null ? (
						<>
							<Ionicons
								size={100}
								name={"close-circle-outline"}
								style={{ color: "red" }}
							/>
							<Text style={{ fontFamily: "PoppinsRegular", fontSize: 16 }}>
								{errorMessage}
							</Text>
						</>
					) : (
						<>
							<Ionicons
								size={100}
								name={"checkmark-done-outline"}
								style={{ color: "#669BFA" }}
							/>
							<Text style={{ fontFamily: "PoppinsRegular", fontSize: 16 }}>
								Berhasil Login
							</Text>
						</>
					)}
				</View>
			</ModalPopup>
		</View>
	);
}

const styles = StyleSheet.create({
	input: {
		// height: 40,
		// margin: 10,
		// marginTop: 0,
		borderWidth: 1,
		padding: 10,
		paddingHorizontal: 10,
		borderRadius: 5,
		fontFamily: "PoppinsRegular",
	},
	text: {
		// marginBottom: 10,
		color: "black",
		fontFamily: "PoppinsBold",
		fontSize: 14,
	},
	heading: {
		fontSize: 40,
		marginVertical: 30,
		color: "black",
		textAlign: "center",
		fontFamily: "PoppinsBold",
	},
	formContainer: {
		paddingHorizontal: 30,
		marginBottom: 30,
	},
	textRegister: {
		marginTop: 10,
		textAlign: "center",
		fontSize: 16,
		fontFamily: "PoppinsRegular",
	},
	linkRegister: {
		textDecorationLine: "underline",
		color: "blue",
		fontSize: 16,
		fontFamily: "PoppinsBold",
	},
	button: {
		padding: 10,
		backgroundColor: "#3D7B3F",
		borderRadius: 5,
		marginBottom: 20,
	},
	modalBackground: {
		width: "90%",
		backgroundColor: "#fff",
		elevation: 20,
		borderRadius: 4,
		padding: 20,
		alignItems: "center",
		justifyContent: "center",
	},
});
