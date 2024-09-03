import {
	View,
	Text,
	StyleSheet,
	Button,
	TouchableOpacity,
	Modal,
} from "react-native";
import React, { useState } from "react";
import { ProgressSteps, ProgressStep } from "react-native-progress-stepper";
import { useSelector } from "react-redux";
import { selectCarDetail } from "@/redux/reducers/car/carDetailsSlice";
import ButtonBack from "@/components/ButtonBack";
import { useNavigation } from "@react-navigation/native";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import CountDown from "react-native-countdown-component-maintained";
import Upload from "@/components/Upload";

const formatCurrency = new Intl.NumberFormat("id-ID", {
	style: "currency",
	currency: "IDR",
});

export default function index() {
	const { data } = useSelector(selectCarDetail);
	const [selectedBank, setSelectedBank] = useState(null); // Menyimpan bank yang dipilih
	const [currentStep, setCurrentStep] = useState(0);
	const navigation = useNavigation();
	const [isModalVisible, setIsModalVisible] = useState(false);

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
					<ProgressStep label="Pilih Metode" removeBtnRow={true}>
						<Step1
							setCurrentStep={setCurrentStep}
							setSelectedBank={setSelectedBank}
							selectedBank={selectedBank}
						/>
					</ProgressStep>
					<ProgressStep
						label="Pembayaran"
						removeBtnRow={true}
						setCurrentStep={setCurrentStep}>
						<Step2
							setCurrentStep={setCurrentStep}
							selectedBank={selectedBank}
						/>
						<Upload
							setCurrentStep={setCurrentStep}
							isModalVisible={isModalVisible}
							setIsModalVisible={setIsModalVisible}
						/>
						{/* <Modal
							visible={isModalVisible}
							style={{ marginHorizontal: 20, marginVertical: 20 }}>
							<View style={styles.textPayment1}>
								<Text style={styles.capacityText1}>Konfirmasi Pembayaran</Text>
								<Text style={styles.capacityText1}>
									Terima kasih telah melakukan konfirmasi pembayaran.
									Pembayaranmu akan segera kami cek tunggu kurang lebih 10 menit
									untuk mendapatkan konfirmasi.
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
						</Modal> */}
					</ProgressStep>
					<ProgressStep
						label="Tiket"
						removeBtnRow={true}
						setCurrentStep={setCurrentStep}>
						<Step3 setCurrentStep={setCurrentStep} />
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
	capacityText1: {
		color: "#000",
		fontSize: 16,
		fontFamily: "PoppinsBold",
		padding: 5,
		textAlign: "center",
	},
	textPayment1: {
		marginTop: 20,
		marginHorizontal: 20,
		alignItems: "center",
		justifyContent: "center",
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
});
