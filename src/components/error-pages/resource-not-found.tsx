import React from 'react';
import { FaRegSadTear } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './resource-not-found.css';

export const NotFound = () => (
  <div className='NotFound'>
    <h3>{`This page doesn't exist or some other horrible error has occurred`}&nbsp; 
      <FaRegSadTear className='text-primary'/>
    </h3>
    <br />
    <Link to='/' 
          className='btn btn-primary btn-lg' 
          role='button'>
          {'Proceed me to the Landing'}
    </Link>
  </div>
);