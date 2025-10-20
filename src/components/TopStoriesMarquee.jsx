import React from "react";
import Marquee from "react-fast-marquee";
import { Megaphone } from "lucide-react";
import { useNews } from "../hooks/useNews";
import { Link } from "react-router-dom";


export default function TopStoriesMarquee() {
    const {
        newsError,
        newsLoading,

        getTopNews,
    } = useNews()
    const topNews = getTopNews();

    if (newsLoading) {
        return (
            <div className="bg-[#1e293b]/80 backdrop-blur-md border-t border-white/10">
                <div className="max-w-7xl mx-auto flex items-center gap-3 px-4 py-5">
                    <div className="flex items-center gap-2 text-sky-400 font-semibold shrink-0">
                        <Megaphone className="h-5 w-5" />
                        <span>Top Stories:</span>
                    </div>
                    <p className="text-white/70 text-sm md:text-base font-medium tracking-wide">
                        Loading top news...
                    </p>
                </div>
            </div>
        );
    }

    if (newsError) {
        return (
            <div className="bg-[#1e293b]/80 backdrop-blur-md border-t border-white/10">
                <div className="max-w-7xl mx-auto flex items-center gap-3 px-4 py-5">
                    <div className="flex items-center gap-2 text-sky-400 font-semibold shrink-0">
                        <Megaphone className="h-5 w-5" />
                        <span>Top Stories:</span>
                    </div>
                    <p className="text-red-400 text-sm md:text-base font-medium tracking-wide">
                        Failed to load top news
                    </p>
                </div>
            </div>
        );
    }

    // Render marquee with top news titles
    return (
        <div className="bg-[#1e293b]/80 backdrop-blur-md border-t border-white/10">
            <div className="max-w-7xl mx-auto flex items-center gap-3 px-4 py-5">
                <div className="flex items-center gap-2 text-sky-400 font-semibold shrink-0">
                    <Megaphone className="h-5 w-5" />
                    <span>Top Stories:</span>
                </div>
                <Marquee
                    speed={60}
                    gradient={false}
                    pauseOnHover={true}
                    className="text-white/90 text-sm md:text-base font-medium tracking-wide"
                >
                    {topNews.map((newsItem, index) => (
                        <Link key={index} to={`/news/${newsItem?.id}`}>
                        <span key={newsItem.id}>
                            📰 {newsItem.title} —
                        </span>
                        </Link>
                    ))}
                </Marquee>
            </div>
        </div>
    );
}
