import React from 'react'
import { Metadata } from 'next'
import HomeComponent from '@/components/Home';

export const metadata: Metadata = {
  title: "Test Data",
  description: "test data.",
};

const Home = () => {
  return (
    <div className='bg-gray-50 text-gray-900 min-h-screen'>
      <HomeComponent />
    </div>
  )
}

export default Home