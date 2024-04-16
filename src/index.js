import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import Main from './Main';
import { UserProvider } from './components/contextAPI/UserContext';


ReactDOM.render(
    <UserProvider>
        <Main/>
    </UserProvider>,
  document.getElementById("root")
);


