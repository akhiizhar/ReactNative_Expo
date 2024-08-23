import { View, Text, FlatList } from "react-native";
import React from "react";

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

	return (
		<View>
			<Text style={styles.textDaftar}>Daftar Mobil</Text>
			{cars.length > 0 && (
				<FlatList
					cars={cars}
					renderItem={() => (
						<CarList
							key={el.id}
							image={{ uri: el.image }}
							carName={el.name}
							passenger={5}
							baggage={4}
							price={el.price}
						/>
					)}
				/>
			)}
		</View>
	);
}
