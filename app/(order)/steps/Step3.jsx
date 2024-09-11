import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { selectOrder } from "@/redux/reducers/order/orderSlice";
import { useSelector } from "react-redux";

export default function step3() {
	const { dataOrder } = useSelector(selectOrder);
	console.log(dataOrder.slip);

	const [imageUri, setImageUri] = useState(null);

	useEffect(() => {
		// Pastikan ada URI gambar yang didapat
		if (dataOrder.slip) {
			// Gunakan setTimeout untuk menunda tampilan gambar
			const timer = setTimeout(() => {
				setImageUri(dataOrder.slip); // Atur URI gambar
			}, 2000); // Menunggu 2 detik sebelum menampilkan gambar

			// Cleanup timer jika component di-unmount
			return () => clearTimeout(timer);
		}
	}, [dataOrder.slip]);

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
					<View style={styles.pdf}>
						{imageUri ? (
							<Image
								source={{ uri: dataOrder.slip }}
								style={{ height: 200, width: 200, resizeMode: "contain" }}
							/>
						) : (
							<>
								<Ionicons name="images" size={24} color="black" />
								<Text style={styles.text}>PDF Viewer</Text>
							</>
						)}
					</View>
					<Text style={{ ...styles.text, color: "#3C3C3C" }}>
						Tunjukkan tiket ini ke petugas JBO di pos penjemputan Anda.
					</Text>
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
	pdf: {
		height: 200,
		borderWidth: 1,
		borderColor: "#D0D0D0",
		paddingHorizontal: 50,
		paddingVertical: 50,
		marginHorizontal: 10,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
		borderStyle: "dashed",
		backgroundColor: "#F5F5F5",
		flexDirection: "row",
	},
	text: {
		padding: 10,
		fontFamily: "PoppinsRegular",
		color: "#3C3C3C",
	},
});
