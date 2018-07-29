todo = $1
if [todo = 'deploy'];then 
    mv ./config/environments/development/database.json database-local.json
    mv ./config/environments/development/database-vps.json database.json
else
    mv ./config/environments/development/database.json database-vps.json
    mv ./config/environments/development/database-local.json database.json
fi