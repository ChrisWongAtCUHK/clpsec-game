import React from 'react';
import { Subscription } from 'react-apollo';
import gql from 'graphql-tag';
import './colors.css';
import './Box.css';

const SUBSCRIPTION_CLICK_COUNT = gql`
  subscription getClickCountByColor($color: String) {
    click_game_count_by_color(args: { search_color: $color }) {
      count
      color
    }
  }
`;

const Box = ({ color }) => (
  <Subscription subscription={SUBSCRIPTION_CLICK_COUNT} variables={{ color }}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :</p>;
      return (
        <div className={`text-center w-25 p-3 box ${color}`}>
          {data.click_game_count_by_color[0].count}
        </div>
      );
    }}
  </Subscription>
);

export default Box;
