/**
 * 全局配置文件
 */
let baseUrl;
if (process.env.NODE_ENV === 'development') {
    baseUrl = '/api';
} else {
    baseUrl = '/';
}


export default baseUrl
