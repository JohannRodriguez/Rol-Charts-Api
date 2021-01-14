json.loged_in 'LOGGED_IN'
json.user do
  json.id @current_user.id
  json.username @current_user.username
  json.status @current_user.status
  json.email @current_user.email
end
