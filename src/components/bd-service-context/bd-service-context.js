import React from 'react';

const {
    Provider: BdApiServiceProvider,
    Consumer: BdApiServiceConsumer
} = React.createContext();

export {
    BdApiServiceConsumer,
    BdApiServiceProvider
};