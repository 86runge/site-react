
## React

### JSX语法

### 元素渲染

### 组件&Props

函数组件与 class 组件

组合组件、提取组件

Props 的只读性

### State&生命周期
```javascript
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```
使用 this.setState() 来时刻更新组件 state：
```javascript
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```
1. 当 <Clock /> 被传给 ReactDOM.render()的时候，React 会调用 Clock 组件的构造函数。 因为 Clock 需要显示当前的时间，所以它会用一个包含当前时间的对象来初始化 this.state。我们会在之后更新 state。

2. 之后 React 会调用组件的 render() 方法。这就是　React 确定该在页面上展示什么的方式。然后　React 更新 DOM 来匹配 Clock 渲染的输出。

3. 当 Clock 的输出被插入到 DOM 中后， React 就会调用 ComponentDidMount() 生命周期方法。在这个方法中，Clock 组件向浏览器请求设置一个计时器来每秒调用一次组件的 tick() 方法。

4. 浏览器每秒都会调用一次 tick() 方法。 在这方法之中，Clock 组件会通过调用 setState() 来计划进行一次 UI 更新。得益于 setState() 的调用，React 能够知道 state 已经改变了，然后会重新调用 render() 方法来确定页面上该显示什么。这一次，render() 方法中的 this.state.date 就不一样了，如此以来就会渲染输出更新过的时间。React 也会相应的更新 DOM。

5. 一旦 Clock 组件从 DOM 中被移除，React 就会调用 componentWillUnmount() 生命周期方法，这样计时器就停止了。


1. 不要直接修改 State
    
    构造函数是唯一可以给 this.state 赋值的地方，使用 this.setState 修改 State

2. State 的更新可能是异步的

    出于性能考虑，React 可能会把多个 setState() 调用合并成一个调用。
    
    因为 this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。

3. State 的更新会被合并

    当你调用 setState() 的时候，React 会把你提供的对象合并到当前的 state。
    
数据是向下流动的

1. componentWillMount 在渲染前调用,在客户端也在服务端。

2. componentDidMount : 在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。 如果你想和其他JavaScript框架一起使用，可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等操作(防止异步操作阻塞UI)。

3. componentWillReceiveProps 在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化render时不会被调用。

4. shouldComponentUpdate 返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用。可以在你确认不需要更新组件时使用。

5. componentWillUpdate在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。

6. componentDidUpdate 在组件完成更新后立即调用。在初始化时不会被调用。

7. componentWillUnmount在组件从 DOM 中移除之前立刻被调用。

### 事件处理

React 事件的命名采用小驼峰式（camelCase），而不是纯小写。

使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。

在 React 中另一个不同点是你不能通过返回 false 的方式阻止默认行为。你必须显式的使用 preventDefault。
```javascript
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // 为了在回调中使用 `this`，这个绑定是必不可少的
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```
使用 React 时，你一般不需要使用 addEventListener 为已创建的 DOM 元素添加监听器。事实上，你只需要在该元素初始渲染的时候添加监听器即可。

当你使用 ES6 class 语法定义一个组件的时候，通常的做法是将事件处理函数声明为 class 中的方法。

使用 class fields 正确的绑定回调函数，如果你没有使用 class fields 语法，你可以在回调中使用箭头函数

### 条件渲染

```javascript
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```
通过花括号包裹代码，你可以在 JSX 中嵌入任何表达式。这也包括 JavaScript 中的逻辑与 (&&) 运算符

另一种内联条件渲染的方法是使用 JavaScript 中的三目运算符 condition ? true : false

在极少数情况下，你可能希望能隐藏组件，即使它已经被其他组件渲染。若要完成此操作，你可以让 render 方法直接返回 null，而不进行任何渲染

### 列表&Key

```javascript
function ListItem(props) {
  // 正确！这里不需要指定 key：
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 正确！key 应该在数组的上下文中被指定
    <ListItem key={number.toString()}
              value={number} />

  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```
key 帮助 React 识别哪些元素改变了，比如被添加或删除。因此你应当给数组中的每一个元素赋予一个确定的标识

如果列表项目的顺序可能会变化，我们不建议使用索引来用作 key 值，因为这样做会导致性能变差，还可能引起组件状态的问题。

数组元素中使用的 key 在其兄弟节点之间应该是独一无二的。然而，它们不需要是全局唯一的。当我们生成两个不同的数组时，我们可以使用相同的 key 值

### 表单

```javascript
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('提交的名字: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          名字:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}
```
```javascript
<textarea value={this.state.value} onChange={this.handleChange} />
```

在 HTML 中, textarea 元素通过其子元素定义其文本，而在 React 中，textarea 使用 value 属性代替

```javascript
<form onSubmit={this.handleSubmit}>
    <label>
      选择你喜欢的风味:
      <select value={this.state.value} onChange={this.handleChange}>
        <option value="grapefruit">葡萄柚</option>
        <option value="lime">酸橙</option>
        <option value="coconut">椰子</option>
        <option value="mango">芒果</option>
      </select>
    </label>
    <input type="submit" value="提交" />
  </form>
```
React 并不会使用 selected 属性，而是在根 select 标签上使用 value 属性。这在受控组件中更便捷，因为您只需要在根标签中更新它。你可以将数组传递到 value 属性中，以支持在 select 标签中选择多个选项

当需要处理多个 input 元素时，我们可以给每个元素添加 name 属性，并让处理函数根据 event.target.name 的值选择要执行的操作。

### 状态提升

在 React 中，将多个组件中需要共享的 state 向上移动到它们的最近共同父组件中，便可实现共享 state。这就是所谓的“状态提升”。

```javascript
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);
```
让我们来重新梳理一下当你对输入框内容进行编辑时会发生些什么：

React 会调用 DOM 中 <input> 的 onChange 方法。在本实例中，它是 TemperatureInput 组件的 handleChange 方法。

TemperatureInput 组件中的 handleChange 方法会调用 this.props.onTemperatureChange()，并传入新输入的值作为参数。其 props 诸如 onTemperatureChange 之类，均由父组件 Calculator 提供。

起初渲染时，用于摄氏度输入的子组件 TemperatureInput 中 onTemperatureChange 方法为 Calculator 组件中的 handleCelsiusChange 方法，而，用于华氏度输入的子组件 TemperatureInput 中的 onTemperatureChange 方法为 Calculator 组件中的 handleFahrenheitChange 方法。因此，无论哪个输入框被编辑都会调用 Calculator 组件中对应的方法。

在这些方法内部，Calculator 组件通过使用新的输入值与当前输入框对应的温度计量单位来调用 this.setState() 进而请求 React 重新渲染自己本身。

React 调用 Calculator 组件的 render 方法得到组件的 UI 呈现。温度转换在这时进行，两个输入框中的数值通过当前输入温度和其计量单位来重新计算获得。

React 使用 Calculator 组件提供的新 props 分别调用两个 TemperatureInput 子组件的 render 方法来获取子组件的 UI 呈现。

React 调用 BoilingVerdict 组件的 render 方法，并将摄氏温度值以组件 props 方式传入。

React DOM 根据输入值匹配水是否沸腾，并将结果更新至 DOM。我们刚刚编辑的输入框接收其当前值，另一个输入框内容更新为转换后的温度值。

### 组合vs继承
```javascript
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}
               onChange={this.handleChange} />

        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}
```
Props 和组合为你提供了清晰而安全地定制组件外观和行为的灵活方式。注意：组件可以接受任意 props，包括基本数据类型，React 元素以及函数。

### React哲学

从设计稿开始

第一步：将设计好的 UI 划分为组件层级

第二步：用 React 创建一个静态版本

第三步：确定 UI state 的最小（且完整）表示

第四步：确定 state 放置的位置

第五步：添加反向数据流

