
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  proxy:{
    "/api":{
      'target':'http://ec2-52-53-188-202.us-west-1.compute.amazonaws.com:8088',
      'changeOrigin':true,
      'pathRewrite':{'^/api':''},
    }
  },
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
        {path:'/team',exact:true,component:'../pages/team'},
        {path:'/test',exact:true,component:'../pages/test'}
      ]
    }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'test',
      dll: false,    
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
}
