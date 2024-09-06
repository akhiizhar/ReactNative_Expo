import {
	View,
	Text,
	Modal,
	TouchableOpacity,
	StyleSheet,
	Pressable,
	Image,
} from "react-native";
import React, { useState } from "react";
import CountDown from "react-native-countdown-component-maintained";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function Upload({
	isModalVisible,
	setCurrentStep,
	setIsModalVisible,
}) {
	const handleUpload = () => {
		setCurrentStep(2);
		setIsModalVisible(false);
	};

	const handleCloseModal = () => {
		setIsModalVisible(false);
	};

	const [image, setImage] = useState(null);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	return (
		<Modal visible={isModalVisible} style={{ flex: 1 }}>
			<View style={styles.container}>
				<View style={styles.textPayment1}>
					<Text style={styles.capacityText1}>Konfirmasi Pembayaran</Text>
					<Text style={styles.capacityText1}>
						Terima kasih telah melakukan konfirmasi pembayaran. Pembayaranmu
						akan segera kami cek tunggu kurang lebih 10 menit untuk mendapatkan
						konfirmasi.
					</Text>
				</View>
				<View>
					<CountDown
						until={60 * 10}
						size={10}
						onFinish={() => alert("Finished")}
						digitStyle={{ backgroundColor: "#FA2C5A" }}
						digitTxtStyle={{ color: "#fff" }}
						timeToShow={["M", "S"]}
						timeLabels={{ m: null, s: null }}
					/>
				</View>
				<View style={styles.textPayment}>
					<Text style={styles.capacityText}>Upload Bukti Pembayaran</Text>
					<Text style={styles.capacityText}>
						Untuk membantu kami lebih cepat melakukan pengecekan. Kamu bisa
						upload bukti bayarmu
					</Text>
				</View>
				<View>
					<Pressable style={styles.pdf} onPress={pickImage}>
						{image ? (
							<Image source={{ uri: image }} style={styles.image} />
						) : (
							<View
								style={{
									// flex: 1,
									alignItems: "center",
									paddingHorizontal: 50,
									paddingVertical: 50,
								}}>
								<Ionicons
									style={styles.pdfIcon}
									name="images"
									size={24}
									color="black"
								/>
							</View>
						)}
					</Pressable>
				</View>
				<View
					style={{
						gap: 10,
						marginHorizontal: 10,
						marginVertical: 10,
						padding: 10,
					}}>
					<TouchableOpacity style={styles.paymentButton} onPress={handleUpload}>
						<Text
							style={{
								fontFamily: "PoppinsBold",
								fontSize: 16,
								color: "#fff",
							}}>
							Upload
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.paymentButton1}>
						<Text
							style={{
								fontFamily: "PoppinsBold",
								fontsSize: 16,
								color: "#3D7B3F",
							}}>
							Lihat Daftar Pesanan
						</Text>
					</TouchableOpacity>
				</View>
				<View>
					<TouchableOpacity onPress={handleCloseModal}>
						<View style={styles.closeButton}>
							<Ionicons name="close-circle-outline" size={24} color="black" />
							<Text>Close</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
	textPayment1: {
		marginTop: 20,
		marginHorizontal: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	capacityText1: {
		color: "#000",
		fontSize: 16,
		fontFamily: "PoppinsBold",
		padding: 5,
		textAlign: "center",
	},
	textPayment: {
		marginTop: 20,
		marginHorizontal: 20,
	},
	capacityText: {
		color: "#000",
		fontSize: 16,
		fontFamily: "PoppinsBold",
		padding: 5,
	},
	paymentButton: {
		backgroundColor: "#3D7B3F",
		padding: 10,
		borderRadius: 5,
		alignItems: "center",
		paddingHorizontal: 50,
	},
	paymentButton1: {
		backgroundColor: "#fff",
		padding: 10,
		borderRadius: 5,
		alignItems: "center",
		borderColor: "#3D7B3F",
		borderWidth: 1,
	},
	pdf: {
		borderWidth: 1,
		borderColor: "#D0D0D0",
		// paddingHorizontal: 50,
		// paddingVertical: 50,
		marginHorizontal: 20,
		borderRadius: 5,
		// alignItems: "center",
		justifyContent: "center",
		borderStyle: "dashed",
		backgroundColor: "#F5F5F5",
	},
	image: {
		height: 200,
		width: "auto",
		objectFit: "contain",
	},
	closeButton: {
		justifyContent: "center",
		alignContent: "center",
	},
});
