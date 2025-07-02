import React from 'react'

const Footer = () => {
  return (
    <div>

        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                      <h3 className="text-lg font-bold">About Us</h3>
                      <p>
                        We are a team of developers who are passionate about creating beautiful and functional websites.
                      </p>
                    </div>
                </div>
            </div>
          </footer>
    </div>
  )
}

export default Footer