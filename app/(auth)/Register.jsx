import {
	View,
	Text,
	Image,
	StyleSheet,
	TextInput,
	TouchableOpacity,
} from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function Login() {
	const [text, onChangeText] = React.useState(null);
	const [email, onChangeEmail] = React.useState(null);
	const [number, onChangeNumber] = React.useState(null);
	return (
		<View>
			<View>
				<Image
					source={require("@/assets/images/logoToyota.png")}
					style={{ margin: 10 }}
				/>
			</View>
			<View>
				<Text style={styles.heading}>Sign Up!</Text>
			</View>
			<View style={styles.formContainer}>
				<Text style={styles.text}>Name*</Text>
				<TextInput
					style={styles.input}
					onChangeText={onChangeText}
					value={text}
					placeholder="Full Name"
				/>
			</View>
			<View style={styles.formContainer}>
				<Text style={styles.text}>Email*</Text>
				<TextInput
					style={styles.input}
					onChangeText={onChangeEmail}
					value={email}
					placeholder="Contoh: johndee@gmail.com"
				/>
			</View>
			<View style={styles.formContainer}>
				<Text style={styles.text}>Password</Text>
				<TextInput
					style={styles.input}
					onChangeText={onChangeNumber}
					value={number}
					secureTextEntry={true}
					placeholder="6+ Karakter"
					keyboardType="numeric"
				/>
			</View>

			<View style={styles.formContainer}>
				<TouchableOpacity style={styles.button}>
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

			<View>
				<Text style={styles.textRegister}>
					Already have an account{" "}
					<Link href="/" style={styles.linkRegiter}>
						Sign In Here
					</Link>
				</Text>
			</View>
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
});
