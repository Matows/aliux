import { createApp } from 'vue';
import App from './App.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHashtag, faPlus, faClipboard, faTrash, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import './registerServiceWorker';

import VueScreen from 'vue-screen';

library.add(faHashtag, faPlus, faClipboard, faTrash, faSyncAlt);

createApp(App)
  .use(VueScreen, 'bulma')
  .component('fa-icon', FontAwesomeIcon)
  .mount('#app');
