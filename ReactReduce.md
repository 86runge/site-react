
## Reduce

Redux 是 JavaScript 状态容器，只要你的项目中使用到了状态，并且状态十分复杂，那么你就可以使用Redux管理你的项目状态

原理：
1. 定义state状态
2. 在react中state决定了视图（ui），state的变化就会调用React的render（）方法，从而改变视图
3. 用户通过一些事件（如点击按钮，移动鼠标）就会向reducer派发一个action
4. reducer接收到action后就会去更新state
5. store是包含了所有了state，可以把他看做所有状态的集合

### action
action本质上就是一个对象，它一定有一个名为type的key 如{type: 'add'},{type: 'add'}就是一个action
但是我们只实际工作中并不是直接用action ，而是使用action创建函数，（千万别弄混淆），
顾名思义action创建函数就是一个函数，它的作用就是返回一个action

### reducer
reducer其实就是一个函数，它接收两个参数，第一个参数是需要管理的状态state，第二个是action。
reducer会根据传入的action的type值对state进行不同的操作，然后返回一个新的state，而不是在原有state的基础上进行修改,
但是如果遇到了未知的（不匹配的）action，就会返回原有的state，不进行任何改变。

### store
你可以把store想成一个状态树，它包含了整个redeux应用的所有状态。
我们使用redux提供的createStore方法生成store
    
    import {createStore} from 'redux';
    const store = createStore(reducer);
    
store提供了几个方法供我们使用，下面是我们常用的3个：
    
    store.getState();//获取整个状态树
    store.dispatch();//改变状态，改变state的唯一方法
    store.subscribe();//订阅一个函数，每当state改变时，都会去调用这个函数

使用例子：
```jsx harmony
import {createStore} from 'redux';

//定义常量方便维护
const ADD = '+', SUBTRACTION = '-';

//给初始状态一个默认值：{money: 0}
function reducer(state = {money: 0}, action) {
    //返回一个新的state可以使用es6提供的Object.assign()方法，或扩展运算符（此方法需要babel-preset-state-3支持）
    switch (action.type) {
        case ADD:
            return Object.assign({}, state, {money: state.money + 1});
        case SUBTRACTION:
            return {...state, ...{money: state.money - 1}};
        default:
            return state;
    }
}

//action创建函数，返回了一个action
function add() {
    return {type: ADD}
}

function subtraction() {
    return {type: SUBTRACTION}
}

//打印改变后的状态
function listen() {
    console.log(store.getState());
}

//创建单一状态树
const store = createStore(reducer);

//订阅listen，每次dispatch后都会执行listen，从而打印状态（只有在执行dispatch后才会执行，状态初始化的时候并不会执行）
store.subscribe(listen);

console.log(store.getState());//初始的状态，没有任何改变

//store通过dispatch这个方法，并且传入action作为参数，对store进行了改变
store.dispatch(add());
store.dispatch(subtraction());
store.dispatch({type: '我是来捣乱的'});

/*控制台的打印结果如下：
{money: 0}
{money: 1}
{money: 0}
{money: 0}*/
```
