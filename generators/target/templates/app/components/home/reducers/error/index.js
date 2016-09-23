import {LOGIN_ERROR} from '../../components/login/actions';
import {ITEM_ERROR} from '../../actions';

//-------------------------------------------------------------------
// Error STORE
//-------------------------------------------------------------------
export const error = (state = null, {type, payload}) => {
    /* eslint-disable indent */
    switch (type) {
        case LOGIN_ERROR:
        case ITEM_ERROR:
            return payload;
        default:
            return null;
    }
};
