#!/usr/bin/bash

source $HOME/.bashrc 

cd "$(dirname "$0")"
echo "$(pwd)"

if [ ! -d "./temp" ]; then
    mkdir "./temp"
fi

if [ ! -d "./log" ]; then
    mkdir "./log"
fi

export all_proxy=http://10.8.14.213:7890
git pull
unset all_proxy

if [ -f "./temp/backend.pid" ]; then
    kill $(cat ./temp/backend.pid)
    rm -f ./temp/backend.pid
fi

if [ -f "./temp/frontend.pid" ]; then
    kill $(cat ./temp/frontend.pid)
    rm -f ./temp/frontend.pid
fi

sleep 5

# export PATH=/work/stu/dwfeng/tools/build/local/node/bin:$PATH
cd backend
npm install
nohup node server.js > ../log/backend.log 2>&1 &
echo $! > ../temp/backend.pid

cd ../frontend
npm install
nohup npm run serve > ../log/frontend.log 2>&1 &
echo $! > ../temp/frontend.pid
