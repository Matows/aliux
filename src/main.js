import { createApp } from 'vue';
import App from './App.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHashtag, faPlus, faClipboard, faTrash, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import './registerServiceWorker';

library.add(faHashtag, faPlus, faClipboard, faTrash, faSyncAlt);

createApp(App)
  .component('fa-icon', FontAwesomeIcon)
  .mount('#app');
