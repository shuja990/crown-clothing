import React from 'react';
import {connect} from 'react-redux';
import PreviewCollection from '../../components/preview-collection/preview-collection.component'
import {createStructuredSelector} from 'reselect'
import {selectCollectionsForPreview} from '../../redux/shop/shop.selectors'
import './collections-overview.styles.scss'

const CollectionOverview = ({ collections }) => (
    <div className='collection-overview'>
         {
            collections.map(({id, ...otherCollectionProps}) =>(
               <PreviewCollection key={id} {...otherCollectionProps}/>
             ))
          }
    </div>
)
const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
})
export default connect(mapStateToProps)(CollectionOverview) 