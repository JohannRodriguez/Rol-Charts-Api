// Import Packages
import { BrowserRouter, Route } from 'react-router-dom';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import React from 'react'
import ReactDOM from 'react-dom'

// Import Components
import api_call from '../api/api_call';
import App from '../components/App'

// Import Resources
// Resources Languages
import login_en from '../translations/en/user/login.json';

import all_fields_es from '../translations/es/user/all_fields.json';
import authenticate_es from '../translations/es/user/authenticate.json';
import destroy_es from '../translations/es/global/destroy.json';
import login_es from '../translations/es/user/login.json';
import settings_es from '../translations/es/user/settings.json';

const getLang = session => {
  let lang = session.lang;
  if (lang) {
    return lang
  } else {
    switch (navigator.language.split('-')[0]) {
      case 'es':
      case 'en':
        lang = navigator.language.split('-')[0];
        break;
      default:
        lang = 'en';
        break;
    }
  }
  return lang;
}

document.addEventListener('DOMContentLoaded', async () => {
  const session = await api_call('GET', '/api/v1/log_status');
  i18next.init({
    interpolation: { escapeValue: false, },
    lng: getLang(session),
    resources: {
      es: {
        all_fields: all_fields_es,
        authenticate: authenticate_es,
        destroy: destroy_es,
        login: login_es,
        settings: settings_es,
      },
      en: {
        login: login_en,
        settings: settings_es,
      },
    },
  });

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