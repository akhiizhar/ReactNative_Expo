import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCarDetail } from "@/redux/reducers/car/carDetailsSlice";
import CarList from "@/components/CarList";
import { Ionicons } from "@expo/vector-icons";
import Constant from "expo-constants";
import { postOrder, putOrderSlip } from "@/redux/reducers/order/orderSlice";

const formatCurrency = new Intl.NumberFormat("id-ID", {
	style: "currency",
	currency: "IDR",
});

const selectBank = [
	{ key: 1, bank: "BCA", purpose: "BCA Transfer", rekening: "1234567890" },
	{ key: 2, bank: "BNI", purpose: "BNI Transfer", rekening: "7654321" },
	{
		key: 3,
		bank: "Mandiri",
		purpose: "Mandiri Transfer",
		rekening: "987654321",
	},
];

export default function step1({
	setCurrentStep,
	selectedBank,
	setSelectedBank,
}) {
	const { data } = useSelector(selectCarDetail);
	const [promoCode, setPromoCode] = useState("");

	const handleBankSelect = (bank) => {
		setSelectedBank(bank); // Mengatur bank yang dipilih
	};
	const handlePromoCodeChange = (text) => {
		setPromoCode(text);
	};
	const handlePaymentProceed = () => {
		if (selectedBank) {
			setCurrentStep(1); // Beralih ke langkah kedua
			console.log();
		}
	};

	return (
		<KeyboardAvoidingView>
			<View style={styles.pageContainer}>
				<View style={styles.container}>
					<View>
						<CarList
							image={{ uri: data.image }}
							carName={data.name}
							passenger={5}
							baggage={4}
							price={data.price}
						/>
					</View>
					<View style={styles.textPayment}>
						<Text style={styles.capacityText}>Pilih Bank Transfer</Text>
						<Text style={styles.capacityText}>
							Kamu bisa membayar dengan transfer melalui ATM, Internet Banking
							atau Mobile Banking
						</Text>
					</View>
					<View style={styles.containerBank}>
						<View style={styles.bankContainer}>
							{selectBank.map((bank) => (
								<TouchableOpacity
									key={bank.key}
									onPress={() => handleBankSelect(bank)}
									activeOpacity={1}>
									<View style={styles.bankList}>
										<View style={styles.bank}>
											<Text style={styles.bankText}>{bank.bank}</Text>
										</View>
										<View style={styles.bankTextContainer}>
											<Text style={styles.bankPurpose}>{bank.purpose}</Text>
											{selectedBank === bank && (
												<Ionicons
													name="checkmark-sharp"
													size={30}
													color="green"
												/>
											)}
										</View>
									</View>
								</TouchableOpacity>
							))}
						</View>
					</View>
					<View style={styles.containerPromo}>
						<View style={styles.promoContainer}>
							<Text style={styles.promoTitle}>% Pakai Kode Promo</Text>
							<View style={styles.promoInputContainer}>
								<TextInput
									style={styles.promoInput}
									placeholder="Tulis catatanmu di sini"
									value={promoCode}
									onChangeText={handlePromoCodeChange}
								/>
								<TouchableOpacity
									style={[
										styles.applyButton,
										!promoCode && styles.disabledButton,
									]}
									disabled={!promoCode}>
									<Text style={styles.applyButtonText}>Terapkan</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	pageContainer: {
		flex: 1,
		justifyContent: "space-between", // Mengatur agar konten utama dan footer tetap terpisah
		backgroundColor: "white",
		paddingTop: Constant.statusBarHeight,
	},
	container: {
		marginHorizontal: 5,
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
	containerBank: {
		marginHorizontal: 10,
	},
	bankContainer: {
		marginTop: 20,
		padding: 15,
		gap: 10,
	},
	bank: {
		padding: 10,
		borderWidth: 1,
		borderColor: "#E0E0E0",
		borderRadius: 5,
		fontFamily: "PoppinsRegular",
		marginRight: 20,
		width: "25%",
	},
	bankList: {
		flexDirection: "row",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: "#E0E0E0",
		paddingVertical: 20,
	},
	bankText: {
		fontFamily: "PoppinsRegular",
		textAlign: "center",
	},
	bankTextContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	bankPurpose: {
		fontFamily: "PoppinsRegular",
		fontSize: 14,
	},
	containerPromo: {
		marginVertical: 10,
		marginHorizontal: 20,
	},
	promoContainer: {
		marginTop: 20,
		padding: 15,
		backgroundColor: "#ffffff",
		borderRadius: 10,
		borderWidth: 1, // Menambahkan border
		borderColor: "#E0E0E0",
	},
	promoTitle: {
		fontSize: 16,
		fontFamily: "PoppinsBold",
		marginBottom: 10,
	},
	promoInputContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	promoInput: {
		flex: 1,
		padding: 10,
		borderWidth: 1,
		borderColor: "#E0E0E0",
		borderRadius: 5,
		fontFamily: "PoppinsRegular",
	},
	applyButton: {
		backgroundColor: "#3D7B3F",
		padding: 10,
		borderRadius: 5,
	},
	applyButtonText: {
		color: "#fff",
		fontFamily: "PoppinsBold",
	},
	disabledButton: {
		backgroundColor: "#DEF1DF",
	},
	footer: {
		backgroundColor: "#eeeeee",
		position: "fixed",
		width: "100%",
		bottom: 0,
		padding: 20,
	},
	price: {
		fontFamily: "PoppinsBold",
		fontSize: 16,
		marginBottom: 20,
	},
});
