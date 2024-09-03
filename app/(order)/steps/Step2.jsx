import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React from "react";
import { selectCarDetail } from "@/redux/reducers/car/carDetailsSlice";
import { useSelector } from "react-redux";
import CarList from "@/components/CarList";
import { Ionicons } from "@expo/vector-icons";
import CountDown from "react-native-countdown-component-maintained";
import * as Clipboard from "expo-clipboard";

const formatCurrency = new Intl.NumberFormat("id-ID", {
	style: "currency",
	currency: "IDR",
});

function getDate24() {
	const date24 = new Date();
	date24.setHours(date24.getHours() + 24);
	return date24.toString();
}

export default function step2({ selectedBank }) {
	const { data } = useSelector(selectCarDetail);
	console.log(selectedBank);

	const copyToClipboard = async (text) => {
		await Clipboard.setStringAsync(text.toString());
	};

	return (
		<View style={{ flex: 1, paddingBottom: 100 }}>
			<View style={styles.textPayment}>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Text style={styles.capacityText}>Selesaikan Pembayaran Sebelum</Text>
					<CountDown
						size={9}
						until={86400} // Lebih gampangnya, mau disimpan berapa jam, tapi disimpannya dalam detik, misal 1 jam berapa detik
						onFinish={() => alert("Finished")}
						digitStyle={{
							backgroundColor: "#FA2C5A",
						}}
						digitTxtStyle={{ color: "#fff" }}
						timeToShow={["H", "M", "S"]}
						timeLabels={{ m: null, s: null }}
						showSeparator
					/>
				</View>
				<Text style={styles.capacityText}>{getDate24()}</Text>
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
							<Text style={styles.bankPurpose}>{selectedBank?.purpose}</Text>
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
								// onChangeNumber={(value) => {
								// 	console.log(value);
								// }}
								// secureTextEntry={true}
								// placeholder="Masukkan Nomer Rekening"
								value={
									selectedBank?.rekening || "Nomor rekening tidak tersedia"
								}
								editable={false}
								keyboardType="numeric"
							/>
							<Pressable
								onPress={() => copyToClipboard(selectedBank?.rekening)}>
								<Ionicons
									size={20}
									name={"copy-outline"}
									style={styles.iconContainer}
								/>
							</Pressable>
						</View>
					</View>
					<View style={styles.formContainer}>
						<Text style={styles.text}>Total Bayar</Text>
						<View style={styles.inputContainer}>
							<TextInput
								style={styles.input}
								value={formatCurrency.format(data.price)}
								editable={false}
							/>
							<Pressable onPress={() => copyToClipboard(data.price)}>
								<Ionicons
									size={20}
									name={"copy-outline"}
									style={styles.iconContainer}
								/>
							</Pressable>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
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
	bankTextContainerCol: {
		flex: 1,
		justifyContent: "space-between",
	},
	bankPurpose: {
		fontFamily: "PoppinsRegular",
		fontSize: 14,
	},
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
