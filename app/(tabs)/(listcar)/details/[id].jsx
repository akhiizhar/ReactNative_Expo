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

import { useSelector, useDispatch } from "react-redux";
import {
	getCarDetail,
	selectCarDetail,
} from "@/redux/reducers/car/carDetailsSlice";

const formatCurrency = new Intl.NumberFormat("id-ID", {
	style: "currency",
	currency: "IDR",
});

const include = [
	{ id: 1, key: "Apa saja yang termasuk dalam paket misal durasi max 12 jam" },
	{ id: 2, key: "Sudah termasuk bensin selama 12 jam" },
	{ id: 3, key: "Sudah termasuk Tiket Wisata" },
	{ id: 4, key: "Sudah termasuk pajak" },
];

const exclude = [
	{ id: 1, key: "Tidak termasuk biaya makan sopir Rp 75.000/hari" },
	{
		id: 2,
		key: "Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp 20.000/jam",
	},
	{ id: 3, key: "Tidak termasuk akomodasi penginapan" },
];
export default function detailScreen() {
	const { id } = useLocalSearchParams();
	const { data, isLoading } = useSelector(selectCarDetail);
	const dispatch = useDispatch();

	useEffect(() => {
		const controller = new AbortController(); // UseEffect cleanup untuk menghindari memory Leak
		const signal = controller.signal; // UseEffect cleanup

		dispatch(getCarDetail({ id, signal }));

		return () => {
			controller.abort();
		};
	}, [id]);

	return (
		<View style={styles.container}>
			<ScrollView>
				<View style={styles.icon}>
					<Text style={{ fontFamily: "PoppinsRegular" }}>{data.name}</Text>
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
					<Image
						loading={isLoading}
						source={{ uri: data.image }}
						style={styles.img}
					/>
				</View>
				<View style={styles.containerText}>
					<Text style={styles.text}>Tentang Paket</Text>
					<View>
						<Text style={styles.text}>Include</Text>
						<View>
							{include.map((include) => {
								return (
									<Text
										key={include.id}
										style={styles.textIsi}>{`\u2022 ${include.key}}`}</Text>
								);
							})}
						</View>
					</View>
					<View>
						<Text style={styles.text}>Exclude</Text>
						<View>
							{exclude.map((exclude) => {
								return (
									<Text
										key={exclude.id}
										style={styles.textIsi}>{`\u2022 ${exclude.key}}`}</Text>
								);
							})}
						</View>
					</View>
				</View>
			</ScrollView>
			<View style={styles.footer}>
				<Text style={styles.price}>{formatCurrency.format(data.price)}</Text>
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
