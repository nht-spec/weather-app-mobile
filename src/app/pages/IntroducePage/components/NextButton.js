import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

export default function NextButton({ percentage, scrollTo }) {
	const size = 80;
	const strokeWidth = 4;
	const center = size / 2;
	const radius = size / 2 - strokeWidth / 2;
	const circumference = 2 * Math.PI * radius;

	const progressAnimation = useRef(new Animated.Value(0)).current;
	const progressRef = useRef(null);

	const animation = (toValue) => {
		return Animated.timing(progressAnimation, {
			toValue,
			duration: 250,
			useNativeDriver: true,
		}).start();
	};

	useEffect(() => {
		animation(percentage);
	}, [percentage]);

	useEffect(() => {
		progressAnimation.addListener(
			(value) => {
				const strokeDashoffset =
					circumference - (circumference * value.value) / 100;

				if (progressRef?.current) {
					progressRef.current.setNativeProps({
						strokeDashoffset,
					});
				}
			},
			[percentage]
		);

		return () => {
			progressAnimation.removeAllListeners();
		};
	});

	return (
		<View style={styles.container}>
			<Svg width={size} height={size}>
				<G rotation='-90' origin={center}>
					<Circle
						stroke='#BBC5D4'
						cx={center}
						cy={center}
						r={radius}
						strokeWidth={1}
					/>

					<Circle
						stroke='#C23ACC'
						ref={progressRef}
						cx={center}
						cy={center}
						r={radius}
						strokeWidth={strokeWidth}
						strokeDasharray={circumference}
						strokeDashoffset={
							circumference - (circumference * 25) / 100
						}
					></Circle>
				</G>
			</Svg>

			<TouchableOpacity style={styles.button} onPress={scrollTo}>
				<AntDesign name='arrowright' size={18} color='#fff' />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: 680,
	},
	button: {
		backgroundColor: '#2C2D35',
		position: 'absolute',
		width: 53.33,
		height: 53.33,
		padding: 18,
		borderRadius: 100,
	},
});
