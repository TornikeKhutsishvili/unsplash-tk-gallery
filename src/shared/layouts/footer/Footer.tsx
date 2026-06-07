import React from 'react'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t mt-10">
        <div className="container mx-auto py-4 text-center text-gray-600">
            &copy; {currentYear} Unsplash tk-gallery. All rights reserved.
        </div>
    </footer>
  )
}

export default Footer