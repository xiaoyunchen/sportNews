import Vue from 'vue'
import Router from 'vue-router'
import pageRouterList from './config'

Vue.use(Router);

const SportsPage = () => import('$pages/sports');
const NewsPage = () => import('$pages/news');
const PhotosPage = () => import('$pages/photos');
const VideosPage = () => import('$pages/videos');
const CBAVideosPage = () => import('$pages/cbaVideos');

export default new Router({
  mode: 'history',
  base: pageRouterList.baseRoute,
  routes: [
    {
      path: '',
      name: 'Default',
      component: SportsPage
    },
    {
      path: pageRouterList.sports,
      name: 'sports',
      component: SportsPage
    },
    {
      path: pageRouterList.news,
      name: 'news',
      component: NewsPage
    },
    {
      path: pageRouterList.photos,
      name: 'photos',
      component: PhotosPage
    },
    {
      path: pageRouterList.videos,
      name: 'videos',
      component: VideosPage
    },
    {
      path: pageRouterList.cbaVideos,
      name: 'cbaVideos',
      component: CBAVideosPage
    },
    { // 其他入口
      path: '/*',
      redirect: '/',
    },
  ],
  scrollBehavior() { // to, from, savedPosition
    return { x: 0, y: 0 }
  }
})