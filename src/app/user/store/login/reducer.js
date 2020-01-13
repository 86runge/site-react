let defaultState = {
    username: '',
    password: '',
    token: ''
};


export const userInfo = (state = defaultState, action = {}) => {
    return {...state, ...defaultState};
};
