# ReactRouter

## BrowserRouter

    <BrowserRouter> 使用 HTML5 提供的 history API (pushState, replaceState 和 popstate 事件) 来保持 UI 和 URL 的同步。
    
```jsx harmony
import { BrowserRouter } from 'react-router-dom';

<BrowserRouter
  basename={string}
  forceRefresh={bool}
  getUserConfirmation={func}
  keyLength={number}
>
  <App />
</BrowserRouter>
```

|参数|类型|说明|
|:---|:---|:---|
|basename|string|所有位置的基准 URL。basename 的正确格式是前面有一个前导斜杠，但不能有尾部斜杠。|
|forceRefresh|bool|如果为 true ，在导航的过程中整个页面将会刷新|
|getUserConfirmation|func|用于确认导航的函数，默认使用 window.confirm。|
|keyLength|number|location.key 的长度，默认为 6。|

    basename: string
    
    <BrowserRouter basename="/calendar">
      <Link to="/today" />
    </BrowserRouter>
   
    上例中的 <Link> 最终将被呈现为：
    
    <a href="/calendar/today" />
    
    forceRefresh: bool
    
    如果为 true ，在导航的过程中整个页面将会刷新。一般情况下，只有在不支持 HTML5 history API 的浏览器中使用此功能。
    
    const supportsHistory = 'pushState' in window.history;
    
    <BrowserRouter forceRefresh={!supportsHistory} />
    
    getUserConfirmation: func
    用于确认导航的函数，默认使用 window.confirm。例如，当从 /a 导航至 /b 时，会使用默认的 confirm 函数弹出一个提示，
    用户点击确定后才进行导航，否则不做任何处理。译注：需要配合 <Prompt> 一起使用。
    
    // 这是默认的确认函数
    const getConfirmation = (message, callback) => {
      const allowTransition = window.confirm(message);
      callback(allowTransition);
    }
    
    <BrowserRouter getUserConfirmation={getConfirmation} />
    keyLength: number
    location.key 的长度，默认为 6。
    
    <BrowserRouter keyLength={12} />
    
    children: node
    要呈现的单个子元素（组件）。

## HashRouter

    <HashRouter> 使用 URL 的 hash 部分（即 window.location.hash）来保持 UI 和 URL 的同步。
    由于该技术仅用于支持旧式（低版本）浏览器，因此对于一些新式浏览器，我们鼓励你使用 <BrowserHistory> 代替。

## Link

    为你的应用提供声明式的、可访问的导航链接。

```jsx harmony
import { Link } from 'react-router-dom';

<Link to="/about">About</Link>
```
```jsx harmony
<Link to={{
  pathname: '/courses',
  search: '?sort=name',
  hash: '#the-hash',
  state: {
    fromDashboard: true
  }
}} />
```
    to: string 一个字符串形式的链接地址，通过 pathname、search 和 hash 属性创建。
    to: object 一个对象形式的链接地址，可以具有以下任何属性：
        pathname - 要链接到的路径
        search - 查询参数
        hash - URL 中的 hash，例如 #the-hash
        state - 存储到 location 中的额外状态数据
    
    replace: bool
    当设置为 true 时，点击链接后将替换历史堆栈中的当前条目，而不是添加新条目。默认为 false。
    
    innerRef: func
    允许访问组件的底层引用。
    
    others
    你还可以传递一些其它属性，例如 title、id 或 className 等。

## NavLink

    一个特殊版本的 <Link>，它会在与当前 URL 匹配时为其呈现元素添加样式属性。

```jsx harmony
import { NavLink } from 'react-router-dom';

<NavLink to="/about">About</NavLink>
```
参数说明

    activeClassName: string
    当元素处于激活状态时应用的类，默认为 active。它将与 className 属性一起使用。
    
        <NavLink to="/faq" activeClassName="selected">FAQs</NavLink>
        activeStyle: object
        当元素处于激活状态时应用的样式。
        
        const activeStyle = {
          fontWeight: 'bold',
          color: 'red'
        };
        
        <NavLink to="/faq" activeStyle={activeStyle}>FAQs</NavLink>
    
    exact: bool
    如果为 true，则只有在位置完全匹配时才应用激活类/样式。
    
        <NavLink exact to="/profile">Profile</NavLink>
    
    strict: bool
    如果为 true，则在确定位置是否与当前 URL 匹配时，将考虑位置的路径名后面的斜杠。有关更多信息，请参阅 <Route strict> 文档。
    
        <NavLink strict to="/events/">Events</NavLink>
        
    isActive: func
    添加额外逻辑以确定链接是否处于激活状态的函数。如果你要做的不仅仅是验证链接的路径名与当前 URL 的路径名相匹配，那么应该使用它。
    
        // 只有当事件 id 为奇数时才考虑激活
        const oddEvent = (match, location) => {
          if (!match) {
            return false;
          }
          const eventID = parseInt(match.params.eventID);
          return !isNaN(eventID) && eventID % 2 === 1;
        }
        
        <NavLink to="/events/123" isActive={oddEvent}>Event 123</NavLink>
        
    location: object
    isActive 默认比较当前历史位置（通常是当前的浏览器 URL）。你也可以传递一个不同的位置进行比较。
    
## Prompt

    用于在位置跳转之前给予用户一些确认信息。当你的应用程序进入一个应该阻止用户导航的状态时（比如表单只填写了一半），弹出一个提示。
```jsx harmony
import { Prompt } from 'react-router-dom';

<Prompt
  when={formIsHalfFilledOut}
  message="你确定要离开当前页面吗？"
/>
```

    message: string
    当用户试图离开某个位置时弹出的提示信息。
    
        <Prompt message="你确定要离开当前页面吗？" />
    
    message: func
    将在用户试图导航到下一个位置时调用。需要返回一个字符串以向用户显示提示，或者返回 true 以允许直接跳转。
    
        <Prompt message={location => {
          const isApp = location.pathname.startsWith('/app');
        
          return isApp ? `你确定要跳转到${location.pathname}吗？` : true;
        }} />
        译注：上例中的 location 对象指的是下一个位置（即用户想要跳转到的位置）。你可以基于它包含的一些信息，判断是否阻止导航，或者允许直接跳转。
    
    when: bool
    在应用程序中，你可以始终渲染 <Prompt> 组件，并通过设置 when={true} 或 when={false} 以阻止或允许相应的导航，而不是根据某些条件来决定是否渲染 <Prompt> 组件。
    译注：when 只有两种情况，当它的值为 true 时，会弹出提示信息。如果为 false 则不会弹出。见阻止导航示例。
    
        <Prompt when={true} message="你确定要离开当前页面吗？" />

## MemoryRouter

    将 URL 的历史记录保存在内存中的 <Router>（不读取或写入地址栏）。在测试和非浏览器环境中很有用，例如 React Native。

```jsx harmony
import { MemoryRouter } from 'react-router-dom';

<MemoryRouter>
  <App />
</MemoryRouter>
```

    initialEntries: array
    历史堆栈中的一系列位置信息。这些可能是带有 {pathname, search, hash, state} 的完整位置对象或简单的字符串 URL。
    
        <MemoryRouter
          initialEntries={[ '/one', '/two', { pathname: '/three' } ]}
          initialIndex={1}
        >
          <App/>
        </MemoryRouter>
    
    initialIndex: number
    initialEntries 数组中的初始位置索引。
    
    getUserConfirmation: func
    用于确认导航的函数。当 <MemoryRouter> 直接与 <Prompt> 一起使用时，你必须使用此选项。
    
    keyLength: number
    location.key 的长度，默认为 6。
    
    children: node
    要呈现的单个子元素（组件）。

## Redirect

    使用 <Redirect> 会导航到一个新的位置。新的位置将覆盖历史堆栈中的当前条目，例如服务器端重定向（HTTP 3xx）。

```jsx harmony
import { Route, Redirect } from 'react-router-dom';

<Route exact path="/" render={() => (
  loggedIn ? (
    <Redirect to="/dashboard" />
  ) : (
    <PublicHomePage />
  )
)} />
```

    to: string
    要重定向到的 URL，可以是 path-to-regexp 能够理解的任何有效的 URL 路径。所有要使用的 URL 参数必须由 from 提供。
    
        <Redirect to="/somewhere/else" />

    to: object
    要重定向到的位置，其中 pathname 可以是 path-to-regexp 能够理解的任何有效的 URL 路径。
    
        <Redirect to={{
          pathname: '/login',
          search: '?utm=your+face',
          state: {
            referrer: currentLocation
          }
        }} />
        上例中的 state 对象可以在重定向到的组件中通过 this.props.location.state 进行访问。而 referrer 键（不是特殊名称）将通过路径名 /login 指向的登录组件中的 this.props.location.state.referrer 进行访问。

    push: bool
    如果为 true，重定向会将新的位置推入历史记录，而不是替换当前条目。
    
        <Redirect push to="/somewhere/else" />

    from: string
    要从中进行重定向的路径名，可以是 path-to-regexp 能够理解的任何有效的 URL 路径。所有匹配的 URL 参数都会提供给 to，必须包含在 to 中用到的所有参数，to 未使用的其它参数将被忽略。
    
        只能在 <Switch> 组件内使用 <Redirect from>，以匹配一个位置。有关更多细节，请参阅 <Switch children>。
        
        <Switch>
          <Redirect from='/old-path' to='/new-path' />
          <Route path='/new-path' component={Place} />
        </Switch>
        // 根据匹配参数进行重定向
        <Switch>
          <Redirect from='/users/:id' to='/users/profile/:id' />
          <Route path='/users/profile/:id' component={Profile} />
        </Switch>
        译注：经过实践，发现以上“根据匹配参数进行重定向”的示例存在bug，没有效果。to 中的 :id 并不会继承 from 中的 :id 匹配的值，而是直接作为字符串显示到浏览器地址栏！！！
    
    exact: bool
    完全匹配，相当于 Route.exact。
    
    strict: bool
    严格匹配，相当于 Route.strict。

## Route

    <Route> 可能是 React Router 中最重要的组件，它可以帮助你理解和学习如何更好的使用 React Router。它最基本的职责是在其 path 属性与某个 location 匹配时呈现一些 UI。
```jsx harmony
import { BrowserRouter as Router, Route } from 'react-router-dom';

<Router>
  <div>
    <Route exact path="/" component={Home} />
    <Route path="/news" component={News} />
  </div>
</Router>
```
使用 <Route> 渲染一些内容有以下三种方式：
    
    <Route component>
    <Route render>
    <Route children>
    
三种渲染方式都将提供相同的三个路由属性：
    
    match
    location
    history

### component

    指定只有当位置匹配时才会渲染的 React 组件，该组件会接收 route props 作为属性。
    
    const User = ({ match }) => {
      return <h1>Hello {match.params.username}!</h1>
    }
    
    <Route path="/user/:username" component={User} />
    当你使用 component（而不是 render 或 children）时，Router 将根据指定的组件，使用 React.createElement 创建一个新的 React 元素。
    这意味着，如果你向 component 提供一个内联函数，那么每次渲染都会创建一个新组件。这将导致现有组件的卸载和新组件的安装，而不是仅仅更新现有组件。
    当使用内联函数进行内联渲染时，请使用 render 或 children（见下文）。

### render: func

    使用 render 可以方便地进行内联渲染和包装，而无需进行上文解释的不必要的组件重装。
    
    你可以传入一个函数，以在位置匹配时调用，而不是使用 component 创建一个新的 React 元素。render 渲染方式接收所有与 component 方式相同的 route props。
    
    // 方便的内联渲染
    <Route path="/home" render={() => <div>Home</div>} />
    
    // 包装
    const FadingRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={props => (
        <FadeIn>
          <Component {...props} />
        </FadeIn>
      )} />
    )
    
    <FadingRoute path="/cool" component={Something} />
    警告：<Route component> 优先于 <Route render>，因此不要在同一个 <Route> 中同时使用两者。

### children: func

    有时候不论 path 是否匹配位置，你都想渲染一些内容。在这种情况下，你可以使用 children 属性。除了不论是否匹配它都会被调用以外，它的工作原理与 render 完全一样。
    
    children 渲染方式接收所有与 component 和 render 方式相同的 route props，除非路由与 URL 不匹配，不匹配时 match 为 null。
    这允许你可以根据路由是否匹配动态地调整用户界面。如下所示，如果路由匹配，我们将添加一个激活类：
    
    const ListItemLink = ({ to, ...rest }) => (
      <Route path={to} children={({ match }) => (
        <li className={match ? 'active' : ''}>
          <Link to={to} {...rest} />
        </li>
      )} />
    )
    
    <ul>
      <ListItemLink to="/somewhere" />
      <ListItemLink to="/somewhere-else" />
    </ul>
    这对动画也很有用：
    
    <Route children={({ match, ...rest }) => (
      {/* Animate 将始终渲染，因此你可以利用生命周期来为其子元素添加进出动画 */}
      <Animate>
        {match && <Something {...rest} />}
      </Animate>
    )} />
    警告：<Route component> 和 <Route render> 优先于 <Route children>，因此不要在同一个 <Route> 中同时使用多个。

|参数|类型|说明|
|:---|:---|:---|
|path|string|任何有效的 URL 路径，没有定义 path 的 <Route> 总是会被匹配。|
|exact|bool|如果为 true ，如果为 true，则只有在 path 完全匹配 location.pathname 时才匹配。|
|strict|bool|如果为 true，则具有尾部斜杠的 path 仅与具有尾部斜杠的 location.pathname 匹配。当 location.pathname 中有附加的 URL 片段时，strict 就没有效果了。|
|location|object|当你需要将 <Route> 与当前历史位置以外的 location 进行匹配时，此功能非常有用。|
|sensitive|bool|如果为 true，进行匹配时将区分大小写。|

    警告：可以使用 strict 来强制规定 location.pathname 不能具有尾部斜杠，但是为了做到这一点，strict 和 exact 必须都是 true。
    
    如果一个 <Route> 被包含在一个 <Switch> 中，并且需要匹配的位置（或当前历史位置）传递给了 <Switch>，那么传递给 <Route> 的 location 将被 <Switch> 所使用的 location 覆盖。

## Router

所有 Router 组件的通用低阶接口。通常情况下，应用程序只会使用其中一个高阶 Router：

    <BrowserRouter>
    <HashRouter>
    <MemoryRouter>
    <NativeRouter>
    <StaticRouter>
    
使用低阶 <Router> 的最常见用例是同步一个自定义历史记录与一个状态管理库，比如 Redux 或 Mobx。请注意，将 React Router 和状态管理库一起使用并不是必需的，它仅用于深度集成。

```jsx harmony
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

<Router history={history}>
  <App />
</Router>
```
参数说明：

    history: object
    用于导航的历史记录对象。
    
    import createBrowserHistory from 'history/createBrowserHistory';
    
    const customHistory = createBrowserHistory();
    
    <Router history={customHistory} />
    
    children: node
    要呈现的单个子元素（组件）。
    
    <Router>
      <App />
    </Router>

## StaticRouter

    一个永远不会改变位置的 <Router>。
    这在服务器端渲染场景中非常有用，因为用户实际上没有点击，所以位置实际上并未发生变化。因此，名称是 static（静态的）。
    当你只需要插入一个位置，并在渲染输出上作出断言以便进行简单测试时，它也很有用。

以下是一个示例，node server 为 <Redirect> 发送 302 状态码，并为其它请求发送常规 HTML：
```jsx harmony
import { createServer } from 'http';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';

createServer((req, res) => {
  // 这个 context 对象包含了渲染的结果
  const context = {};

  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  // 如果使用 <Redirect>，context.url 将包含要重定向到的 URL
  if (context.url) {
    res.writeHead(302, {
      Location: context.url
    });
    res.end();
  } else {
    res.write(html);
    res.end();
  }
}).listen(3000);
```

参数说明

    basename: string
    所有位置的基准 URL。basename 的正确格式是前面有一个前导斜杠，但不能有尾部斜杠。
    
    <StaticRouter basename="/calendar">
      <Link to="/today" />
    </StaticRouter>
    上例中的 <Link> 最终将被呈现为：
    
    <a href="/calendar/today" />
    location: string
    服务器收到的 URL，可能是 node server 上的 req.url。
    
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
    location: object
    一个形如 {pathname, search, hash, state} 的位置对象。
    
    <StaticRouter location={{ pathname: '/bubblegum' }}>
      <App />
    </StaticRouter>
    context: object
    一个普通的 JavaScript 对象。在渲染过程中，组件可以向对象添加属性以存储有关渲染的信息。
    
    const context = {};
    
    <StaticRouter context={context}>
      <App />
    </StaticRouter>
    当一个 <Route> 匹配时，它将把 context 对象传递给呈现为 staticContext 的组件。查看服务器渲染指南以获取有关如何自行完成此操作的更多信息。
    
    渲染之后，可以使用这些属性来配置服务器的响应。
    
    if (context.status === '404') {
      // ...
    }
    children: node
    要呈现的单个子元素（组件）。

## Switch

    用于渲染与路径匹配的第一个子 <Route> 或 <Redirect>。
    所有 <Switch> 的子元素都应该是 <Route> 或 <Redirect>。只有第一个匹配当前路径的子元素将被呈现。
    
```jsx harmony
import { Switch, Route } from 'react-router';

<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/:user" component={User} />
  <Route component={NoMatch} />
</Switch>
```

## history

以下术语我们会经常使用：

    browser history - 针对 DOM 环境，用于支持 HTML5 history API 的浏览器
    hash history - 针对 DOM 环境，用于传统的旧式（低版本） 浏览器
    memory history - history 在内存上的实现，用于测试以及 React Native 等非 DOM 环境

history 对象通常具有以下属性和方法：

    length - number 历史堆栈中的条目数
    action - string 当前的导航操作（push、replace 或 pop）
    location - object 当前访问的位置信息，可能具有以下属性：
        pathname - string URL 路径
        search - string URL 中的查询字符串
        hash - string URL 中的 hash 片段
        state - object 存储至 location 中的额外状态数据，仅在 browser history 和 memory history 中有效。
    push(path, [state]) - function 将一个新条目推入到历史堆栈中
    replace(path, [state]) - function 替换历史堆栈中的当前条目
    go(n) - function 将历史堆栈中的指针移动 n 个条目
    goBack() - function 返回到上一个页面，相当于 go(-1)
    goForward() - function 进入到下一个页面，相当于 go(1)
    block(prompt) - function 阻止导航（请参阅 history 文档）
    
## location
    
    location 代表应用程序的位置。如当前的位置，将要去的位置，或是之前所在的位置。它看起来像这样：
```
{
  key: 'ac3df4', // 使用 hash history 时，没有这个属性
  pathname: '/somewhere'
  search: '?some=search-string',
  hash: '#howdy',
  state: {
    [userDefined]: true
  }
}
```    
Router 将在以下几个地方为您提供一个 location 对象：
    
    在 Route component 中，以 this.props.location 方式获取
    在 Route render 中，以 ({ location }) => () 方式获取
    在 Route children 中，以 ({ location }) => () 方式获取
    在 withRouter 中，以 this.props.location 方式获取
    
## match

一个 match 对象包含有关 <Route path> 如何匹配 URL 的信息。它具有以下属性：

    params - object 根据 path 中指定的动态片段，从 URL 中解析出的键值对
    isExact - boolean 如果整个 URL 匹配（不包含尾随字符），则为 true
    path - string 用于匹配的路径模式。可用于构建嵌套的 <Route>
    url - string URL 的匹配部分。可用于构建嵌套的 <Link>

您可以在以下几个地方访问 match 对象：

    在 Route component 中，以 this.props.match 方式获取
    在 Route render 中，以 ({ match }) => () 方式获取
    在 Route children 中，以 ({ match }) => () 方式获取
    在 withRouter 中，以 this.props.match 方式获取
    matchPath 的返回值

如果 <Route> 没有定义 path，并因此始终匹配，则会得到最接近的父匹配。withRouter 也是一样。    
    
## matchPath

    在正常的渲染周期之外，你可以使用和 <Route> 所使用的相同的匹配代码，例如在服务器上呈现之前收集数据依赖关系。
```jsx harmony
import { matchPath } from 'react-router';

const match = matchPath('/users/123', {
  path: '/users/:id',
  exact: true,
  strict: false
});
``` 

    pathname
    第一个参数是要匹配的路径名。如果您在服务器上通过 Node.js 使用，它将是 req.path。
    
    props
    第二个参数是匹配的属性，它们与 <Route> 接受的匹配属性相同：
    
    {
      path, // 例如 /users/:id
      strict, // 可选，默认为 false
      exact // 可选，默认为false
    }
    
## withRouter

    你可以通过 withRouter 高阶组件访问 history 对象的属性和最近（UI 结构上靠的最近）的 <Route> 的 match 对象。
    当组件渲染时，withRouter 会将更新后的 match、location 和 history 传递给它。  
    
    
    
    
    
    
    
