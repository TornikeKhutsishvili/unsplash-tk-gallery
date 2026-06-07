import React from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'
import { Outlet } from 'react-router-dom'

const MainLayout:React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Right Content */}
      <div className="flex-1 flex flex-col ml-64">
        <Header />

        <main className="flex-1 p-6">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default MainLayout