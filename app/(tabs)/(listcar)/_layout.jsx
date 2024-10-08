import { Stack } from "expo-router";

export default function LictCarLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}>
			<Stack.Screen name="index" />
			<Stack.Screen name="details/[id]" />
		</Stack>
	);
}
