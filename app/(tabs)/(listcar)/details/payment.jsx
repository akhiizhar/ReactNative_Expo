import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TextInput,
	TouchableOpacity,
	Button,
} from "react-native";
import React, { useState } from "react";
import ButtonBack from "@/components/ButtonBack";
import CarList from "@/components/CarList";
import { useSelector, useDispatch } from "react-redux";
import {
	getCarDetail,
	selectCarDetail,
} from "@/redux/reducers/car/carDetailsSlice";
import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";

const formatCurrency = new Intl.NumberFormat("id-ID", {
	style: "currency",
	currency: "IDR",
});

const selectBank = [
	{ key: 1, bank: "BCA", purpose: "BCA Transfer" },
	{ key: 2, bank: "BNI", purpose: "BNI Transfer" },
	{ key: 3, bank: "Mandiri", purpose: "Mandiri Transfer" },
];

export default function payment() {
	const { data } = useSelector(selectCarDetail);
	const [promoCode, setPromoCode] = useState("");

	return (
		<>
			<View style={styles.header}>
				<ButtonBack />
				<Text style={styles.capacityText}>Pembayaran</Text>
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
				<View style={{ marginHorizontal: 5 }}>
					{selectBank.map((bank) => (
						<>
							<View
								key={bank.key}
								style={{
									borderWidth: 1,
									borderColor: "#000",
									padding: 10,
									borderRadius: 5,
									marginBottom: 10,
									flexDirection: "row",
									// justifyContent: "space-between",
								}}>
								<Text style={{ fontWeight: "bold" }}>{bank.bank}</Text>
							</View>
							<View>
								<Text>{bank.purpose}</Text>
							</View>
						</>
					))}
				</View>
				{/* <View style={{ flexDirection: "row" }}>
					<View style={styles.promoContainer}>
						{selectBank.map(() => {
							return <Text>{selectBank.bank}</Text>;
						})}
					</View>
					<View>
						{selectBank.map((selectBank) => {
							return <Text key={selectBank.id}>{selectBank.purpose}</Text>;
						})}
					</View>
				</View> */}

				<View style={styles.containerBank}>
					<View style={styles.promoContainer}>
						<Text style={styles.promoTitle}>% Pakai Kode Promo</Text>
						<View style={styles.promoInputContainer}>
							<TextInput
								style={styles.promoInput}
								placeholder="Tulis catatanmu di sini"
								value={promoCode}
								onChangeText={setPromoCode}
							/>
							<TouchableOpacity style={styles.applyButton}>
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
	},
	textPayment: {
		marginTop: 20,
		marginHorizontal: 20,
	},
	container: {
		marginTop: 20,
		// marginHorizontal: 10,
	},
	containerCard: {
		marginTop: 20,
		padding: 15,
		backgroundColor: "#F5F5F5",
		borderRadius: 10,
		borderWidth: 1, // Menambahkan border
		borderColor: "#000",
	},
	separator: {
		height: 1,
		backgroundColor: "#000",
		marginVertical: 10,
	},
	promoContainer: {
		marginTop: 20,
		padding: 15,
		backgroundColor: "#F5F5F5",
		borderRadius: 10,
		borderWidth: 1, // Menambahkan border
		borderColor: "#000",
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
		marginRight: 10,
	},
	applyButton: {
		backgroundColor: "#DFF2E0",
		padding: 10,
		borderRadius: 5,
	},
	applyButtonText: {
		color: "#6ABF4B",
		fontFamily: "PoppinsBold",
	},
	containerBank: {
		marginTop: 20,
		marginHorizontal: 20,
	},
	price: {
		fontFamily: "PoppinsBold",
		fontSize: 16,
		marginBottom: 20,
	},
	footer: {
		backgroundColor: "#eeeeee",
		position: "fixed",
		width: "100%",
		bottom: 0,
		padding: 20,
	},
});
