import Loadable from 'react-loadable';

/**
 * 异步加载路由
 * @param component
 * @constructor
 */
const AsyncLoader = (component) => Loadable({
    loader: component,
    loading: ()=>null,
});

export default AsyncLoader;
