import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function step3() {
	return (
		<View>
			<View>
				<View style={styles.formContainer}>
					<Text style={styles.text}>Invoice</Text>
					<View style={styles.inputContainer}>
						<TextInput
							style={styles.input}
							onChangeNumber={(value) => {
								console.log(value);
							}}
							secureTextEntry={true}
							placeholder="INV/xx/xx-xxxx/"
							keyboardType="numeric"
						/>
						<Ionicons
							size={20}
							name={"cloud-download-outline"}
							style={styles.iconContainer}
						/>
					</View>
				</View>
			</View>
			<View>
				<View style={styles.formContainer}>
					<Text style={styles.text}>E-Tiket</Text>
					<View style={styles.inputContainer}></View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	formContainer: {
		paddingHorizontal: 20,
		marginBottom: 30,
	},
	text: {
		fontFamily: "PoppinsRegular",
		fontSize: 14,
		marginBottom: 5,
		color: "#8A8A8A",
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#000",
		borderRadius: 5,
		paddingHorizontal: 10,
	},
	input: {
		flex: 1,
		padding: 10,
		paddingHorizontal: 10,
		color: "#000",
		fontFamily: "PoppinsRegular",
	},
	iconContainer: {
		padding: 5,
		marginLeft: 10,
	},
});
