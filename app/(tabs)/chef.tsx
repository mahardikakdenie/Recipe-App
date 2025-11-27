// app/chef.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Dimensions,
	StyleSheet,
} from 'react-native';
import { useTheme } from '@/src/context/Theme/ThemeContext';
import { useNavigation } from 'expo-router';
import RestaurantClient from '@/src/api/restaurantClient';

interface IRESTAURANT {
	restaurantID: number;
	restaurantName: string;
	address: string;
	type: string;
	parkingLot: string;
}

const ChefPage = () => {
	const { theme } = useTheme();
	const { width: SCREEN_WIDTH } = Dimensions.get('window');
	const PADDING_HORIZONTAL = 40;
	const GAP = 10;
	const CARD_WIDTH = (SCREEN_WIDTH - PADDING_HORIZONTAL - GAP * 2) / 2;

	const navigation = useNavigation();
	const [restaurants, setRestaurants] = useState<IRESTAURANT[]>([]);

	useLayoutEffect(() => {
		navigation.setOptions({ headerShown: false });
	}, [navigation]);

	const fetchRestaurant = async () => {
		try {
			const data = await RestaurantClient('/');
			setRestaurants(data);
		} catch (error) {
			console.log('error : ', error);
		}
	};

	useEffect(() => {
		fetchRestaurant();
	}, []);

	return (
		<ScrollView
			contentContainerStyle={[
				styles.container,
				{ backgroundColor: theme.colors.background },
			]}
			showsVerticalScrollIndicator={false}>
			<Text
				style={[
					styles.title,
					{ color: theme.colors.text, fontFamily: theme.fonts.bold },
				]}>
				Nearby Restaurants
			</Text>
			<Text
				style={[
					styles.subtitle,
					{
						color: theme.colors.textSecondary,
						fontFamily: theme.fonts.regular,
					},
				]}>
				Explore great places to eat around you
			</Text>

			<View style={styles.grid}>
				{restaurants.map((restaurant) => (
					<TouchableOpacity
						key={restaurant.restaurantID}
						style={[
							styles.card,
							{
								width: CARD_WIDTH,
								backgroundColor: theme.colors.surface,
								// marginLeft:
								// 	restaurant.restaurantID % 3 === 1 ? 0 : GAP,
								// marginRight:
								// 	restaurant.restaurantID % 3 === 0 ? 0 : GAP,
							},
						]}
						onPress={() =>
							console.log(
								'View restaurant:',
								restaurant.restaurantName
							)
						}>
						<View style={styles.content}>
							<View
								style={[
									styles.iconContainer,
									{
										backgroundColor: `${theme.colors.primary}10`,
									},
								]}>
								<Ionicons
									name='location-outline'
									size={18}
									color={theme.colors.primary}
								/>
							</View>
							<Text
								style={[
									styles.name,
									{
										color: theme.colors.text,
										fontFamily: theme.fonts.bold,
									},
								]}
								numberOfLines={1}>
								{restaurant.restaurantName}
							</Text>
							<Text
								style={[
									styles.address,
									{
										color: theme.colors.textSecondary,
										fontFamily: theme.fonts.regular,
									},
								]}
								numberOfLines={2}>
								{restaurant.address}
							</Text>
							<View style={styles.metaRow}>
								<View style={styles.metaItem}>
									<Ionicons
										name='pricetag-outline'
										size={12}
										color={theme.colors.textHint}
									/>
									<Text
										style={[
											styles.metaText,
											{ color: theme.colors.textHint },
										]}>
										{restaurant.type}
									</Text>
								</View>
								<View style={styles.metaItem}>
									<Ionicons
										name={
											restaurant.parkingLot ===
											'Available'
												? 'car-outline'
												: 'car-sport-outline'
										}
										size={12}
										color={theme.colors.textHint}
									/>
									<Text
										style={[
											styles.metaText,
											{ color: theme.colors.textHint },
										]}>
										{restaurant.parkingLot}
									</Text>
								</View>
							</View>
						</View>
					</TouchableOpacity>
				))}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingTop: 40,
		paddingBottom: 80,
	},
	title: {
		fontSize: 28,
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 15,
		marginBottom: 24,
	},
	grid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	card: {
		borderRadius: 20,
		padding: 16,
		marginBottom: 16,
	},
	content: {
		gap: 10,
	},
	iconContainer: {
		width: 20,
		height: 20,
		borderRadius: 18,
		justifyContent: 'center',
		alignItems: 'center',
	},
	name: {
		fontSize: 16,
		lineHeight: 20,
	},
	address: {
		fontSize: 13,
		lineHeight: 18,
	},
	metaRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 4,
	},
	metaItem: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	metaText: {
		fontSize: 11,
	},
});

export default ChefPage;
