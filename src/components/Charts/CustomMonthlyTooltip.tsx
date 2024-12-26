import React from 'react'

const CustomMonthlyTooltip = ({ active, payload, label }) => {
  const month = new Date(label).toLocaleString('default',{ month:'long'})
    if (active && payload && payload.length) {
        return (
          <div className="bg-gray-800 opacity-80 border border-gray-500 p-2 w-32">
            <p>{`${month}`}</p>
            <p>{payload[0].value} €</p>
          </div>
        );
      }
    
      return null;
}

export default CustomMonthlyTooltip
