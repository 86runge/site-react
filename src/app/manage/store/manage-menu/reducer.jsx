import getPersist from '../../../common/utils/storage/get-persist';

const defaultState = getPersist('menuInfo');

export const menuInfo = (state = defaultState, action = {}) => {
    if (action.type === 'CHANGE_MENU') {
        return {...state, ...{menuInfo: action.menuInfo}};
    } else {
        return {...state}
    }
};
