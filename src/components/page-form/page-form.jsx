import React from 'react';
import PropTypes from 'prop-types';

function PageForm({children, handleSubmit}) {
  return (
    <div className='page-form-wrapper'>
      <form className='page-form' onSubmit={handleSubmit}>
        { children }
      </form>
    </div>
  )
}

PageForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default React.memo(PageForm);