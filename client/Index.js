import React from 'react';
//import {render} from 'react-dom';
import App from './App.jsx';
import styles from './scss/style.scss'
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);