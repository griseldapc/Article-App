"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Sidebar from '@/app/sidebar/page';
import '../../../styles/globals.css';

const AdminArticlePage = () => {
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
                console.log('Articles response:', response.data.data);
                setArticles(response.data.data);
            } catch (error) {
                console.error('Error fetching articles:', error.response || error.message);
                setArticles([]);
            }
        };

        fetchArticles();
    }, []);

    const handleEdit = (article) => {
        console.log("Edit article:", article);
    };

    const handleDelete = (article) => {
        console.log("Delete article:", article);
    };

    const columns = [
        {
            name: <span style={{ fontSize: '16px' }}>Title Article</span>,
            selector: row => row.title,
            sortable: true,
            cell: row => (
                <div className="flex-1 text-left text-sm">
                    {row.title}
                </div>
            ),
        },
        {
            name: <span style={{ fontSize: '16px' }}>Actions</span>,
            cell: row => (
                <div className="flex justify-end w-[300px]">
                    <button
                        className="px-2 py-1 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none w-[50px] h-[30px] my-1 text-xs"
                        onClick={() => handleEdit(row)}
                    >
                        Edit
                    </button>
                    <button
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none text-xs w-[60px] my-1"
                        onClick={() => handleDelete(row)}
                    >
                        Delete
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    return (
        <div className='flex h-screen'>
            <Sidebar />
            <div className='p-9 flex-grow overflow-y-auto'>
                <h1 className='text-3xl text-center pb-10 font-bold'>Admin Dashboard</h1>
                <DataTable
                    columns={columns}
                    data={articles}
                    pagination
                    highlightOnHover
                    customStyles={{
                        rows: {
                            style: 'flex justify-between items-center',
                        },
                        headCells: {
                            style: 'flex justify-between items-center',
                        },
                    }}
                />
            </div>
        </div>
    );
}

export default AdminArticlePage;
