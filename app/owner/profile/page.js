"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarOwner from '@/app/sidebar-owner/page';

const OwnerPage = () => {
  const [userData, setUserData] = useState(null);
  const [formDisabled, setFormDisabled] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }
  
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setUserData(response.data);
        setFormDisabled(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, []);
  

  return (
    <div>
      <div className='flex'>
        <SidebarOwner />
        <div className='p-9 mx-auto'>
          <h1 className='text-3xl text-center pb-3 font-bold mx-auto'>Owner Dashboard</h1>
          <section className="p-6 dark:text-gray-800">
            <form noValidate className="container w-[60vw] p-8 mx-auto space-y-6 rounded-md shadow dark:bg-gray-50">
              <div className="input-container">
                <label htmlFor="email" className="block mb-1 ml-1">Email</label>
                <div
                  id="email"
                  className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:dark:ring-violet-600 dark:bg-gray-100 h-10"
                  contentEditable={false}
                >
                  {userData ? userData.email : ''}
                </div>
              </div>
              <div className="input-container">
                <label htmlFor="firstName" className="block mb-1 ml-1">First Name</label>
                <div
                  id="firstName"
                  className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:dark:ring-violet-600 dark:bg-gray-100 h-10"
                  contentEditable={false}
                >
                  {userData ? userData.first_name : ''}
                </div>
              </div>
              <div className="input-container">
                <label htmlFor="lastName" className="block mb-1 ml-1">Last Name</label>
                <div
                  id="lastName"
                  className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:dark:ring-violet-600 dark:bg-gray-100 h-10"
                  contentEditable={false}
                >
                  {userData ? userData.last_name : ''}
                </div>
              </div>
              <div className="input-container">
                <label htmlFor="username" className="block mb-1 ml-1">Username</label>
                <div
                  id="username"
                  className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:dark:ring-violet-600 dark:bg-gray-100 h-10"
                  contentEditable={false}
                >
                  {userData ? userData.username : ''}
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default OwnerPage;
