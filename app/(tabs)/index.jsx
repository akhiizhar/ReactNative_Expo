import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import Constants from "expo-constants";

export default function HomeScreen() {
	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: "#A43333", dark: "#A43333" }}
			headerImage={
				<View style={styles.container}>
					<View>
						<Text style={styles.nama}>Hi, Nama</Text>
						<Text style={styles.location}>Location</Text>
					</View>
					<View>
						<Image
							source={require("@/assets/images/img_photo.png")}
							style={styles.costumer}
						/>
					</View>
				</View>
			}>
			<View style={styles.banner}>
				<View style={styles.bannerContainer}>
					<View style={styles.bannerTextContainer}>
						<Text style={styles.textBanner}>
							Sewa Mobil Berkualitas di kawasanmu
						</Text>
						<TouchableOpacity
							style={styles.button}
							onPress={() => router.navigate("../(tabs)")}>
							<Text
								style={{
									color: "white",
									textAlign: "center",
									fontFamily: "PoppinsBold",
									fontSize: 14,
									padding: 1,
								}}>
								Sewa Mobil
							</Text>
						</TouchableOpacity>
					</View>
					<View>
						<Image source={require("@/assets/images/img_car.png")} />
					</View>
				</View>
			</View>
		</ParallaxScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: Constants.statusBarHeight + 30,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
	},
	nama: {
		fontFamily: "PoppinsBold",
		fontSize: 14,
		color: "white",
	},
	location: {
		fontFamily: "PoppinsBold",
		fontSize: 16,
		color: "white",
	},
	costumer: {
		width: 50,
		height: 50,
	},
	button: {
		padding: 1,
		backgroundColor: "#5CB85F",
		borderRadius: 5,
		marginBottom: 20,
		width: 114,
		height: 28,
	},
	banner: {
		flex: 1,
		// height: 200,
		marginTop: -140,
		backgroundColor: "#AF392F",
		borderRadius: 8,
		overflow: "hidden",
		// marginHorizontal: -10,
	},
	textBanner: {
		fontFamily: "PoppinsRegular",
		fontSize: 14,
		color: "white",
	},
	bannerTextContainer: {
		width: "40%",
		padding: 10,
		paddingBottom: 5,
		paddingTop: 25,
	},
	bannerContainer: {
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "space-between",
	},
});
