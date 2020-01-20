/**
 * 根据路由获取导航、菜单路径
 * @type {string}
 */

const hash = window.location.hash;
export let manageNav = '';
export let manageMenu = '';

if (hash.split('/') && hash.split('/').length) {
    // 导航条路径
    manageNav = hash.split('/')[2];
    // 菜单栏路径
    manageMenu = hash.split('/')[3];
}

export default {manageNav, manageMenu};
