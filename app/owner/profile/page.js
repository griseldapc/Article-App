"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarOwner from '@/app/sidebar-owner/page';
import '../../../styles/globals.css';

export default function OwnerPage() {

  return (
    <div className='flex'>
      <SidebarOwner />
      <div className='p-9'>
        <h1 className='text-3xl text-center pb-16'>Owner Dashboard</h1>
          <div>username : demo1</div>
          <div>password : demo1@123</div>
      </div>
    </div>
  );
}
