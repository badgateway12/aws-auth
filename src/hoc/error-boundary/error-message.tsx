import * as React from 'react';
import { Link } from 'react-router-dom';
import { FaRegSadTear } from 'react-icons/fa';


export const ErrorMessage: React.FC<{ onReset: () => void }> = ({ onReset }) => {
  return (
    <>
      <h3>{`Sorry, some unexpected error has occurred`}&nbsp; 
        <FaRegSadTear className='text-primary'/>
      </h3>
      <Link to='/' 
            className='btn btn-primary btn-lg' 
            role='button' 
            onClick={() => { onReset(); }}> 
            {'Proceed me to the Landing'}
      </Link>
    </>
  );
};