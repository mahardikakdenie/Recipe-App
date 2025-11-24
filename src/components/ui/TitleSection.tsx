import { useTheme } from '@/src/context/Theme/ThemeContext';
import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

interface TitleSectionProps {
    title: string;
    buttonTitle: string;
    onPress: () => void;
    paddingHorizontal?: number;
}

const TitleSection = ({ title, buttonTitle, onPress, paddingHorizontal = 24 }: TitleSectionProps) => {
    const { theme } = useTheme();
    return (
        <View style={{
            ...styles.sectionHeader,
            paddingHorizontal,
        }}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: theme.fonts.bold }]}>
                {title}
            </Text>
            <TouchableOpacity onPress={() => console.log('See All pressed')}>
                <Text style={[styles.seeAllText, { color: theme.colors.primaryLight, fontFamily: theme.fonts.medium }]}>
                    {buttonTitle}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default TitleSection;

const styles = StyleSheet.create({
    sectionHeader: {
        // paddingHorizontal: 24,
        marginVertical: 28,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    sectionTitle: {
        fontSize: 22,
    },
    seeAllText: {
        fontSize: 14,
    },
});
