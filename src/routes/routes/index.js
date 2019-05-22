import { Home, Car, Question } from '../../view/index.js'

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
]
export default routes