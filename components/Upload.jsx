import {
	View,
	Text,
	Modal,
	TouchableOpacity,
	StyleSheet,
	Pressable,
	Image,
	Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import CountDown from "react-native-countdown-component-maintained";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { putOrderSlip, selectOrder } from "@/redux/reducers/order/orderSlice";
import { selectUser } from "@/redux/reducers/auth/authLogin";
import { useSelector, useDispatch } from "react-redux";

export default function Upload({
	isModalVisible,
	setCurrentStep,
	setIsModalVisible,
}) {
	// const width = Dimensions.get("window").width;
	const [image, setImage] = useState(null);
	const dispatch = useDispatch();
	const { dataOrder, status, errorMessage } = useSelector(selectOrder);
	const user = useSelector(selectUser);

	// formData hanya digunakan hanya untuk upload file
	const handleUpload = () => {
		if (image) {
			console.log(image);
			const formData = new FormData(); // berfungsi mengirim multipart(beda2 jenis file) formData,
			formData.append("slip", image); // APPEND BERFUNGSI UNTU MENAMBAHKAN DATA KE FORMDATA, "SLIP" itu name, imgae itu datanya, "slip" itu harus sama namanya dengan di backend
			dispatch(
				putOrderSlip({
					token: user.dataLogin.access_token,
					id: dataOrder.id,
					formData,
				})
			); //
		}
	};

	useEffect(() => {
		if (status === "upload-success") {
			console.log("Upload succes", dataOrder);
			setTimeout(() => {
				setCurrentStep(2);
				setIsModalVisible(false);
			}, 3000);
		} else {
			console.log("error", errorMessage);
		}
	}, [status]);

	const handleCloseModal = () => {
		setIsModalVisible(false);
	};

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
			setImage({
				uri: result.assets[0].uri,
				name: result.assets[0].fileName,
				type: result.assets[0].mimeType,
			});
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
							<Image source={{ uri: image.uri }} style={styles.image} />
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
				<View style={{ alignItems: "center" }}>
					<TouchableOpacity onPress={handleCloseModal}>
						<View style={styles.closeButton}>
							<Ionicons name="close-circle-outline" size={50} color="red" />
							<Text
								style={{
									fontFamily: "PoppinsBold",
									fontSize: 16,
									justifyContent: "center",
								}}>
								Close
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modalContainer: {
		backgroundColor: "rgba(0,0,0, 0.5)",
		paddingVertical: 50,
		// flex: 1,
	},
	container: {
		// paddingVertical: 50,
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
		// width: windowsWidth * 0.9,
	},
	closeButton: {
		justifyContent: "center",
		// alignContent: "center",
	},
});
