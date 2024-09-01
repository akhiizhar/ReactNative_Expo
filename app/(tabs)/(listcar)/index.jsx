import {
	StyleSheet,
	FlatList,
	View,
	Text,
	ActivityIndicator,
} from "react-native";
import { useEffect } from "react";
import CarList from "../../../components/CarList";
import { router } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { getCar, selectCar } from "@/redux/reducers/car/carSlice";

export default function listcar() {
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
		<View style={{ backgroundColor: "#fff" }}>
			<Text style={styles.textDaftar}>Daftar Mobil</Text>
			<FlatList
				style={styles.container}
				// loading={isLoading}
				data={data}
				keyExtractor={(item) => item.id.toString()}
				ListEmptyComponent={
					isLoading ? (
						<ActivityIndicator
							style={{ marginTop: 30 }}
							animating={true}
							size="large"
							color="#00ff00"
						/>
					) : (
						<View>
							<Text>0 results</Text>
						</View>
					)
				}
				renderItem={({ item }) => (
					<CarList
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
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		// paddingTop: Constants.statusBarHeight,
		// paddingHorizontal: 20,
		backgroundColor: "#fff",
	},
	title: {
		fontFamily: "PoppinsBold",
		fontSize: 16,
		marginBottom: 15,
	},
	textDaftar: {
		marginTop: 40,
		marginBottom: 5,
		fontFamily: "PoppinsBold",
		fontSize: 16,
		paddingHorizontal: 20,
	},
});

// Make it self
// export default function listcar() {
// 	const [cars, setCars] = useState([]);

// 	useEffect(() => {
// 		const getData = async () => {
// 			const response = await fetch(
// 				"http://api-car-rental.binaracademy.org/customer/car"
// 			);
// 			const body = await response.json();
// 			setCars(body);
// 		};
// 		getData();
// 	}, []);
// 	const renderItem = ({ item }) => (
// 		<CarList
// 			image={{ uri: item.image }}
// 			carName={item.name}
// 			passenger={5}
// 			baggage={4}
// 			price={item.price}
// 		/>
// 	);

// 	return (
// 		<View style={{ marginHorizontal: 30 }}>
// 			<Text style={styles.textDaftar}>Daftar Mobil</Text>
// 			{cars.length > 0 && (
// 				<FlatList
// 					data={cars}
// 					renderItem={renderItem}
// 					keyExtractor={(item) => item.id.toString()}
// 				/>
// 			)}
// 		</View>
// 	);
// }

// const styles = StyleSheet.create({
// 	textDaftar: {
// 		marginTop: 40,
// 		marginBottom: 5,
// 		fontFamily: "PoppinsBold",
// 		fontSize: 16,
// 	},
// });
