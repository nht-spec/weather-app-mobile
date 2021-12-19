import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import dataList from '../datalist/datalist';
import NextButton from './NextButton';
import OnBoardingItem from './OnBoardingItem';
import Paginator from './Paginator';

export default function OnBoarding() {
	const flatlistRef = useRef();
	const [currentIndex, setCurrentIndex] = useState(0);
	const scrollX = useRef(new Animated.Value(0)).current;

	const viewableItemsChanged = useRef(({ viewableItems }) => {
		setCurrentIndex(viewableItems[0].index);
	}).current;

	const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

	const scrollTo = () => {
		if (currentIndex == dataList.length - 1) return;

		flatlistRef.current?.scrollToIndex({
			animated: true,
			index: currentIndex + 1,
		});
	};

	const Square = ({ scrollX }) => {
		return (
			<LinearGradient
				colors={['#484B5B', '#2C2D35']}
				style={{
					width: '100%',
					height: 500,
					backgroundColor: '#fff',
					position: 'absolute',
				}}
			/>
		);
	};

	const CircleBr = () => {
		return (
			<View
				style={{
					backgroundColor: '#ffffff',
					width: 453,
					height: 600,
					borderRadius: 453 / 2,
					padding: 81,
					left: -39,
					top: 400,
					position: 'absolute',
				}}
			></View>
		);
	};

	return (
		<View style={{ backgroundColor: '#ffffff' }}>
			<Square scrollX={scrollX} />
			<CircleBr />
			<Animated.FlatList
				ref={flatlistRef}
				horizontal
				showsHorizontalScrollIndicator={false}
				pagingEnabled
				data={dataList}
				renderItem={({ item }) => <OnBoardingItem item={item} />}
				bounces={false}
				onScroll={Animated.event(
					[
						{
							nativeEvent: {
								contentOffset: { x: scrollX },
							},
						},
					],
					{
						useNativeDriver: false,
					}
				)}
				scrollEventThrottle={32}
				onViewableItemsChanged={viewableItemsChanged}
				viewabilityConfig={viewConfig}
			/>
			<Paginator data={dataList} scrollX={scrollX} />

			<NextButton
				scrollTo={scrollTo}
				percentage={(currentIndex + 1) * (100 / dataList.length)}
			/>
		</View>
	);
}
