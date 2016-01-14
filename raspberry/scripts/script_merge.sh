#!/bin/bash

while [ 1 ];do

   rm file_out_r1.txt file_out_r2.txt file_out_r3.txt

   wget http://192.168.1.121/file_out_r1.txt
   wget http://192.168.1.122/file_out_r2.txt
   wget http://192.168.1.123/file_out_r3.txt

   /home/pi

   sleep 3
done;