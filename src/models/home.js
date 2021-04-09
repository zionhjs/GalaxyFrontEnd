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
          {title:'Interior Rendering',imgUrl:'banner1.jpeg',desc:'A powerful tool for conveying design concepts and getting eye-catching visuals for pre-selling real estate.CGI can bring any idea to life and allows the impossible:showcasing the space layout,zoning,materials,textures,colors,lighting,furniture,decor choices,etc.Furthermore,professional CG imagery looks like a piece of art.It`s beautiful,photoreal,filled with atmosphere -- a perfect marketing asset.'},
          {title:'MasterPlan Rendering',imgUrl:'banner2.jpeg',desc:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'},
          {title:'Exterior Rendering',imgUrl:'banner3.jpeg',desc:'A CGI solution that revolutionized architecture and real estate business.For exterior visualization allowed showing buildings of any type or scale before the construction is even scheduled.With photoreal exterior renders,Architects and Developers have no truble getting their ideas across to clients,contractors and contest jurors.Fancy villas,charming old mansions,stunning skyscrapers,and restaurants --exterior rending services can bring them to life.'},
          {title:'CG Animation',imgUrl:'banner4.jpeg',desc:'A key that unlocks viewer`s hearts and ignites their imagination.The architectural movie takes the audience on a tour around the property as if it were already build.It shows surroundings,exterior design,walks and viewer through the building.Moreover,Architectural animation can show how furniture works in motion,demonstrates the perfection of the layout and every interior detail,even lets savor the incredible views from the window.This highly immersive visual tool is a real competitive edge for property marketing and presentations.'},
          {title:'3D Interior Visualization',imgUrl:'banner5.jpeg',desc:'Al-powered 3D rendering will take your project development to the next level -same-day start,l-week delivery,and breathtaking results.Our big team of experienced and creative 3D artists is always ready to turn your interior design ideas into masterpieces.'}
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
          stillImages: ['swf1.jpg', 'swf2.jpg', 'swf3.jpg', 'swf4.jpg', 'swf5.jpg'],
          aniImages:['wf1.png', 'wf2.png', 'wf3.png', 'wf4.png', 'wf5.png'],
    },
    reducers:{
      
    },
    effects:{
    }
}
