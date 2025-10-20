import React from 'react'

const Loading = () => {
  return (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
        <div className="w-16 h-16 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
      </div>

  )
}

export default Loading