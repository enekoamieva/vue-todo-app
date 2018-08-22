import Notes from './components/Notes';
import Home from './components/Home';
import UserInfo from './components/UserInfo';


const routes = [
    { path: '/notes', component: Notes, name: 'notes', meta:{ auth: true } },
    { path: '/', component: Home, name: '', meta:{ auth: false } },
    { path: '/user', component: UserInfo, name: '', meta:{ auth: true } },
    { path: '*', component: Home, name: 'error' },
];

export default routes;