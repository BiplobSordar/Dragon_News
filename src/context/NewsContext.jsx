import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const NewsContext = createContext();


export const NewsProvider = ({ children }) => {
    const [news, setNews] = useState([]);
    const [categories, setCategories] = useState([]);

 
    const [newsLoading, setNewsLoading] = useState(true);
    const [categoriesLoading, setCategoriesLoading] = useState(true);

    const [newsError, setNewsError] = useState(null);
    const [categoriesError, setCategoriesError] = useState(null);

    useEffect(() => {
       
        setNewsLoading(true);
        setCategoriesLoading(true);
        const fetchNews = async () => {
            setNewsError(null);
            try {
                const res = await axios.get("/news.json");
                setNews(res.data);
            } catch (err) {
                setNewsError("Failed to load news");
            } finally {
                setNewsLoading(false);
            }
        };

        const fetchCategories = async () => {
            setCategoriesError(null);
            try {
                const res = await axios.get("/categories.json"); 

                setCategories(res.data);
            } catch (err) {
                setCategoriesError("Failed to load categories");
            } finally {
                setCategoriesLoading(false);
            }
        };

      
        setTimeout(() => {
            fetchNews();
            fetchCategories();
        }, 1000);
    }, []);


    const getTodayPick = () => news.filter((n) => n.others?.is_today_pick);
    const getTrending = () => news.filter((n) => n.others?.is_trending);
    const getTopNews = () => news.filter((n) => n.others?.is_today_pick && n.others?.is_trending);
    const getNewsByCategory = (categoryId) => news.filter((n) => n.category_id === Number(categoryId));
    const getSportNews = () => {
        
        return news.filter((n) => n.category_id === 4);
    };
    const getNewsById = (id) => {
        return news.find((news) => news.id === id);
    };





    return (
        <NewsContext.Provider
            value={{
                news,
                categories,
                newsLoading,
                categoriesLoading,
                newsError,
                categoriesError,
                getSportNews,
                getTodayPick,
                getTrending,
                getTopNews,
                getNewsByCategory,
                getNewsById
            }}
        >
            {children}
        </NewsContext.Provider>
    );
};
