import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import client from '../graphql/apollo';

import Box from '../graphql/Box';

class Dashboard extends Component {
  componentWillMount() {}

  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <Box color="orange" />
        </div>
      </ApolloProvider>
    );
  }
}

export default Dashboard;
