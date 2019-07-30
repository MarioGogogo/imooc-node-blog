#!/bin/sh
echo "寻找日志文件夹"
cd /Users/lovewcc/Documents/02_Project/03_My/nodejs/blog-demo/src/log
echo "拆分日志"
cp access.log $(date +%Y-%m-%d-%H).access.log
echo "清空日志脚本"
echo "" > access.log


