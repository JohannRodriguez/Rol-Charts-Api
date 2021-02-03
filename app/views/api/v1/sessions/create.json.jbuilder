json.status 'SUCCESS'
json.log 'LOGGED_IN'
json.user do
  json.id @user.id
  json.username @user.username
  json.status @user.status
  json.email @user.email
  json.gender @user.gender
  json.birthday @user.birthday
end
json.characters @user.characters.all.collect(&:name)