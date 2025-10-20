import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNews } from "../hooks/useNews";
import Loader from "../components/Loader";
import NewsCard from "../components/NewsCard";

const CategoryPage = () => {
    const { id } = useParams();
    const { news, newsLoading, getNewsByCategory, categories } = useNews();
    

    const [categoryNews, setCategoryNews] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        setLoading(true);

        // Simulate 1s loading
        setTimeout(() => {
            if (id== 0) {
                setCategoryNews(news)
            } else {
                const filteredNews = getNewsByCategory(id)
                console.log(filteredNews,'thsi is filtred news based on catgorfy id')
                

                setCategoryNews(filteredNews);
            }
            setLoading(false);
        }, 1000);
    }, [id, news]);
    console.log(categoryNews,'thsi is the news')

    if (newsLoading || loading) return <Loader />;

    return (
        <div className="space-y-6">
          
            {categoryNews.length === 0 ? (
                <p className="text-center text-gray-500">No news found in this category.</p>
            ) : (
                categoryNews.map((newsItem) => (
                    <Link to={`/news/${newsItem?.id}`}>
                    <NewsCard key={newsItem.id} news={newsItem} />
                    </Link>
                ))
            )}
        </div>
    );
};

export default CategoryPage;
