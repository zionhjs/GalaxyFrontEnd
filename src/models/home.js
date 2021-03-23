/*
 * @Author: xingzai
 * @Date: 2020-12-10 01:19:41
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-10 01:19:41
 * @FilePath: \GalaxyFrontEnd\src\models\home.js
 */
import {getImages} from '../service/api'
export default {
    namespace:'home',
    state:{
        banners: [
          {title:'Interior Rendering',imgUrl:'banner1.jpeg',desc:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'},
          {title:'MasterPlan Rendering',imgUrl:'banner2.jpeg',desc:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'},
          {title:'Exterior Rendering',imgUrl:'banner3.jpeg',desc:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'},
          {title:'Animations',imgUrl:'banner4.jpeg',desc:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'},
          {title:'360 Visualizations',imgUrl:'banner5.jpeg',desc:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'}
          ],
        profiles: [{ imgUrl: 'profile1.jpeg', title: 'Interior rendering', desc: 'Sed ut perspiciatis unde iste natus',route:'/image',nav:0 },
        { imgUrl: 'profile2.jpeg', title: 'Exterior rendering', desc: 'Sed ut perspiciatis unde iste natus',route:'/image',nav:1 },
        { imgUrl: 'profile3.jpeg', title: 'Architectural Animation', desc: 'Sed ut perspiciatis unde iste natus',route:'/animation',nav:3 }],
        illustration: {
            imgUrl: 'profile.jpeg', title: 'CGI ILLUSTRATION WITHOUT LIMITS', list: [
              { title: '24-Hour Estimate', text: 'we serves immediately visualization quotations 24 hours a day,365 a year', icon: 'estime.png' },
              { title: '100% On Time Delivery', text: 'Our Delivery always on time,never mess up your presentation.We late,you don\'t pay.', icon: 'deliver.png' },
              { title: 'Match Expectations', text: 'Depends on the budget,we provide different quality of works.What we showed you we can do,we do it for you!', icon: 'expectation.png' }
            ]
          },
          stillImages: ['wf1.png', 'wf2.png', 'wf3.png', 'wf4.png', 'wf5.png'],
          aniImages:['wf1.png', 'wf2.png', 'wf3.png', 'wf4.png', 'wf5.png'],
    },
    reducers:{
      
    },
    effects:{
    }
}
