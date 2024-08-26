import { Text, StyleSheet, Image, Pressable, style } from "react-native";
import React from "react";
import { Col, Row } from "@/components/Grid";
import Ionicons from "@expo/vector-icons/Ionicons";

const formatCurrency = new Intl.NumberFormat("id-ID", {
	style: "currency",
	currency: "IDR",
});
export default function CarList({
	onPress,
	image,
	carName,
	passenger,
	baggage,
	price,
}) {
	return (
		<Pressable style={{ ...styles.card, ...style }} onPress={onPress}>
			<Row alignItems={"center"} gap={15}>
				<Col>
					<Image style={styles.img} source={image} />
				</Col>
				<Col>
					<Text style={styles.carName}>{carName}</Text>
					<Row>
						<Col style={styles.textIcon}>
							<Ionicons size={24} name={"people-outline"} color={"#8A8A8A"} />
							<Text style={styles.capacityText}>{passenger}</Text>
						</Col>
						<Col style={styles.textIcon}>
							<Ionicons size={24} name={"bag-outline"} color={"#8A8A8A"} />
							<Text style={styles.capacityText}>{baggage}</Text>
						</Col>
					</Row>
					<Text style={styles.price}>{formatCurrency.format(price)}</Text>
				</Col>
			</Row>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	card: {
		borderColor: "rgba(0,0,0,0.2)",
		borderWidth: 0.5,
		borderRadius: 4,
		padding: 5,
		marginBottom: 20,
		marginVertical: 20,
		marginHorizontal: 20,
	},
	img: {
		width: 80,
		height: 80,
		// marginTop: 0,
		// marginLeft: 15,
		margin: 5,
		objectFit: "contain",
	},
	carName: {
		fontSize: 16,
		marginTop: 20,
		fontFamily: "PoppinsRegular",
	},
	capacityText: {
		color: "#8A8A8A",
		fontSize: 16,
		fontFamily: "PoppinsBold",
	},
	price: {
		color: "#5CB85F",
		marginBottom: 20,
		marginTop: 10,
		fontSize: 16,
		fontFamily: "PoppinsRegular",
	},
	textIcon: {
		flexDirection: "row",
		alignItems: "center",
		gap: 2,
		margin: 5,
	},
});
