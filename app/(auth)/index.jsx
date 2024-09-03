import {
	View,
	Text,
	Image,
	StyleSheet,
	TextInput,
	TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Link, router } from "expo-router";
import ModalPopup from "../../components/Modal";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as SecureStore from "expo-secure-store";
import { useSelector, useDispatch } from "react-redux";
import {
	closeModal,
	postLogin,
	selectUser,
} from "../../redux/reducers/auth/authLogin";

async function save(key, value) {
	await SecureStore.setItemAsync(key, value);
}

export default function Login() {
	const { errorMessage, isModalVisible, isError, data } =
		useSelector(selectUser);
	const dispatch = useDispatch();

	const [localErrorMessage, setLocalErrorMessage] = useState(null);
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
		dispatch(postLogin(formData));

		// try {
		// 	if (!formData.email || !formData.password) {
		// 		setLocalErrorMessage("Email dan Password harus diisi");
		// 		setModalVisible(true);
		// 		setTimeout(() => {
		// 			setModalVisible(false);
		// 			setLocalErrorMessage(null);
		// 		}, 2500);
		// 		return;
		// 	}

		// 	if (!req.ok) throw new Error(body.message);

		// 	save("user", JSON.stringify(body));
		// 	setModalVisible(true);
		// 	setTimeout(() => {
		// 		setModalVisible(false);
		// 		router.navigate("../(tabs)");
		// 	}, 2500);
		// } catch (e) {
		// 	setLocalErrorMessage(e.message);
		// 	setModalVisible(true);
		// 	setTimeout(() => {
		// 		setModalVisible(false);
		// 		setLocalErrorMessage(null);
		// 	}, 2500);
		// }
	};
	useEffect(() => {
		if (isModalVisible) {
			setTimeout(() => {
				dispatch(closeModal());
				if (!isError) router.push("/(tabs)");
			}, 2500);
		}
	}, [isModalVisible]);

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
					placeholder="Contoh: johndee@gmail.com"
				/>
			</View>
			<View style={styles.formContainer}>
				<Text style={styles.text}>Password</Text>
				<TextInput
					style={styles.input}
					onChangeText={(text) => handleChange("password", text)}
					secureTextEntry={true}
					placeholder="6+ Karakter"
				/>
			</View>

			<View style={styles.formContainer}>
				<TouchableOpacity style={styles.button} onPress={handleSubmit}>
					<Text style={styles.buttonText}>Sign In</Text>
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

			<ModalPopup visible={isModalVisible}>
				<View style={styles.modalBackground}>
					{localErrorMessage || errorMessage !== null ? (
						<>
							<Ionicons
								size={100}
								name={"close-circle-outline"}
								style={{ color: "red" }}
							/>
							<Text style={styles.modalText}>
								{localErrorMessage || errorMessage}
							</Text>
						</>
					) : (
						<>
							<Ionicons
								size={100}
								name={"checkmark-done-outline"}
								style={{ color: "#669BFA" }}
							/>
							<Text style={styles.modalText}>Berhasil Login</Text>
						</>
					)}
				</View>
			</ModalPopup>
		</View>
	);
}

const styles = StyleSheet.create({
	input: {
		borderWidth: 1,
		padding: 10,
		paddingHorizontal: 10,
		borderRadius: 5,
		fontFamily: "PoppinsRegular",
	},
	text: {
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
	buttonText: {
		color: "white",
		textAlign: "center",
		fontFamily: "PoppinsBold",
		fontSize: 16,
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
	modalText: {
		fontFamily: "PoppinsRegular",
		fontSize: 16,
	},
});
