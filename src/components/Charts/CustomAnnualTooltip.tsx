import React from 'react'

const CustomAnnualTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
          <div className="bg-gray-800 opacity-80 border border-gray-500 p-2 w-32">
            <p>{`Year: ${label}`}</p>
            <p>{payload[0].value} €</p>
          </div>
        );
      }
    
      return null;
}

export default CustomAnnualTooltip
