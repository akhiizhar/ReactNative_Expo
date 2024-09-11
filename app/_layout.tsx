import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import * as SecureStore from "expo-secure-store";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import crashlytics from "@react-native-firebase/crashlytics";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function getUser() {
	// SecureStore.deleteItemAsync("user");
	return SecureStore.getItem("user");
}
export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
		PoppinsRegular: require("@/assets/fonts/Poppins-Regular.ttf"),
		PoppinsBold: require("@/assets/fonts/Poppins-Bold.ttf"),
	});

	useEffect(() => {
		crashlytics().log("App started");
		if (loaded) {
			setTimeout(() => {
				if (getUser()) router.replace("../(tabs)");
				console.log(getUser());
			}, 100);
			setTimeout(() => {
				SplashScreen.hideAsync();
			}, 500);
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<Provider store={store}>
				<Stack>
					<Stack.Screen name="(auth)" options={{ headerShown: false }} />
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					<Stack.Screen name="(order)" options={{ headerShown: false }} />
					<Stack.Screen name="+not-found" />
				</Stack>
			</Provider>
		</ThemeProvider>
	);
}
