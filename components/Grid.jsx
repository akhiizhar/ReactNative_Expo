import { View, StyleSheet } from "react-native";
import React from "react";

export function Container({ style, children }) {
	return <View style={{ ...styles.container, style }}>{children}</View>;
}
export function Row({ alignItems, justifyContent, children, style, gap = 0 }) {
	return (
		<View
			style={{
				...styles.row, // ...style adalah spreeadsheet, menggabungkan 2 object, atau bisa dicostum untuk nantinya
				alignItems: alignItems ? alignItems : "baseline",
				justifyContent: justifyContent ? justifyContent : "flex-start",
				gap: gap,
				...style,
			}}>
			{children}
		</View>
	);
}
export function Col({ style, children }) {
	return <View style={style}>{children}</View>;
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
	},
	row: {
		flexDirection: "row",
	},
});
