import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/app';
import ErrorBoundry from './components/error-boundry';
import BdApiService from './services/bd-api-service';
import { BdApiServiceProvider } from './components/bd-service-context';

import store from './store';

const bdApiService = new BdApiService();

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundry>
            <BdApiServiceProvider value={bdApiService}>
                <Router>
                    <App />
                </Router>
            </BdApiServiceProvider>
        </ErrorBoundry>
    </Provider>,
    document.getElementById('root')
);