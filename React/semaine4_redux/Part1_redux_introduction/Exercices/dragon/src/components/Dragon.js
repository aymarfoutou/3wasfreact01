import React from 'react';
import {
  useDispatch
} from 'react-redux';

import { delete_dragon } from '../actions/actions-types';

const Dragon = ({ dragon }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <p>Name : {dragon}</p>
      <p><button onClick={() => dispatch(delete_dragon(dragon))}>Delete {dragon}</button></p>
    </div>
  );
}

export default Dragon;
