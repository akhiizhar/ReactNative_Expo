import { Image, StyleSheet, View, Text, Button } from "react-native";
import ParallaxFlatList from "@/components/ParallaxFlatList";
import Constants from "expo-constants";
import { Col, Row } from "../../components/Grid";
import ButtonIcon from "../../components/ButtonIcon";
import CarList from "../../components/CarList";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { getCar, selectCar } from "@/redux/reducers/car/carSlice";
import * as SecureStore from "expo-secure-store";

export default function HomeScreen() {
	const [user, setUser] = useState("");

	useEffect(() => {
		const getEmail = async () => {
			try {
				const userData = await SecureStore.getItemAsync("user");
				if (userData) {
					const parsedEmail = JSON.parse(userData);
					console.log("User data:", parsedEmail);
					setUser(parsedEmail);
				}
			} catch (error) {
				console.error("Failed to fetch email from SecureStore:", error);
			}
		};

		getEmail();
	}, []);

	const { data, isLoading } = useSelector(selectCar);
	const dispatch = useDispatch();

	useEffect(() => {
		const controller = new AbortController(); // UseEffect cleanup untuk menghindari memory Leak
		const signal = controller.signal; // UseEffect cleanup

		dispatch(getCar(signal));

		return () => {
			// cancel request sebelum component di close
			controller.abort();
		};
	}, []);

	return (
		<ParallaxFlatList
			headerBackgroundColor={{ light: "#A43333", dark: "#A43333" }}
			headerImage={
				<View style={styles.container}>
					<View>
						<Text style={styles.titleText}>Hi, {user.email}</Text>
						<Text style={styles.titleText}>Location</Text>
					</View>
					<View>
						<Image
							style={styles.imageProfile}
							source={require("@/assets/images/img_photo.png")}
						/>
					</View>
				</View>
			}
			banner={
				<>
					<View style={styles.banner}>
						<View style={styles.bannerContainer}>
							<View style={styles.bannerTextContainer}>
								<Text style={styles.bannerText}>
									Sewa Mobil Berkualitas di kawasanmu
								</Text>
								<Button color="#5CB85F" title="Sewa Mobil" />
							</View>
							<View>
								<Image source={require("@/assets/images/img_car.png")} />
							</View>
						</View>
					</View>
					<View>
						<Row justifyContent={"space-between"}>
							<Col>
								<ButtonIcon
									text={"Sewa Mobil"}
									name={"car-outline"}
									color={"#ffffff"}
								/>
							</Col>
							<Col>
								<ButtonIcon
									text={"Oleh-Oleh"}
									name={"cube-outline"}
									color={"#ffffff"}
								/>
							</Col>
							<Col>
								<ButtonIcon
									text={"Penginapan"}
									name={"key-outline"}
									color={"#ffffff"}
								/>
							</Col>
							<Col>
								<ButtonIcon
									text={"Wisata"}
									name={"camera-outline"}
									color={"#ffffff"}
								/>
							</Col>
						</Row>
					</View>
					<Text style={styles.textDaftar}>Daftar Mobil Pilihan</Text>
				</>
			}
			loading={isLoading}
			data={data}
			keyExtractor={(item) => item.id.toString()}
			renderItem={({ item }) => (
				<CarList
					style={{ marginVertical: 20, padding: 20 }}
					key={item.id}
					image={{ uri: item.image }}
					carName={item.name}
					passenger={5}
					baggage={4}
					price={item.price}
					onPress={() => router.navigate("(listcar)/details/" + item.id)}
				/>
			)}
			viewabilityConfig={{
				waitForInteraction: true,
			}}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: Constants.statusBarHeight,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
	},
	titleText: {
		color: "#ffffff",
		fontFamily: "PoppinsBold",
	},
	imageProfile: {
		height: 35,
		width: 35,
	},
	banner: {
		backgroundColor: "#AF392F",
		marginTop: -100,
		overflow: "hidden",
		borderRadius: 5,
	},
	bannerContainer: {
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "space-between",
	},
	bannerTextContainer: {
		width: "45%",
		padding: 15,
	},
	bannerText: {
		color: "#ffffff",
		fontFamily: "PoppinsRegular",
		fontSize: 16,
	},
	textDaftar: {
		marginBottom: 5,
		fontFamily: "PoppinsBold",
		fontSize: 14,
	},
});

// import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
// import ParallaxScrollView from "@/components/ParallaxScrollView";
// import Constants from "expo-constants";
// import { ThemedView } from "@/components/ThemedView";
// // import { Ionicons } from "@expo/vector-icons";
// import { Col, Row } from "@/components/Grid";
// import ButtonIcon from "@/components/ButtonIcon";
// import CarList from "@/components/CarList";
// import { useState, useEffect } from "react";

// export default function HomeScreen() {
// 	const [cars, setCars] = useState([]);

// 	useEffect(() => {
// 		const getData = async () => {
// 			const response = await fetch(
// 				"http://api-car-rental.binaracademy.org/customer/car"
// 			);
// 			const body = await response.json();
// 			setCars(body);
// 			console.log(cars, body);
// 		};
// 		getData();
// 	}, []);

// 	return (
// 		<ParallaxScrollView
// 			headerBackgroundColor={{ light: "#A43333", dark: "#A43333" }}
// 			headerImage={
// 				<View style={styles.container}>
// 					<View>
// 						<Text style={styles.nama}>Hi, Nama</Text>
// 						<Text style={styles.location}>Location</Text>
// 					</View>
// 					<View>
// 						<Image
// 							source={require("@/assets/images/img_photo.png")}
// 							style={styles.costumer}
// 						/>
// 					</View>
// 				</View>
// 			}>
// 			<ThemedView>
// 				<View style={styles.banner}>
// 					<View style={styles.bannerContainer}>
// 						<View style={styles.bannerTextContainer}>
// 							<Text style={styles.textBanner}>
// 								Sewa Mobil Berkualitas di kawasanmu
// 							</Text>
// 							<TouchableOpacity
// 								style={styles.button}
// 								onPress={() => router.navigate("../(tabs)")}>
// 								<Text
// 									style={{
// 										color: "white",
// 										textAlign: "center",
// 										fontFamily: "PoppinsBold",
// 										fontSize: 14,
// 										padding: 1,
// 									}}>
// 									Sewa Mobil
// 								</Text>
// 							</TouchableOpacity>
// 						</View>
// 						<View>
// 							<Image source={require("@/assets/images/img_car.png")} />
// 						</View>
// 					</View>
// 				</View>
// 			</ThemedView>
// 			<View>
// 				<Row justifyContent={"space-between"}>
// 					<Col>
// 						<ButtonIcon name={"car-outline"} color={"white"} />
// 					</Col>
// 					<Col>
// 						<ButtonIcon name={"cube-outline"} color={"white"} />
// 					</Col>
// 					<Col>
// 						<ButtonIcon name={"key-outline"} color={"white"} />
// 					</Col>
// 					<Col>
// 						<ButtonIcon name={"camera-outline"} color={"white"} />
// 					</Col>
// 				</Row>
// 			</View>
// 			<View>
// 				<Text style={styles.textDaftar}>Daftar Mobil Pilihan</Text>
// 				{cars.length > 0 &&
// 					cars.map((el) => (
// 						<CarList
// 							key={el.id}
// 							image={{ uri: el.image }}
// 							carName={el.name}
// 							passenger={5}
// 							baggage={4}
// 							price={el.price}
// 						/>
// 					))}
// 			</View>

// 			{/* <ThemedView>
// 				<View style={styles.boxIcon}>
// 					<View style={styles.sizeIcon}>
// 						<Ionicons style={styles.icon} size={40} name="car-outline" />
// 						<Text>Sewa Mobil</Text>
// 					</View>
// 					<View style={styles.sizeIcon}>
// 						<Ionicons style={styles.icon} size={40} name="cube-outline" />
// 						<Text style={styles.textIcon}>Oleh-oleh</Text>
// 					</View>
// 					<View style={styles.sizeIcon}>
// 						<Ionicons style={styles.icon} size={40} name="key-outline" />
// 						<Text>Penginapan</Text>
// 					</View>
// 					<View style={styles.sizeIcon}>
// 						<Ionicons style={styles.icon} size={40} name="camera-outline" />
// 						<Text>Wisata</Text>
// 					</View>
// 				</View>
// 			</ThemedView> */}
// 		</ParallaxScrollView>
// 	);
// }

// const styles = StyleSheet.create({
// 	container: {
// 		marginTop: Constants.statusBarHeight + 30,
// 		flexDirection: "row",
// 		alignItems: "center",
// 		justifyContent: "space-between",
// 		paddingHorizontal: 20,
// 	},
// 	nama: {
// 		fontFamily: "PoppinsBold",
// 		fontSize: 14,
// 		color: "white",
// 	},
// 	location: {
// 		fontFamily: "PoppinsBold",
// 		fontSize: 16,
// 		color: "white",
// 	},
// 	costumer: {
// 		width: 50,
// 		height: 50,
// 	},
// 	button: {
// 		padding: 1,
// 		backgroundColor: "#5CB85F",
// 		borderRadius: 5,
// 		marginBottom: 20,
// 		width: 114,
// 		height: 28,
// 	},
// 	banner: {
// 		flex: 1,
// 		// height: 200,
// 		marginTop: -140,
// 		backgroundColor: "#AF392F",
// 		borderRadius: 8,
// 		overflow: "hidden",
// 		// marginHorizontal: -10,
// 	},
// 	textBanner: {
// 		fontFamily: "PoppinsRegular",
// 		fontSize: 14,
// 		color: "white",
// 	},
// 	bannerTextContainer: {
// 		width: "40%",
// 		padding: 10,
// 		paddingBottom: 5,
// 		paddingTop: 25,
// 	},
// 	bannerContainer: {
// 		flexDirection: "row",
// 		alignItems: "flex-end",
// 		justifyContent: "space-between",
// 	},
// 	boxContainer: {
// 		flexDirection: "row",
// 		alignItems: "flex-end",
// 		justifyContent: "space-between",
// 	},
// 	boxIcon: {
// 		flexDirection: "row",
// 		gap: 40,
// 		marginTop: 20,
// 		width: 56,
// 		height: 56,
// 		borderRadius: 8,
// 	},
// 	sizeIcon: {
// 		paddingHorizontal: 8,
// 		paddingVertical: 8,

// 		backgroundColor: "#AF392F",
// 		borderRadius: 8,
// 	},
// 	icon: {
// 		color: "#FFFF",
// 	},
// 	textIcon: {
// 		fontFamily: "PoppinsBold",
// 		fontSize: 12,
// 		textAlign: "center",
// 		marginTop: 10,
// 		// paddingBottom: 3,
// 	},
// 	textDaftar: {
// 		marginBottom: 5,
// 		fontFamily: "PoppinsBold",
// 		fontSize: 14,
// 	},
// });
