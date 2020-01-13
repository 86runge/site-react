/**
 * 全局配置文件
 */
let baseURL;
if (process.env.NODE_ENV === 'development') {
    baseURL = '/api';
} else {
    baseURL = '/';
}


export default baseURL