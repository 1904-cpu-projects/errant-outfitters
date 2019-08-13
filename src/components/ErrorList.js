import React from 'react';
import { connect } from 'react-redux';

function ErrorList({ errors }) {
  let list = [];
  for (let erroritem of Object.keys(errors)) {
    errors[erroritem].forEach(item => list.push(`${erroritem}: ${item}`));
  }
  return (
    <div className="errors">
      {list.map((i, idx) => (
        <div key={idx} className="error-item">
          {i}
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  null,
)(ErrorList);
