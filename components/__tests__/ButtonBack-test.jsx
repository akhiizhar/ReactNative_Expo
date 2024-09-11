import * as React from "react";
import renderer from "react-test-renderer";
import { NavigationContainer } from "@react-navigation/native";
import ButtonBack from "../ButtonBack";

it(`renders correctly`, () => {
	const tree = renderer
		.create(
			<NavigationContainer>
				<ButtonBack>Snapshot test!</ButtonBack>
			</NavigationContainer>
		)
		.toJSON();

	expect(tree).toMatchSnapshot();
});
