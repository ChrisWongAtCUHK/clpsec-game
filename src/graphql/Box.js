import React from 'react';
import { Subscription } from 'react-apollo';
import gql from 'graphql-tag';

const SUBSCRIPTION_FIRST_CLICK = `
subscription GetFirstClick($color: String) {
  click_game_aggregate(where: {color: {_eq: $color}}) {
    aggregate {
      min {
        clicked_at
      }
    }
  }
}`;

const Box = (color) => (
  <Subscription
    subscription={gql`
      ${SUBSCRIPTION_FIRST_CLICK}
    `}
    variables={color}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :</p>;
      return (
        <div>
          <div>{JSON.stringify(data)}</div>
        </div>
      );
    }}
  </Subscription>
);

export default Box;
