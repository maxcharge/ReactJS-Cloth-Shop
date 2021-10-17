import React from 'react';
import CollectionsOverview from '../../components/collections-overview/collections-overview'

const ShopPage = ({ collections }) => (
    <div style={{margin:"20px",color:"#FF7878"}} className='shop-page'>
        <CollectionsOverview />
    </div>
)

export default ShopPage;