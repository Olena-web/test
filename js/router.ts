import { Home } from './views/Home';
import { Audiocall } from './views/Audiocall';
import { Login } from './views/Login';
import { Error } from './views/Error';
import { Manual } from './views/Manual';
import { Sprint } from './views/Sprint';
import { Statistics } from './views/Statistics';
import { Route } from './types';

function navigation() {

  const app = document.getElementById('app');

  const homeComponent = new Home();
  const loginComponent = new Login();
  const manualComponent = new Manual();
  const audiocallComponent = new Audiocall();
  const sprintComponent = new Sprint();
  const statisticsComponent = new Statistics();

  const routes = [
    { path: '/', component: homeComponent, },
    { path: '/login/', component: loginComponent, },
    { path: '/manual/', component: manualComponent, },
    { path: '/audiocall/', component: audiocallComponent, },
    { path: '/sprint/', component: sprintComponent, },
    { path: '/statistics/', component: statisticsComponent, },
  ];

  // find current location by url in the browser

  const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';

  // find component that corresponds to the current location

  const findComponentByPath = (url: string, urls: Route[]) => urls.find(route => route.path.match(url)) || undefined;

  const router = async () => {

    // find the component based on the current path
    const path = parseLocation();
    
    let componentFound = <Route>findComponentByPath(path, routes) || {};
    if (componentFound == null) {

      let errorComponent = new Error;

      (<HTMLElement>app).innerHTML = await errorComponent.getHtml();
      
    } else {

      // Render the component in the "app" placeholder
    (<HTMLElement>app).innerHTML = await componentFound.component.getHtml();
    }     
    
  };

  window.addEventListener('hashchange', router);
  window.addEventListener('load', router);
  const events = ['load', 'hashchange'];
  [...events].forEach(event => {
    window.addEventListener(event, e => {
      const hashClicked = location.hash;

      switch(hashClicked) {
        case ('#/login/'): 
          //TODO: add functions with login features
          console.log('We are in login view');
          break;
        case ('#/manual/'): 
          //TODO: add functions with manual
          console.log('We are in manual view');
          break;
        case ('#/audiocall/'): 
          //TODO: add functions with manual
          console.log('We are in audiocall view');
          break;
        case('#/sprint/'):
          //TODO: add functions with manual
          console.log('We are in sprint view');
          break;
        case('#/statistics'):
          //TODO: add functions with manual
          console.log('We are in statistics view');
          break;
      } 
    });
  })
}

export { navigation }