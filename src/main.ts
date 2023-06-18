import {createApp} from 'vue';
import App from './App.vue';
import router from './router'

//--- Fontawesome
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {faTable, faImage} from '@fortawesome/free-solid-svg-icons';

library.add(faTable, faImage);

const app = createApp(App);

app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app')
