if Rails.env == 'production'
  Rails.application.config.session_store :cookie_store, key: '_rol_charts_app', domain: 'https://rol-charts.herokuapp.com/'
else
  Rails.application.config.session_store :cookie_store, key: '_rol_charts_app'
end