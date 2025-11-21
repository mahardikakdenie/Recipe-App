import { useState } from "react";
import { useWindowDimensions } from "react-native";

const summaries = [
    {
        id: '1',
        badge: '✨ Discover More',
        title: 'Explore Tasty Recipes',
        subtitle: 'Discover delicious meals crafted just for you.',
        buttonText: 'Explore Recipes',
        image: 'https://img.freepik.com/premium-vector/gourmet-food-vector-graphics-illustration-eps-source-file-format-lossless-scaling-icon-design_1041447-110697.jpg?w=1480',
    },
    {
        id: '2',
        badge: '🔥 Popular This Week',
        title: 'Quick & Easy Dinners',
        subtitle: 'Ready in under 30 minutes — perfect for busy days.',
        buttonText: 'View Recipes',
        image: 'https://cdn-icons-png.freepik.com/512/3135/3135715.png',
    },
    {
        id: '3',
        badge: '🌿 Healthy Picks',
        title: 'Nourish Your Body',
        subtitle: 'Fresh, balanced meals for a healthier lifestyle.',
        buttonText: 'See Healthy Options',
        image: 'https://cdn-icons-png.freepik.com/512/6331/6331224.png',
    },
];


const useSummaryCardHooks = () => {

    const { width } = useWindowDimensions();
    const [activeIndex, setActiveIndex] = useState(0);

    return {
        width,
        activeIndex,
        setActiveIndex,
        summaries,
    }
};

export default useSummaryCardHooks;
