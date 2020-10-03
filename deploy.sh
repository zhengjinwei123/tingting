#!/bin/sh

export GOROOT=/usr/local/go
export GOPATH=/data/deploy/projects/tingting/server
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin

PROJ_DIR=/data/deploy/projects/tingting
SERVER_DIR=/data/deploy/projects/tingting/server/src/YUT
echo -e "stop server"
cd /data/deploy/projects
sh start.sh stop

echo -e "pulling code.."

cd $PROJ_DIR/server

git reset --hard
git pull

make clean
make


if [ -f $RPOJ_DIR/server/bin/YUT ];
then
    echo -e "build yut success..."
else
    echo -e "build yut fail..."
    #exit 0
fi


cd $SERVER_DIR


cd /data/deploy/projects

echo -e "restart yut server.."

./start.sh start

echo -e "----------------build client----------------------------"

cd $PROJ_DIR
yarn install
yarn run dist

if [ ! -d "$PROJ_DIR" ];
then
    echo -e "build client fail"
    exit
fi

echo -e "rsync file to /data/web"
rsync -av --delete $PROJ_DIR/dist /data/web
mv /data/web/dist/index.html /data/web/
