json.status 'SUCCESS'
json.log 'LOGGED_IN'
json.user do
  json.id @current_user.id
  json.username @current_user.username
  json.status @current_user.status
  json.email @current_user.email
  json.gender @current_user.gender
  json.birthday @current_user.birthday
end
json.characters @current_user.characters.all.collect(&:name)