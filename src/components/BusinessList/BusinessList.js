import React from 'react';
import './BusinessList.css';
import {Business} from '../Business/Business';

export class BusinessList extends React.Component {
  render() {
    // added key-attribute to get rid of compiler warning that
    // each element of an array must heve a key prop (not in Codecademy instructions).
    return (
      <div className="BusinessList">
        {this.props.businesses.map((business, i) => {
          return  <Business key={`business_${i}`} business={business}/>;
        })}
      </div>
    );
  }
}
