#####
1. 文章详情输入框右边的数字是什么意思。
2. 标签如果多于3个怎么排列。
3. 图片如果不只2张怎么排列
######
第一步创建store
import { createStore } from "redux"
const store = createStore(reducer)
这里的recucer是像这样子的函数
const reducer = (state, payload) => {
  switch (action.type) {
    case 'add_article':
      return {
        ...state,
        articles: state.articles.concat(payload.text),
      }
  }
  return state
}
在组件里我们可以通过dispatch({type:'add_article',{text:'123'}})这样子,调用了dispatch它就会通过reducer改变了状态，就是store里的state
在根组件最外层包一个Provider
  <Provider store={store}>
    <App />
  </Provider>
  第二步通过connect把组件和store连接起来
  connect接受2个参数，第一个mapStateToProps,第二个mapDispatchToProps这2个参数都是函数，第一个mapStateToProps作用是把store的state映射到组件的props
  它接受state作为参数返回一个对象，这个对象的属性和组件里可以使用的属性是一样的，比如
  const mapStateToProps = state => {
  return {
    articles: state.articles,
  }
}
在组件里面就可以这样子获取状态，this.props.articles
connect的第二个参数mapDispatchToProps也是个函数，这个函数接受dispatch作为参数返回一个函数，例如
const mapDispatchToProps = dispatch => {
  return {
    saveArticle: article => dispatch(addArticle(article)),
  }
}
然后组件里就可以这样调用this.props.saveArticle("你的数据")
其中这个addArticle(article)是个actionCreator,要了解这个actionCreator，首先给你解释下什么是action
action其实是一个对象，像这样子的对象{type:'',payload:''},这个action是用来dispatch到store来改变store的状态的，然后actionCreator是个函数之所以要用这个函数主要是为了代码的复用，
比如有一个action是{type:'add_acticle',"aaa"},然后有一个action是{type：'add_article','bbbbb'},这样你需要创建很多个action，这时你就可以这样使用cosnt addArticle=(article)=>{type:'add_article',article}然后你dispatch的事就就可以这样使用dispatch(addArticle(article)),
上面讲的是同步的reduce,如果用到了异步比如请求后台数据，就要使用中间件了，例如redux-thunk
同步dispatch的时候它接受的
