import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    carouselContainer: {
        gap: 10,
        paddingHorizontal: 10,
        marginBottom: 8,
    },
    mainCard: {
        backgroundColor: '#E8F5E9',
        borderRadius: 24,
        padding: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#C8E6C9',
    },
    cardContent: {
        flex: 1,
        marginRight: 16,
    },
    badgeHighlight: {
        alignSelf: 'flex-start',
        backgroundColor: '#4CAF50',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
    },
    badgeTextSmall: {
        fontSize: 12,
        fontFamily: 'Inter_600SemiBold',
        color: '#FFFFFF',
    },
    cardTitle: {
        fontSize: 20,
        fontFamily: 'Inter_700Bold',
        color: '#1B5E20',
        marginTop: 8,
        marginBottom: 8,
    },
    cardSubtitle: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        color: '#388E3C',
        marginBottom: 20,
    },
    actionButton: {
        backgroundColor: '#66BB6A',
        paddingVertical: 13,
        paddingHorizontal: 28,
        borderRadius: 30,
    },
    actionButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Inter_600SemiBold',
        textAlign: 'center',
    },
    imageWrapper: {
        alignItems: 'flex-end',
    },
    chefImage: {
        width: 100,
        height: 100,
        borderRadius: 24,
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 28,
        gap: 6,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    activeDot: {
        backgroundColor: '#4CAF50',
    },
    inactiveDot: {
        backgroundColor: '#A5D6A7',
    },

});

export default styles;
