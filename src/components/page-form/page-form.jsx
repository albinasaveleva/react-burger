import React from 'react';

export default function PageForm({children, handleSubmit, className}) {
  return (
    <div className='page-form-wrapper'>
      <form className='page-form' onSubmit={handleSubmit}>
        { children }
      </form>
    </div>
  )
}