import React from 'react'

const ChartCard = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-2 md:p-4 border border-gray-700'>
      {children}
    </div>
  )
}

export default ChartCard
