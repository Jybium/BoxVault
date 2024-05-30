"use client"

import React from 'react'

const layout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='bidLayout'>
        {children}
    </div>
  )
}

export default layout