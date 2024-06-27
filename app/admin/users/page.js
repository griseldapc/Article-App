"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '@/app/sidebar/page';
import '../../../styles/globals.css';

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found. Please login.");
        return;
      }

      try {
        const axiosConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get('http://103.164.54.252:8000/api/users', axiosConfig);
        console.log('API Response:', response.data);

        const transformedUsers = response.data.map(user => ({
          ...user,
          fullName: `${user.first_name} ${user.last_name}`
        }));

        setUsers(transformedUsers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveChanges = async (updatedUserData) => {
    try {
      const token = localStorage.getItem("token");
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await axios.put(`http://103.164.54.252:8000/api/users/${selectedUser.id}`, updatedUserData, axiosConfig);
      
      const updatedUser = {
        ...selectedUser,
        first_name: updatedUserData.first_name,
        last_name: updatedUserData.last_name,
      };

      // Update fullName in updatedUser
      updatedUser.fullName = `${updatedUser.first_name} ${updatedUser.last_name}`;

      const updatedUsers = users.map(user => (user.id === selectedUser.id ? updatedUser : user));
      
      setUsers(updatedUsers);
      setSelectedUser(updatedUser); // Update selectedUser in state
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };
  

  const handleDeleteClick = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`http://103.164.54.252:8000/api/users/${userId}`, axiosConfig);
      
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className='flex'>
      <Sidebar />
      <div className='p-9 items-center flex flex-col'>
        <h1 className='text-3xl pb-16'>Admin Dashboard</h1>
        <div className="overflow-x-auto items-center">
          <table id="myTable" className='table-auto min-w-full border-collapse border border-gray-300'>
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">No</th>
                <th className="border border-gray-300 px-4 py-2">Full Name</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.fullName}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => handleEditClick(user)}>Edit</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-600" onClick={() => handleDeleteClick(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {isEditModalOpen && selectedUser && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4 text-black">Edit User</h2>
              <form onSubmit={(e) => { e.preventDefault(); handleSaveChanges({ first_name: e.target.firstName.value, last_name: e.target.lastName.value }) }}>
                <div className="mb-4">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                  <input type="text" id="firstName" name="firstName" defaultValue={selectedUser.first_name} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" />
                </div>
                <div className="mb-4">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input type="text" id="lastName" name="lastName" defaultValue={selectedUser.last_name} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" />
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save Changes</button>
                  <button type="button" className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md ml-2 hover:bg-gray-400" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
}



