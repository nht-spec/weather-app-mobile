import { useFonts } from 'expo-font';
import React, { useEffect } from 'react';
import {
	Image,
	StyleSheet,
	Text,
	useWindowDimensions,
	View,
} from 'react-native';

export default function OnBoardingItem({ item, titleText }) {
	const { width } = useWindowDimensions();

	useEffect(() => {
		titleText && titleText(item.title);
	}, [item]);

	let [fontsLoaded] = useFonts({
		'Poppins-SemiBold': require('../../../../asset/fonts/Poppins-SemiBold.ttf'),
		'Poppins-Regular': require('../../../../asset/fonts/Poppins-Regular.ttf'),
	});
	if (!fontsLoaded) {
		return <Text>Loading</Text>;
	}

	return (
		<View style={styles.container}>
			<Image
				style={[styles.image, { width, resizeMode: 'contain' }]}
				source={item.image}
			/>

			<View style={styles.infoText}>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.desc}>{item.description}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
	},

	image: {
		justifyContent: 'center',
		marginTop: 43,
		width: 300,
		height: 300,
	},

	infoText: {
		paddingTop: 157,
	},
	title: {
		textAlign: 'center',
		fontFamily: 'Poppins-SemiBold',
		color: '#0A0A22',
		width: 236,
		fontSize: 28,
		lineHeight: 33,
		paddingBottom: 21,
	},
	desc: {
		fontFamily: 'Poppins-Regular',
		textAlign: 'center',
		color: '#8B95A2',
		width: 218,
		fontSize: 16,
		lineHeight: 24,
	},
});
