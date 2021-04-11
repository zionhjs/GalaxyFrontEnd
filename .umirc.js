
// ref: https://umijs.org/config/
import px2rem from 'postcss-plugin-px2rem';
export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        {path:'/',redirect:'/home',exact:true},
        {path:'/home',exact:true,component:'../pages/home'},
        {path:'/image',exact:true,component:'../pages/image'},
        {path:'/animation',exact:true,component:'../pages/animation'},
        {path:'/blogs',exact:true,component:'../pages/blogs'},
        {path:'/blogDetail',exact:true,component:'../pages/blogDetail'},
        {path:'/editBlog',exact:true,component:'../pages/editBlog'},
        {path:'/addArticle',exact:true,component:'../pages/AddArticle'},
        {path:'/team',exact:true,component:'../pages/team'},
        {path:'/hidden/image-quotation',exact:true,component:'../pages/Hidden'},
        {path:'/hidden/animation-quotation',exact:true,component:'../pages/AnimationHidden'},
        {path:'/test',exact:true,component:'../pages/test'}
      ]
    },
  ],
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'test',
      dll: false, 
      hd:true,   
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  extraPostCSSPlugins: [
    px2rem({
      rootValue: 256,//开启hd后需要换算：rootValue=designWidth*100/750,此处设计稿为1920，所以1920*100/750=256
      propBlackList:['border','border-top','border-left','border-right','border-bottom','border-radius'],//这些属性不需要转换
      selectorBlackList:['t_npx']//以包含t_npx的class不需要转换
    })
  ],
}
