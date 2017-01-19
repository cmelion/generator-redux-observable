import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Actions from './actions';
import {ItemList} from './components/item-list';
import {ItemDetail} from './components/item-detail';
import {createButtonClass} from '../../config/styles/mdl/';

// Import local styles
require('./style.scss');

/* eslint-disable quotes */
export const Home = ({error, loggedIn, resetItem, selectedItem, selectItem, pendingAction, ...rest}) => (
    (loggedIn) ?
        <div className="home-component">
            {
                (error) ?
                    <div className="error-message">
                        <p>An error has occurred:<br />{error.message}</p>
                    </div>
                    : null
            }
            <div className="content">
                <div className="list-view items">
                    <button className={createButtonClass}
                            onClick={resetItem}>CREATE
                    </button>
                    <ItemList selectedItem={selectedItem}
                              selectItem={selectItem}
                              deleteItem={pendingAction}
                              {...rest} />
                </div>
                {
                    (selectedItem) ?
                        <div className="detail-view">
                            <ItemDetail item={selectedItem}
                                        cancel={resetItem}
                                        selectItem={selectItem}
                                        submit={pendingAction}
                                        {...rest}
                            />
                        </div>
                        : null
                }
            </div>
        </div>
        :
        <div>Login to see more.</div>
);
/* eslint-enable quotes */

Home.propTypes = {
    error: PropTypes.object,
    items: PropTypes.array.isRequired,
    pendingAction: PropTypes.func.isRequired,
    selectedItem: PropTypes.object,
    selectItem: PropTypes.func.isRequired,
    user: PropTypes.object
};

export default connect(
    // Map State to Props (Reducers)
    /* istanbul ignore next */
    (state) => state,
    //Map DispatchToProps (Actions)
    {...Actions}
)(Home);
