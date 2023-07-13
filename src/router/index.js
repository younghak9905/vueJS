
import { createRouter,createWebHistory} from "vue-router";
import HomePage from '../pages/index.vue'
import PostPage from '../pages/post/post.vue'
import PostListPage from '../pages/post/postList.vue'
import GptPage from '../pages/gpt/gpt.vue'
import TestPage from '../pages/test.vue'
import LoginPage from '../pages/login.vue'

const router= createRouter({
    history: createWebHistory(),
    routes:[
        {
            path: '/',
            name: 'Home',
            component: HomePage
        },
        {
            path: '/post/:postNum',
            name: 'Post',
            component: PostPage
        },
        {
            path: '/postList',
            name: 'PostList',
            component: PostListPage
        },
        {
            path: "/gpt",
            name: "gptPage",
            component: GptPage
        },
        {
            path:"/test",
            name:"test",
            component: TestPage
        },
        {
          path: "/login",
          name: "login",
          component: LoginPage  
        }


        ]
});
//1 /home /post  /postList /gpt /mypage

export default router;