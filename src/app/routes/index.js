import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Introduce from '../pages/IntroducePage/Introduce';

const Stack = createNativeStackNavigator();
export default function RouteApp() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name='InTro' component={Introduce} />
		</Stack.Navigator>
	);
}
