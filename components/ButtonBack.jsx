import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ButtonBack() {
	const navigation = useNavigation();
	const handleBackPress = () => {
		navigation.goBack();
	};

	return (
		<View style={styles.backButton}>
			<TouchableOpacity onPress={handleBackPress}>
				<Ionicons name="arrow-back-outline" size={24} color="black" />
			</TouchableOpacity>
		</View>
	);
}
const styles = StyleSheet.create({
	backButton: {
		paddingLeft: 20,
		flexDirection: "row",
		justifyContent: "flex-start",
	},
});
