import React from 'react';
import PropTypes from 'prop-types';
import Products from './Products';
import MenuBar from './MenuBar';

export default function Home({ match }) {
  return (
    <div className="main-view">
      <MenuBar />
      <Products match={match} />
    </div>
  );
}

Home.propTypes = {
  match: PropTypes.object,
};
