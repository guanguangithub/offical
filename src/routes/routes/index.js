import { Home, Car, Question, Type, Picture, Color } from '../../view/index.js'

const routes = [
  {
    path:'/Home',
    component:Home
  },
  {
    path:'/car/:id',
    component:Car
  },
  {
    path:'/question',
    component:Question
  },
  {
    path:'/type',
    component:Type
  },
  {
    path:'/picture',
    component:Picture
  },
  {
    path:'/color',
    component:Color
  },
]
  

export default routes