const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const trackClick = async (text: string, url: string) => {
    try {
        await fetch(`${API_URL}/track`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text, url }),
        });
    } catch (error) {
        console.error('Failed to track click:', error);
    }
};

export interface ClickStat {
    url: string;
    link_text: string;
    count: number;
}

export const getStats = async (): Promise<ClickStat[]> => {
    const response = await fetch(`${API_URL}/stats`);
    if (!response.ok) {
        throw new Error('Failed to fetch stats');
    }
    return response.json();
};
