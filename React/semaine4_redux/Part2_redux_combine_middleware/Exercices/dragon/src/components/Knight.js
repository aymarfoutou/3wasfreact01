import React from 'react';
import {
  useDispatch
} from 'react-redux';

import { delete_knight } from '../actions/actions-types';

import './Knight.scss';

const Knight = ({ knight }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <p>Name : {knight}</p>
      <p><button onClick={() => dispatch(delete_knight(knight))}>Delete {knight}</button></p>
    </div>
  );
}

export default Knight;
