#!/bin/bash

sudo airmon-ng start wlan0

while [ 1 ]; do
rm nohup.txt airo-01.cap airo-01.kismet.csv airo-01.csv airo-01.kismet.netxml

nohup airodump-ng --band "abg" --write airo --berlin 20 -f 200 mon0 &
sleep 3
rm nohup.out nohup.txt airo-01.cap airo-01.kismet.csv airo-01.csv airo-01.kismet.netxml

for compteur in `seq 1 100`; do
    /home/pi/prgm
    rm /var/www/html/file_out_r3.txt
    mv file_out_r3.txt /var/www/html
    echo $computer
    sleep 3;
done;
done;