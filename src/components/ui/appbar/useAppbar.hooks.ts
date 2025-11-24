import { useAuth } from "@/src/context/Auth/AuthContext";
import { usePathname } from "expo-router";
import { useMemo } from "react";

const useAppBarHooks = () => {

    const { user } = useAuth();
    const path: string = usePathname();
    const isSearhPage = useMemo(() => {
        return path === '/search'
    }, [path]);

    const username = useMemo(() => user?.email.split('@')[0], [user?.email])

    const getMomentGreting = useMemo(() => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return 'Good Morning';
        if (hour >= 12 && hour < 19) return 'Good Afternoon';
        if (hour < 19) return 'Good Evening';
        return 'Good Night';
    }, [])
    const getGreeting = () => {
        return isSearhPage ? `Helo ${username} ${getMomentGreting}` : getMomentGreting;
    };

    const getCurrentDate = () => {
        return new Date().toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const savedCount = 10;
    const greeting = getGreeting();
    const currentDate = getCurrentDate();

    return {
        savedCount,
        greeting,
        currentDate,
        user,
        path,
        isSearhPage,
    }
};

export default useAppBarHooks;
