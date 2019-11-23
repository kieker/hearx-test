
import detailsForm from './detailsForm';
import pageNotFound from './pageNotFound';
import download from '../components/download';
import theTest from '@/components/theTest';
import results from '@/components/results';
const routes = [
    { path: "*", component: pageNotFound   },
    { path: '/', component: download},
    { path: '/details', component: detailsForm},
    { path: '/test', component: theTest},
    { path: '/results', component: results},
    
];

export default routes;