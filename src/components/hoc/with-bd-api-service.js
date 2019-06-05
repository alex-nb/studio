import React from 'react';
import {BdApiServiceConsumer} from "../bd-service-context";

const withBdApiService = () => (Wrapped) => {
  return ( props ) => {
      return (
          <BdApiServiceConsumer>
              {
                  ( bdApiService ) => {
                      return (<Wrapped { ...props} bdApiService={bdApiService} />);
                  }
              }
          </BdApiServiceConsumer>
      );
  }
};

export default withBdApiService;