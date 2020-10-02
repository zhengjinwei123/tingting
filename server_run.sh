#!/bin/sh
SERVER_DIR=/data/deploy/projects/tingting/server/src/YUT
PIDFILE=/data/deploy/projects/yut.pid

if [ -f $PIDFILE ];
then
    pid=$(cat $PIDFILE)
    echo "server is running.pid[$pid]"

    if [[ $1 = 'stop' ]];
    then
        echo -e "stop server pid:$pid"
        kill $pid
        rm -rf $PIDFILE
        exit 0
    elif [[ $1 = 'restart' ]];
    then
        echo -e "restart server pid:$pid"

        kill $pid
        rm -rf $PIDFILE
    else
        exit 0
    fi
fi


DST_FILE="$SERVER_DIR"/YUT

if [ ! -f "$DST_FILE" ];
then
    echo -e "bin yut not found,please run `go build`."
fi


cd $SERVER_DIR

echo -e "start run YUT server..."

nohup ./YUT >/dev/null 2>> ./error.log &


while [ ! -f $PIDFILE ]
do
    pid=$(ps -ef | grep YUT | grep -v grep | awk '{print $2}')
    if [ -n "$pid" ];
    then
        echo "server yut start success: pid[$pid]"
        echo $pid > $PIDFILE
        break
    fi
done

sleep 3
lsof -i:9000
lsof -i:8089
