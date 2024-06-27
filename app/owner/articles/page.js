"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '@/app/sidebar/page';
import Modal from 'react-modal';
import '../../../styles/globals.css';

const OwnerArticlePage = () => {
    const [articles, setArticles] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

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
                console.log('Articles response:', response.data.data);
                setArticles(response.data.data);
            } catch (error) {
                console.error('Error fetching articles:', error.response || error.message);
                setArticles([]);
            }
        };

        fetchArticles();
    }, []);

    const openModal = (article) => {
        setSelectedArticle(article);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedArticle(null);
        setModalIsOpen(false);
    };

    return (
        <div className='flex h-screen'>
            <Sidebar />
            <div className='p-9 flex-grow overflow-y-auto'>
                <h1 className='text-3xl text-center pb-10 font-bold'>Admin Dashboard</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                    {Array.isArray(articles) && articles.map((article, index) => (
                        <div key={index} className='group'>
                            <div
                                className='shadow-lg p-4 rounded-md text-base text-black cursor-pointer mt-6 transition-transform transform group-hover:scale-105'
                                onClick={() => openModal(article)}
                            >
                                <p>{article.description.length > 100 ? `${article.description.slice(0, 148)}...` : article.description}</p>
                                <hr className='border-t border-gray-300 my-4'/>
                                <p className='text-blue-700 hover:text-blue-900 text-[13.5px] mt-4 cursor-pointer'>{article.title}</p>
                            </div>
                        </div>
                    ))}
                </div>

                
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Selected Article"
                    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 max-w-xl mx-auto rounded-md shadow-lg overflow-y-auto w-[100vw] h-96"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50"
                >
                    <div className="flex flex-col h-full">
                        <h2 className="text-xl font-bold mb-4 text-black">Judul Artikel: {selectedArticle?.title}</h2>
                        <p className="text-sm text-black flex-grow">{selectedArticle?.description}</p>
                        <div className="mt-4 flex justify-end">
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none mb-8" onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </Modal>

            </div>
        </div>
    );
}

export default OwnerArticlePage;
