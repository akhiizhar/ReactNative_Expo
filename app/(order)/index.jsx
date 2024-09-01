import {
	View,
	Text,
	StyleSheet,
	Button,
	ScrollView,
	TextInput,
	TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { ProgressSteps, ProgressStep } from "react-native-progress-stepper";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import { selectCarDetail } from "@/redux/reducers/car/carDetailsSlice";
import ButtonBack from "@/components/ButtonBack";
import CarList from "@/components/CarList";
import { Ionicons } from "@expo/vector-icons";

const formatCurrency = new Intl.NumberFormat("id-ID", {
	style: "currency",
	currency: "IDR",
});

const selectBank = [
	{ key: 1, bank: "BCA", purpose: "BCA Transfer" },
	{ key: 2, bank: "BNI", purpose: "BNI Transfer" },
	{ key: 3, bank: "Mandiri", purpose: "Mandiri Transfer" },
];

export default function index() {
	const { data } = useSelector(selectCarDetail);
	const [promoCode, setPromoCode] = useState("");
	const [selectedBank, setSelectedBank] = useState(null); // Menyimpan bank yang dipilih

	const handlePromoCodeChange = (text) => {
		setPromoCode(text);
	};

	const handleBankSelect = (bank) => {
		setSelectedBank(bank); // Mengatur bank yang dipilih
	};

	return (
		<>
			<View style={styles.header}>
				<ButtonBack />
				<Text style={styles.capacityText}>Pembayaran</Text>
			</View>
			<View style={{ flex: 1, marginBottom: 100 }}>
				<ProgressSteps>
					<ProgressStep label="Pilih Metode" removeBtnRow={true}></ProgressStep>
					<ProgressStep label="Pembayaran" removeBtnRow={true}></ProgressStep>
					<ProgressStep label="Tiket" removeBtnRow={true}></ProgressStep>
				</ProgressSteps>
			</View>
			<ScrollView style={styles.container}>
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
							<View style={styles.bankList} key={bank.key}>
								<View style={styles.bank}>
									<Text style={styles.bankText}>{bank.bank}</Text>
								</View>
								<View style={styles.bankTextContainer}>
									<Text
										style={styles.bankPurpose}
										onTouchEnd={() => handleBankSelect(bank)}>
										{bank.purpose}
									</Text>
									{selectedBank === bank && (
										<Ionicons name="checkmark-sharp" size={30} color="green" />
									)}
								</View>
							</View>
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
			</ScrollView>

			<View style={styles.footer}>
				<Text style={styles.price}>{formatCurrency.format(data.price)}</Text>
				<Button
					color="#3D7B3F"
					title="Lanjutkan Pembayaran"
					onPress={() => router.navigate("(listcar)/details/payment")}
					disabled={!selectedBank}
				/>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
		marginTop: 50,
	},
	capacityText: {
		color: "#000",
		fontSize: 16,
		fontFamily: "PoppinsBold",
		padding: 5,
	},
	textPayment: {
		marginTop: 20,
		marginHorizontal: 20,
	},
	container: {
		// marginTop: 20,
		marginHorizontal: 5,
		// backgroundColor: "#fff",
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
	containerPromo: {
		marginTop: 20,
		marginHorizontal: 20,
	},
	promoContainer: {
		marginTop: 20,
		padding: 15,
		backgroundColor: "#F5F5F5",
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
	containerBank: {
		marginHorizontal: 10,
	},
	bankContainer: {
		marginTop: 20,
		padding: 15,
		gap: 10,
	},
	bankList: {
		flexDirection: "row",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: "#E0E0E0",
		paddingVertical: 20,
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
	disabledButton: {
		backgroundColor: "#DEF1DF",
	},
});
