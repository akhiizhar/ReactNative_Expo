import { View, Image, Text, Button, StyleSheet } from "react-native";
import React from "react";

export default function Profile() {
	return (
		<View style={styles.container}>
			<Text style={styles.akun}>Akun</Text>
			<View style={styles.content}>
				<Image
					source={require("@/assets/images/allura.png")}
					style={styles.image}
				/>
				<Text style={styles.text}>
					Upss kamu belum memiliki akun. Mulai buat akun agar transaksi di TMMIN
					Car Rental lebih mudah
				</Text>
				<View style={styles.button}>
					<Button color="#3D7B3F" title="Register" />
				</View>
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
