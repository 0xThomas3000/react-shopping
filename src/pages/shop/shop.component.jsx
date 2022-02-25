import React, { Component } from 'react';
import SHOP_DATA from './shop.data.js';
import '../../components/collection-preview/collection-preview';
import CollectionPreview from '../../components/collection-preview/collection-preview.jsx';

class ShopPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collections: SHOP_DATA
    };
  }

  render() {
    const {collections} = this.state;
    return (
      <div className='shop-page'>
        {
          collections.map(({ id, ...otherCollection }) => (
            <CollectionPreview key={id} {...otherCollection} />
          ))
        }
      </div>
    )
  }
}

export default ShopPage;