const useAppBarHooks = () => {
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return 'Good Morning';
        if (hour >= 12 && hour < 19) return 'Good Afternoon';
        if (hour < 19) return 'Good Evening';
        return 'Good Night';
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
    }
};

export default useAppBarHooks;
