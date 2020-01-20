import getPersist from '../../../common/utils/storage/get-persist';

const defaultState = getPersist('navInfo');

export const navInfo = (state = defaultState, action = {}) => {
    if (action.type === 'CHANGE_NAV') {
        return {...state, ...{navInfo: action.navInfo}};
    } else {
        return {...state}
    }
};
