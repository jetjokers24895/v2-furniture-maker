#!/bin/sh
todo=$1
current=/home/jetjoker/JETDIRECTORY/myproject/furniture-maker/v2-furniture-maker/config/environments/development/database.json
local=/home/jetjoker/JETDIRECTORY/myproject/furniture-maker/v2-furniture-maker/config/environments/development/database-local.json
vps=/home/jetjoker/JETDIRECTORY/myproject/furniture-maker/v2-furniture-maker/config/environments/development/database-vps.json

if [ $todo = "deploy" ];then
    echo "it's deploy"

    mv -f /home/jetjoker/JETDIRECTORY/myproject/furniture-maker/v2-furniture-maker/config/environments/development/database.json /home/jetjoker/JETDIRECTORY/myproject/furniture-maker/v2-furniture-maker/config/environments/development/database-local.json
    mv -f /home/jetjoker/JETDIRECTORY/myproject/furniture-maker/v2-furniture-maker/config/environments/development/database-vps.json /home/jetjoker/JETDIRECTORY/myproject/furniture-maker/v2-furniture-maker/config/environments/development/database.json
fi

if [ $todo = "dev" ];then
    echo "it's not deploy"
    mv -f /home/jetjoker/JETDIRECTORY/myproject/furniture-maker/v2-furniture-maker/config/environments/development/database.json /home/jetjoker/JETDIRECTORY/myproject/furniture-maker/v2-furniture-maker/config/environments/development/database-vps.json
    mv -f /home/jetjoker/JETDIRECTORY/myproject/furniture-maker/v2-furniture-maker/config/environments/development/database-local.json /home/jetjoker/JETDIRECTORY/myproject/furniture-maker/v2-furniture-maker/config/environments/development/database.json
fi
