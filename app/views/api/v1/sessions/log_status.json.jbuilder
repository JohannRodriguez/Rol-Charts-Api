json.log 'LOGGED_IN'
json.user do
  json.id @current_user.id
  json.username @current_user.username
  json.status @current_user.status
  json.email @current_user.email
end
json.characters @current_user.characters.all.collect(&:name)
