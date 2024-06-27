"use client";
// pages/admin/articles.js

import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '@/app/sidebar/page';
import '../../../styles/globals.css';

const OwnerArticlePage = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Token not found. Please login.');
                    return;
                }
    
                const axiosConfig = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
    
                console.log('Fetching articles...');
                const response = await axios.get('http://103.164.54.252:8000/api/articles', axiosConfig);
                console.log('Articles response:', response.data.data); // Access 'data' array
                setArticles(response.data.data); // Set 'data' array to state
            } catch (error) {
                console.error('Error fetching articles:', error.response || error.message);
                setArticles([]); // Handle error by setting articles to an empty array
            }
        };
    
        fetchArticles();
    }, []);
    
    

    return (
        <div className='flex'>
            <Sidebar />
            <div className='p-9'>
                <h1 className='text-3xl text-center pb-16'>Admin Dashboard</h1>
                {Array.isArray(articles) && articles.map((article, index) => (
    <div key={index}>
        <div className='border border-white p-4 rounded-md text-sm text-white'>
            {article.description.length > 100 ? `${article.description.slice(0, 100)}..` : article.description}
        </div>
        <p className='text-blue-500 text-center text-base mt-4'>{article.title}</p>
    </div>
))}

            </div>
        </div>
    );
}

export default OwnerArticlePage;



