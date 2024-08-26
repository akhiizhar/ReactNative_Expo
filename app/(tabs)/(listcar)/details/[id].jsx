import {
	View,
	Text,
	ScrollView,
	Image,
	StyleSheet,
	FlatList,
	Button,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import Constants from "expo-constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Col, Row } from "@/components/Grid";

const formatCurrency = new Intl.NumberFormat("id-ID", {
	style: "currency",
	currency: "IDR",
});

const include = [
	{
		key: "Apa saja yang termasuk dalam paket misal durasi max 12 jam",
	},
	{ key: "Sudah termasuk bensin selama 12 jam" },
	{ key: "Sudah termasuk Tiket Wisata" },
	{ key: "Sudah termasuk pajak" },
];

const exclude = [
	{
		key: "Tidak termasuk biaya makan sopir Rp 75.000/hari",
	},
	{
		key: "Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp 20.000/jam",
	},
	{ key: "Tidak termasuk akomodasi penginapan" },
];
export default function detailScreen() {
	const { id } = useLocalSearchParams();
	const [cars, setCars] = useState({});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const controller = new AbortController(); // UseEffect cleanup untuk menghindari memory Leak
		const signal = controller.signal; // UseEffect cleanup

		setLoading(true); //loading state
		const getData = async () => {
			try {
				const response = await fetch(
					"https://api-car-rental.binaracademy.org/customer/car/" + id,
					{ signal: signal } // UseEffect cleanup
				);
				const body = await response.json();
				setCars(body);
			} catch (e) {
				// Error Handling
				if (err.name === "AbortError") {
					console.log("successfully aborted");
				} else {
					console.log(err);
				}
			}
		};
		getData();
		return () => {
			// cancel request sebelum component di close
			controller.abort();
		};
	}, [id]);

	return (
		<View style={styles.container}>
			<ScrollView>
				<View style={styles.icon}>
					<Text style={{ fontFamily: "PoppinsRegular" }}>{cars.name}</Text>
					<Row style={styles.icon}>
						<Col style={styles.textIcon}>
							<Ionicons size={24} name={"people-outline"} color={"#8A8A8A"} />
							<Text style={styles.capacityText}>{5}</Text>
						</Col>
						<Col style={styles.textIcon}>
							<Ionicons size={24} name={"bag-outline"} color={"#8A8A8A"} />
							<Text style={styles.capacityText}>{4}</Text>
						</Col>
					</Row>
					<Image source={{ uri: cars.image }} style={styles.img} />
				</View>
				<View style={styles.containerText}>
					<Text style={styles.text}>Tentang Paket</Text>
					<View>
						<Text style={styles.text}>Include</Text>
						<View>
							{include.map((includes) => {
								return (
									<Text
										key={includes.index}
										style={styles.textIsi}>{`\u2022 ${includes.key}}`}</Text>
								);
							})}
						</View>
					</View>
					<View>
						<Text style={styles.text}>Exclude</Text>
						<View>
							{exclude.map((excludes) => {
								return (
									<Text
										key={excludes.index}
										style={styles.textIsi}>{`\u2022 ${excludes.key}}`}</Text>
								);
							})}
						</View>
					</View>
				</View>
			</ScrollView>
			<View style={styles.footer}>
				<Text style={styles.price}>{formatCurrency.format(cars.price)}</Text>
				<Button color="#3D7B3F" title="Lanjutkan Pembayaran" />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 50,
	},
	capacityText: {
		color: "#8A8A8A",
		fontSize: 16,
		fontFamily: "PoppinsBold",
	},
	icon: {
		alignItems: "center",
		justifyContent: "center",
	},
	textIcon: {
		flexDirection: "row",
		alignItems: "center",
		gap: 2,
		margin: 5,
	},
	img: {
		width: "100%",
		height: 200,
		borderRadius: 10,
		marginBottom: 20,
		marginTop: 20,
		objectFit: "contain",
	},
	containerText: {
		margin: 15,
		paddingTop: 20,
		paddingHorizontal: 20,
		backgroundColor: "#fff",
		borderRadius: 10,
		shadowColor: "#000",
		shadowRadius: 3,
		shadowOpacity: 0.1,
		shadowOffset: { width: 0, height: 1 },
		// margin: 50,
		// padding: 2,
		// backgroundColor: "#fff",
		// borderRadius: 10,
		// shadowColor: "#000",
		// shadowRadius: 3,
	},
	text: {
		fontFamily: "PoppinsBold",
		fontSize: 16,
	},
	textIsi: {
		fontFamily: "PoppinsBold",
		fontSize: 16,
		color: "#8A8A8A",
		padding: 5,
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
