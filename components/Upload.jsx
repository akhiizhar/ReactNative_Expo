import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import CountDown from "react-native-countdown-component-maintained";

export default function Upload({
	isModalVisible,
	setCurrentStep,
	setIsModalVisible,
}) {
	const handleUpload = () => {
		setCurrentStep(2);
		setIsModalVisible(false);
	};
	return (
		<Modal
			visible={isModalVisible}
			style={{ marginHorizontal: 20, marginVertical: 20 }}>
			<View style={styles.textPayment1}>
				<Text style={styles.capacityText1}>Konfirmasi Pembayaran</Text>
				<Text style={styles.capacityText1}>
					Terima kasih telah melakukan konfirmasi pembayaran. Pembayaranmu akan
					segera kami cek tunggu kurang lebih 10 menit untuk mendapatkan
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
					Untuk membantu kami lebih cepat melakukan pengecekan. Kamu bisa upload
					bukti bayarmu
				</Text>
			</View>
			<View>
				<Text>PDF</Text>
			</View>
			<View style={{ gap: 10, marginHorizontal: 20 }}>
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
		</Modal>
	);
}

const styles = StyleSheet.create({
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
	},
	paymentButton1: {
		backgroundColor: "#fff",
		padding: 10,
		borderRadius: 5,
		alignItems: "center",
		borderColor: "#3D7B3F",
		borderWidth: 1,
	},
});
