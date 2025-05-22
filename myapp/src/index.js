import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'


const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient({
    defaultOptions : {
        queries : {
            staleTime : 10,
            retry : 1,
        }
    }
})

root.render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
);

reportWebVitals();
