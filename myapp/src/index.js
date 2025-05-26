import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux';
import { store } from './Store';


const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
            retry: 10,
        }
    }
})

root.render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <App />
        </Provider>
    </QueryClientProvider>
);

reportWebVitals();
