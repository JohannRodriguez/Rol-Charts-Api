// Import Packages
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import { default as api } from 'axios';

// Import Components
import App from '../components/App'
import api_call from '../api/api_call';

// Import Resources
// Resources Languages
import login_en from '../translations/en/user/login.json';
import login_es from '../translations/es/user/login.json';
import something_es from '../translations/es/something.json';
import global_es from '../translations/es/global.json';
import something_en from '../translations/en/something.json';
import global_en from '../translations/en/global.json';

i18next.init({
  interpolation: { escapeValue: false, },
  lng: 'es',
  resources: {
    es: {
      login: login_es,
      global: global_es,
      something: something_es,
    },
    en: {
      login: login_en,
      global: global_en,
      something: something_en,
    },
  },
});

document.addEventListener('DOMContentLoaded', async () => {
  const session = await api_call('GET', '/api/v1/log_status');
  ReactDOM.render(
    <I18nextProvider i18n={i18next}>
      <BrowserRouter>
        <Route path='/' render={() => (
          <App session={session}/>
        )} />
      </BrowserRouter>
    </I18nextProvider>,
    document.body.appendChild(document.createElement('div')),
  )
})