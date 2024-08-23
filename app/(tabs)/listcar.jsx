import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import CarList from "@/components/CarList";

export default function listcar() {
	const [cars, setCars] = useState([]);

	useEffect(() => {
		const getData = async () => {
			const response = await fetch(
				"http://api-car-rental.binaracademy.org/customer/car"
			);
			const body = await response.json();
			setCars(body);
		};
		getData();
	}, []);
	const renderItem = ({ item }) => (
		<CarList
			image={{ uri: item.image }}
			carName={item.name}
			passenger={5}
			baggage={4}
			price={item.price}
		/>
	);

	return (
		<View style={{ marginHorizontal: 30 }}>
			<Text style={styles.textDaftar}>Daftar Mobil</Text>
			{cars.length > 0 && (
				<FlatList
					data={cars}
					renderItem={renderItem}
					keyExtractor={(item) => item.id.toString()}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	textDaftar: {
		marginTop: 40,
		marginBottom: 5,
		fontFamily: "PoppinsBold",
		fontSize: 14,
	},
});
