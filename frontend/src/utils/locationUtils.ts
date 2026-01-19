export const getLocationTypeDetails = (type: string) => {
    switch (type?.toLowerCase()) {
        case 'library': 
            return { icon: '📖', label: 'Library', color: '#10b981' }; // emerald-500
        case 'lecture_hall': 
            return { icon: '🎓', label: 'Lecture Hall', color: '#3b82f6' }; // blue-500
        case 'hostel': 
            return { icon: '🏠', label: 'Hostel', color: '#f59e0b' }; // amber-500
        case 'facility': 
            return { icon: '🏢', label: 'Facility', color: '#6366f1' }; // indigo-500
        case 'canteen': 
            return { icon: '🍴', label: 'Canteen', color: '#ef4444' }; // red-500
        case 'printer': 
            return { icon: '🖨️', label: 'Printer', color: '#8b5cf6' }; // violet-500
        default: 
            return { icon: '📍', label: 'Location', color: '#ef4444' };
    }
};
