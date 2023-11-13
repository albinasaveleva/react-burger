import React, {FC, ReactNode} from 'react';

type TComponentProps = {
  handleSubmit: (e: React.FormEvent) => void,
  children: ReactNode,
  classNameString?: string
};

const PageForm: FC<TComponentProps> = ({children, handleSubmit, classNameString = ''}) => {
  return (
    <div className='page-form-wrapper'>
      <form className={`page-form ${classNameString}`} onSubmit={handleSubmit} >
        { children }
      </form>
    </div>
  )
}

export default PageForm;