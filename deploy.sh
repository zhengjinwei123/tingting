#!/bin/shPROJ_DIR=/data/deploy/tingtingif [ -d "$PROJ_DIR"/dist ]then    rm -rf "$PROJ_DIR"/distficd $PROJ_DIRyarn installyarn run distif [ ! -d "$PROJ_DIR/dist" ];then    echo -e "build client fail"    exit 1firsync -av --delete $PROJ_DIR/dist /data/webmv /data/web/dist/index.html /data/web/