Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:3000'
    resource '*', headers: :any, methods: [:get, :post, :patch, :delete, :head], creadentials: true
  end
  allow do
    origins 'https://rol-charts.herokuapp.com/'
    resource '*', headers: :any, methods: [:get, :post, :patch, :delete, :head], creadentials: true
  end
end