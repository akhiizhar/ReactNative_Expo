import {
	View,
	Text,
	StyleSheet,
	Button,
	ScrollView,
	TextInput,
	TouchableOpacity,
	Modal,
} from "react-native";
import React, { useState } from "react";
import { ProgressSteps, ProgressStep } from "react-native-progress-stepper";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import { selectCarDetail } from "@/redux/reducers/car/carDetailsSlice";
import ButtonBack from "@/components/ButtonBack";
import CarList from "@/components/CarList";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

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
	const [currentStep, setCurrentStep] = useState(0);
	const navigation = useNavigation();
	const [isModalVisible, setIsModalVisible] = useState(false);

	const handlePromoCodeChange = (text) => {
		setPromoCode(text);
	};

	const handleBankSelect = (bank) => {
		setSelectedBank(bank); // Mengatur bank yang dipilih
	};

	const handlePaymentProceed = () => {
		console.log(selectedBank);

		if (selectedBank) {
			setCurrentStep(1); // Beralih ke langkah kedua
		}
	};

	const handleUpload = () => {
		setCurrentStep(2);
		setIsModalVisible(false);
	};

	const handleBack = () => {
		if (currentStep === 0) {
			navigation.goBack();
		} else {
			setCurrentStep((prevStep) => prevStep - 1);
		}
	};

	return (
		<View style={{ flex: 1, backgroundColor: "white", paddingTop: 20 }}>
			<View style={styles.header}>
				<ButtonBack onPress={handleBack} />
				<Text style={styles.capacityText}>
					{currentStep === 1 && selectedBank
						? `${selectedBank.purpose} \nOrder ID: xxxxxxxxxxx`
						: currentStep === 2 && selectedBank
						? "Tiket \nOrder ID: xxxxxxxxxxx"
						: "Pembayaran"}
				</Text>
			</View>
			<View style={{ flex: 1, marginBottom: 100 }}>
				<ProgressSteps activeStep={currentStep}>
					<ProgressStep
						label="Pilih Metode"
						removeBtnRow={true}
						setCurrentStep={setCurrentStep}>
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
									Kamu bisa membayar dengan transfer melalui ATM, Internet
									Banking atau Mobile Banking
								</Text>
							</View>
							<View style={styles.containerBank}>
								<View style={styles.bankContainer}>
									{selectBank.map((bank) => (
										<TouchableOpacity
											// onTouchEnd={() => handleBankSelect(bank)}
											onPress={() => handleBankSelect(bank)}
											activeOpacity={1}>
											<View style={styles.bankList} key={bank.key}>
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
					</ProgressStep>
					<ProgressStep
						label="Pembayaran"
						removeBtnRow={true}
						setCurrentStep={setCurrentStep}>
						<View style={{ flex: 1, paddingBottom: 100 }}>
							<View style={styles.textPayment}>
								<Text style={styles.capacityText}>
									Selesaikan Pembayaran Sebelum..
								</Text>
								<Text style={styles.capacityText}>
									Rabu, 19 Jun 2022 jam 13.00 WIB
								</Text>
							</View>
							<View>
								<CarList
									image={{ uri: data.image }}
									carName={data.name}
									passenger={5}
									baggage={4}
									price={data.price}
								/>
								<View style={styles.textPayment}>
									<Text style={styles.capacityText}>Lakukan Transfer ke</Text>
									<View style={styles.bankListStep}>
										<View style={styles.bank}>
											<Text style={styles.bankText}>{selectedBank?.bank}</Text>
										</View>
										<View style={styles.bankTextContainerCol}>
											<Text style={styles.bankPurpose}>
												{selectedBank?.purpose}
											</Text>
											<Text>a.n Izhar Ramadhan</Text>
										</View>
									</View>
								</View>
								<View>
									<View style={styles.formContainer}>
										<Text style={styles.text}>Nomor Rekening</Text>
										<View style={styles.inputContainer}>
											<TextInput
												style={styles.input}
												onChangeNumber={(value) => {
													console.log(value);
												}}
												secureTextEntry={true}
												placeholder="Masukkan Nomer Rekening"
												keyboardType="numeric"
											/>
											<Ionicons
												size={20}
												name={"copy-outline"}
												style={styles.iconContainer}
											/>
										</View>
									</View>
									<View style={styles.formContainer}>
										<Text style={styles.text}>Total Bayar</Text>
										<View style={styles.inputContainer}>
											<TextInput
												style={styles.input}
												defaultValue={formatCurrency.format(data.price)}
												editable={false}
											/>
											<Ionicons
												size={20}
												name={"copy-outline"}
												style={styles.iconContainer}
											/>
										</View>
									</View>
								</View>
							</View>
						</View>
						<Modal
							visible={isModalVisible}
							style={{ marginHorizontal: 20, marginVertical: 20 }}>
							<View style={styles.textPayment}>
								<Text style={styles.capacityText}>Konfirmasi Pembayaran</Text>
								<Text style={styles.capacityText}>
									Terima kasih telah melakukan konfirmasi pembayaran.
									Pembayaranmu akan segera kami cek tunggu kurang lebih 10 menit
									untuk mendapatkan konfirmasi.
								</Text>
							</View>
							<View>
								<Text>Countdown</Text>
							</View>
							<View style={styles.textPayment}>
								<Text style={styles.capacityText}>Upload Bukti Pembayaran</Text>
								<Text style={styles.capacityText}>
									Untuk membantu kami lebih cepat melakukan pengecekan. Kamu
									bisa upload bukti bayarmu
								</Text>
							</View>
							<View>
								<Text>PDF</Text>
							</View>
							<View style={{ gap: 10, marginHorizontal: 20 }}>
								<TouchableOpacity
									style={styles.paymentButton}
									onPress={handleUpload}>
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
					</ProgressStep>
					<ProgressStep
						label="Tiket"
						removeBtnRow={true}
						setCurrentStep={setCurrentStep}>
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
					</ProgressStep>
				</ProgressSteps>
			</View>
			<View style={styles.footer}>
				{currentStep === 0 && (
					<>
						<Text style={styles.price}>
							{formatCurrency.format(data.price)}
						</Text>
						<Button
							color="#3D7B3F"
							title="Bayar"
							onPress={handlePaymentProceed}
							disabled={!selectedBank}
						/>
					</>
				)}
				{currentStep === 1 && (
					<>
						<Text style={styles.capacityText}>
							Klik konfirmasi pembayaran untuk mempercepat proses pengecekan
						</Text>
						<View style={{ gap: 10 }}>
							<TouchableOpacity
								style={styles.paymentButton}
								onPress={() => setIsModalVisible(true)}>
								<Text
									style={{
										fontFamily: "PoppinsBold",
										fontSize: 16,
										color: "#fff",
									}}>
									Konfirmasi Pembayaran
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
					</>
				)}
				{currentStep === 2 && (
					<>
						<View style={{ backgroundColor: "#ffffff" }}>
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
					</>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
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
		marginHorizontal: 5,
	},
	footer: {
		backgroundColor: "#eeeeee",
		position: "absolute",
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
		marginVertical: 30,
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
	bankListStep: {
		flexDirection: "row",
		alignItems: "center",
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
	bankTextContainerCol: {
		flex: 1,

		justifyContent: "space-between",
	},
	bankPurpose: {
		fontFamily: "PoppinsRegular",
		fontSize: 14,
	},
	disabledButton: {
		backgroundColor: "#DEF1DF",
	},
	text: {
		fontFamily: "PoppinsRegular",
		fontSize: 14,
		marginBottom: 5,
		color: "#8A8A8A",
	},
	formContainer: {
		paddingHorizontal: 20,
		marginBottom: 30,
	},
	input: {
		flex: 1,
		padding: 10,
		paddingHorizontal: 10,
		color: "#000",
		fontFamily: "PoppinsRegular",
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#000",
		borderRadius: 5,
		paddingHorizontal: 10,
	},
	iconContainer: {
		padding: 5,
		marginLeft: 10,
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
