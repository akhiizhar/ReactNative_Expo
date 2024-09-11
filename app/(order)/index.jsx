import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { ProgressSteps, ProgressStep } from "react-native-progress-stepper";
import { useSelector, useDispatch } from "react-redux"; //
import { selectCarDetail } from "@/redux/reducers/car/carDetailsSlice";
import ButtonBack from "@/components/ButtonBack";
import { useNavigation } from "@react-navigation/native";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Upload from "@/components/Upload";
import {
	selectOrder,
	postOrder,
	resetState,
	putOrderSlip,
} from "@/redux/reducers/order/orderSlice";
import { selectUser } from "@/redux/reducers/auth/authLogin";
import moment from "moment";

const formatCurrency = new Intl.NumberFormat("id-ID", {
	style: "currency",
	currency: "IDR",
});

export default function index() {
	const { data } = useSelector(selectCarDetail); // ambil id
	const [selectedBank, setSelectedBank] = useState(null); // Menyimpan bank yang dipilih
	const [currentStep, setCurrentStep] = useState(0);
	const navigation = useNavigation();
	const [isModalVisible, setIsModalVisible] = useState(false);

	const { dataLogin } = useSelector(selectUser); // ambil token
	const { dataOrder, status, errorMessage } = useSelector(selectOrder);
	const dispatch = useDispatch();

	const handlePaymentProceed = async () => {
		if (selectedBank) {
			setCurrentStep(1); // Beralih ke langkah kedua
		}
		await dispatch(
			postOrder({
				formData: {
					startRentAt: moment().format("YYYY-MM-DD"),
					finishRentAt: moment().add(2, "days").format("YYYY-MM-DD"),
					carId: data.id,
				},
				token: dataLogin.access_token,
			})
		);
		// console.log("dataLogin", dataLogin);
		// console.log("data", data);
	};

	useEffect(() => {
		if (status === "success" && selectedBank) {
			console.log("dataOrder", dataOrder);
			setCurrentStep(1);
		} else {
			console.log("error", errorMessage);
		}
	}, [status]);

	const handleUpload = () => {
		setCurrentStep(2);
		setIsModalVisible(false);
	};

	const handleBack = () => {
		if (currentStep === 0) {
			navigation.goBack();
			dispatch(resetState());
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
			<View style={{ flex: 1 }}>
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
						<TouchableOpacity
							style={[
								styles.paymentButton,
								!selectedBank && styles.disabledButton,
							]}
							disabled={!selectedBank}
							onPress={handlePaymentProceed}>
							<Text
								style={{
									fontFamily: "PoppinsBold",
									fontSize: 16,
									color: "#fff",
								}}>
								Konfirmasi Pembayaran
							</Text>
						</TouchableOpacity>
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
	footer: {
		backgroundColor: "#fff",
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
	disabledButton: {
		backgroundColor: "#DEF1DF",
	},
});
