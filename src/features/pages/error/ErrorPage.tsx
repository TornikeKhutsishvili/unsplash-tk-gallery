import React from 'react'
import { Link } from "react-router-dom"

const ErrorPage: React.FC = () => {
  return (
    <main className="d-flex align-items-center justify-content-center vh-100 bg-dark px-3 py-5">
      <div className="text-center text-white">
        <p className="text-primary fw-semibold">404</p>
        <h1 className="mt-4 display-1 fw-semibold">Page not found</h1>
        <p className="mt-3 fs-5 text-secondary">Sorry, we couldn’t find the page you’re looking for.</p>
        <div className="mt-4 d-flex justify-content-center gap-3">
          <Link to="/home" className="btn btn-primary">Go back home</Link>
        </div>
      </div>
    </main>
  )
}

export default ErrorPage