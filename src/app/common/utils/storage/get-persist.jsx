/**
 * react-redux redux-persist redux 持久化获取缓存数据
 * @param persistType
 * @returns {object}
 */
const getPersist = (persistType) => {
    // 将缓存里面的数据取出
    if (window.sessionStorage) {
        const persist = JSON.parse(window.sessionStorage.getItem('persist:root')) || {};
        if (persist && persistType) {
            return JSON.parse(persist[persistType] || '{}');
        }
    }
};

export default getPersist;
