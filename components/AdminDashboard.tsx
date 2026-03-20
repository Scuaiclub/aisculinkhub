import React, { useEffect, useState } from 'react';
import { getStats, ClickStat } from '../services/analytics';
import { BackgroundAnimation } from './BackgroundAnimation';

export const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState<ClickStat[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getStats()
            .then(data => {
                setStats(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center bg-background text-text font-body overflow-x-hidden p-8">
            <BackgroundAnimation />
            <div className="relative z-10 w-full max-w-4xl bg-surface/80 backdrop-blur-lg rounded-3xl p-8 border border-border mt-10">
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-6 text-center">
                    Analytics Dashboard
                </h1>

                {loading ? (
                    <div className="text-center text-secondary">Loading stats...</div>
                ) : error ? (
                    <div className="text-center text-red-500">Error: {error}</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-border/50 text-secondary">
                                    <th className="p-4">Link Name</th>
                                    <th className="p-4">URL</th>
                                    <th className="p-4 text-right">Clicks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="p-4 text-center text-muted">No data yet</td>
                                    </tr>
                                ) : (
                                    stats.map((stat, index) => (
                                        <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="p-4 font-medium text-white">{stat.link_text || 'Unknown'}</td>
                                            <td className="p-4 text-sm text-secondary truncate max-w-xs">{stat.url}</td>
                                            <td className="p-4 text-right font-bold text-accent">{stat.count}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="mt-8 text-center">
                    <a href="/" className="text-primary hover:text-accent transition-colors underline">
                        &larr; Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
};
