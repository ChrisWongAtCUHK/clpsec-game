import React from 'react';
import { Subscription } from 'react-apollo';
import gql from 'graphql-tag';

const SUBSCRIPTION_CLICK_COUNT = `
subscription getClickCount($color: String) {
  click_game_aggregate(where: {color: {_eq: $color}}) {
    aggregate {
      count(columns: color) 
    }
  }
}`;

const Box = (color) => (
  <Subscription
    subscription={gql`
      ${SUBSCRIPTION_CLICK_COUNT}
    `}
    variables={color}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :</p>;
      return (
        <div>
          <div>{data.click_game_aggregate.aggregate.count}</div>
        </div>
      );
    }}
  </Subscription>
);

export default Box;
