import { Animated, StyleSheet, useWindowDimensions, View } from 'react-native';

export default function Paginator({ data, scrollX }) {
	const { width } = useWindowDimensions();
	return (
		<View
			style={{
				flexDirection: 'row',
				width: 47,
				position: 'absolute',
				top: '54%',
				width: '100%',
				justifyContent: 'center',
			}}
		>
			{data.map((_, i) => {
				const inputRange = [
					(i - 1) * width,
					i * width,
					(i + 1) * width,
				];

				const dotWidth = scrollX.interpolate({
					inputRange,
					outputRange: [10, 20, 10],
					extrapolate: 'clamp',
				});

				const backgroundColor = scrollX.interpolate({
					inputRange,
					outputRange: [
						'rgb(255,255,255)',
						'rgb(10,10,34)',
						'rgb(255,255,255)',
					],
					extrapolate: 'clamp',
				});

				return (
					<Animated.View
						style={[
							styles.dot,
							{
								width: dotWidth,
								backgroundColor,
							},
						]}
						key={i.toString()}
					/>
				);
			})}
		</View>
	);
}
const styles = StyleSheet.create({
	dot: {
		height: 10,
		borderRadius: 5,
		backgroundColor: '#0A0A22',
		marginHorizontal: 3,
	},
});
