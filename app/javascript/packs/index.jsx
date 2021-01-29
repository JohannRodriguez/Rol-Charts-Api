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
import character_es from '../translations/es/character/character.json';
import characters_es from '../translations/es/character/characters.json';
import dashboard_es from '../translations/es/user/dashboard.json';
import destroy_es from '../translations/es/global/destroy.json';
import email_es from '../translations/es/email/email.json';
import login_es from '../translations/es/user/login.json';
import months_es from '../translations/es/user/months.json';
import navbar_es from '../translations/es/global/navbar.json';
import new_character_es from '../translations/es/character/new_character.json';
import register_es from '../translations/es/user/register.json';
import settings_es from '../translations/es/user/settings.json';
import sex_es from '../translations/es/user/sex.json';

const getLang = session => {
  if (session.lang) {
    return session.lang
  } else {
    const languages = ['es', 'en'];
    for (let index = 0; index < languages.length; index++) {
      if (navigator.language.split('-').includes(languages[index])) {
        return languages[index];
      }
    }
    return 'en';
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const session = await api_call('GET', '/api/v1/log_status');
  const app = document.createElement('div');
  app.className = 'app';
  i18next.init({
    interpolation: { escapeValue: false, },
    lng: getLang(session),
    resources: {
      es: {
        all_fields: all_fields_es,
        authenticate: authenticate_es,
        character: character_es,
        characters: characters_es,
        dashboard: dashboard_es,
        destroy: destroy_es,
        email: email_es,
        login: login_es,
        months: months_es,
        navbar: navbar_es,
        new_character: new_character_es,
        register: register_es,
        settings: settings_es,
        sex: sex_es,
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
    document.body.appendChild(app),
  )
})