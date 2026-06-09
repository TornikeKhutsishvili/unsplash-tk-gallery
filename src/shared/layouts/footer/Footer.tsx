import React from 'react'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="
        mt-10 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-t
        border-gray-200/60 dark:border-gray-800/60
      "
    >
        <div className="container mx-auto py-4 text-center text-gray-600">
            &copy; {currentYear} Unsplash tk-gallery. All rights reserved.
        </div>
    </footer>
  )
}

export default Footer