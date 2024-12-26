import React from 'react';


const KpiCard = ({
 name,
  value,
  icon: Icon,
}: {
  name:string,
  value: string,
  icon: React.ElementType,
  color?: string
}) => {
    return(
     <div className='bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700'>
        <div className='px-4 py-5 sm:p-6'>
            <span className='flex items-center text-sm font-medium text-gray-400'>
                <Icon className={`size-5 mr-2 text-violet-700`} />
                {name}
            </span>
            <p className='mt-1 text-3xl font-semibold text-gray-100'>
                {value}
            </p>
        </div>
     </div>
    );
}

export default KpiCard;