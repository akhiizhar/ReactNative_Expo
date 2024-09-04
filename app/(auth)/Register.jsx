import {
	View,
	Text,
	Image,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { useState } from "react";
import ModalPopup from "../../components/Modal";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Yup from "yup";
import { Formik } from "formik";

const SignupSchema = Yup.object().shape({
	name: Yup.string()
		.min(2, "Too Short!")
		.max(50, "Too Long!")
		.required("Required"),
	email: Yup.string().email("Invalid email").required("Required"),
	password: Yup.string()
		.min(8, "Too Short!")
		.max(50, "Too Long!")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
			"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
		)
		.required("Required"),
});

export default function Register() {
	const [errorMessage, setErrorMessage] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleSubmit = async (values) => {
		try {
			const req = await fetch(
				"https://api-car-rental.binaracademy.org/customer/auth/register",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: values.email,
						password: values.password,
						role: "Customer",
					}),
				}
			);
			const body = await req.json();
			console.log(body);

			if (!req.ok)
				throw new Error(
					body.message || body.errors[0].message || "Something Went Wrong!"
				);

			setModalVisible(true);
			setTimeout(() => {
				setModalVisible(false);
				router.navigate("/");
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
		<ScrollView>
			<View>
				<Image
					source={require("@/assets/images/logoToyota.png")}
					style={{ margin: 10 }}
				/>
			</View>
			<View>
				<Text style={styles.heading}>Sign Up!</Text>
			</View>
			<Formik
				initialValues={{ name: "", email: "", password: "" }}
				validationSchema={SignupSchema}
				onSubmit={(values) => handleSubmit(values)}>
				{({
					handleChange,
					handleBlur,
					handleSubmit,
					values,
					errors,
					touched,
				}) => (
					<>
						<View style={styles.formContainer}>
							<Text style={styles.text}>Name*</Text>
							<TextInput
								onBlur={handleBlur("name")}
								onChangeText={handleChange("name")}
								style={styles.input}
								placeholder="Full Name"
							/>
							{errors.name && touched.name ? (
								<Text style={{ color: "red" }}>{errors.name}</Text>
							) : null}
						</View>
						<View style={styles.formContainer}>
							<Text style={styles.text}>Email*</Text>
							<View style={styles.input}>
								<TextInput
									onBlur={handleBlur("email")}
									onChangeText={handleChange("email")}
									placeholder="Ex: johndee@gmail.com"
								/>
								<Ionicons name={"mail-outline"} size={24} color="black" />
							</View>
							{errors.email && touched.email ? (
								<Text style={{ color: "red" }}>{errors.email}</Text>
							) : null}
						</View>
						<View style={styles.formContainer}>
							<Text style={styles.text}>Password</Text>
							<View style={styles.input}>
								<TextInput
									onBlur={handleBlur("password")}
									onChangeText={handleChange("password")}
									placeholder="Enter Password"
									secureTextEntry={!showPassword}
								/>
								<TouchableOpacity onPress={toggleShowPassword}>
									<Ionicons
										name={showPassword ? "eye-off" : "eye"}
										size={24}
										color="black"
									/>
								</TouchableOpacity>
							</View>
							{errors.password && touched.password ? (
								<Text style={{ color: "red" }}>{errors.password}</Text>
							) : null}
						</View>
						<View style={styles.formContainer}>
							<TouchableOpacity onPress={handleSubmit} style={styles.button}>
								<Text
									style={{
										color: "white",
										textAlign: "center",
										fontFamily: "PoppinsBold",
										fontSize: 16,
									}}>
									Sign Up
								</Text>
							</TouchableOpacity>
						</View>
					</>
				)}
			</Formik>
			<View>
				<Text style={styles.textRegister}>
					Already have an account{" "}
					<Link href="/" style={styles.linkRegiter}>
						Sign In Here
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
								Berhasil Register
							</Text>
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
		// marginLeft: 10,
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
	linkRegiter: {
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
