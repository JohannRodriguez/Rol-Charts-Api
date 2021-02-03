if Rails.env === 'production'
  Rails.application.config.session_store :cookie_store, key: '_rol_page_app', domain: 'rol-page.herokuapp.com'
else
  Rails.application.config.session_store :cookie_store, key: '_rol_page_app'
end