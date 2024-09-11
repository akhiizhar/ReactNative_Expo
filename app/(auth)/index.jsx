import {
	View,
	Text,
	Image,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	ScrollView,
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
} from "@/redux/reducers/auth/authLogin";
import auth from "@react-native-firebase/auth";
import {
	GoogleSignin,
	GoogleSigninButton,
} from "@react-native-google-signin/google-signin";

// Install Google Sign-in by oauth untuk configure
GoogleSignin.configure({
	webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
});

async function save(key, value) {
	await SecureStore.setItemAsync(key, value);
}

export default function Login() {
	async function onGoogleButtonPress() {
		try {
			await GoogleSignin.hasPlayServices({
				showPlayServicesUpdateDialog: true,
			});

			const {
				data: { idToken },
			} = await GoogleSignin.signIn();

			const googleCredential = auth.GoogleAuthProvider.credential(idToken);
			console.log(idToken, googleCredential);

			return auth().signInWithCredential(googleCredential);
		} catch (e) {
			console.log(e);
		}
	}

	function onAuthStateChanged(user) {
		console.log(user);
		// if (initializing) setInitializing(false);
	}

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber; // unsubscribe on unmount
	}, []);

	const { errorMessage, isModalVisible, isError, dataLogin } =
		useSelector(selectUser);
	const dispatch = useDispatch();

	const [localErrorMessage, setLocalErrorMessage] = useState(null);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [showPassword, setShowPassword] = useState(false);

	const handlePressIn = () => {
		setShowPassword(true);
	};

	const handlePressOut = () => {
		setShowPassword(false);
	};

	const handleChange = (name, text) => {
		setFormData({
			...formData,
			[name]: text,
		});
	};

	const handleSubmit = async () => {
		dispatch(postLogin(formData));
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
		<ScrollView>
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
				<View style={styles.input}>
					<TextInput
						onChangeText={(text) => handleChange("email", text)}
						placeholder="Ex: johndee@gmail.com"
					/>
					<Ionicons name={"mail-outline"} size={24} color="black" />
				</View>
			</View>
			<View style={styles.formContainer}>
				<Text style={styles.text}>Password</Text>
				<View style={styles.input}>
					<TextInput
						secureTextEntry={!showPassword}
						onChangeText={(text) => handleChange("password", text)}
						placeholder="Password"
					/>
					<TouchableOpacity
						onPressIn={handlePressIn}
						onPressOut={handlePressOut}>
						<Ionicons name={"eye-outline"} size={24} color="black" />
					</TouchableOpacity>
				</View>
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

			<View style={styles.formContainer1}>
				<Text style={styles.text1}>Sign In with:</Text>
				<GoogleSigninButton
					size={GoogleSigninButton.Size.Standard}
					color={GoogleSigninButton.Color.Light}
					onPress={onGoogleButtonPress}
				/>
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
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	input: {
		borderWidth: 1,
		padding: 10,
		paddingHorizontal: 10,
		borderRadius: 5,
		fontFamily: "PoppinsRegular",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	text: {
		color: "black",
		fontFamily: "PoppinsBold",
		fontSize: 14,
	},
	text1: {
		color: "black",
		fontFamily: "PoppinsBold",
		fontSize: 16,
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
	formContainer1: {
		paddingTop: 10,
		alignItems: "center",
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
