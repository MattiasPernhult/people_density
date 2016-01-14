## Raspberry
This two folders contain c code and script files used on the Raspberry Pi.

One of the Raspberry needs to be a master, we made the Raspberry 3 a master.

### Installation
Each Raspberry needs to have **apache** and **aircrack-ng** installed otherwise it wont work. Apache is needed to make the Raspberry a http server and aircrack-ng is needed to allow the raspberry to get the MAC addresses and the signal strength.

Also the master Raspberry needs to have golang installed.

### Set up static ip
You also need to configure your router to assign static ip to each Raspberry and then modify the **script_merge.sh** like this:
```bash
#!/bin/bash

while [ 1 ];do

   rm file_out_r1.txt file_out_r2.txt file_out_r3.txt
   
   # Static ip of Raspberry 1
   wget <static-ip>/file_out_r1.txt
   # Static ip of Raspberry 2
   wget <static-ip>/file_out_r2.txt
   # Static ip of Raspberry 3
   wget <static-ip>/file_out_r3.txt

   /home/pi/collect

   sleep 3
done;
```

The master Raspberry should have this file.

### code
This folder contains the c code. Each Raspberry needs to have a copy of the **main_rX.c** file.

The master Raspberry needs to have a copy of the collect.c file.

**All these files must be in the $HOME directory on the Raspberry.**

Then the master Raspberry needs to have a copy of the file_watcher written in golang. This file is in the file_watcher folder for this repository.

For the **main_rX.c** file you need to compile it like this
```bash
gcc main_rX.c -o prgm
```
Where X is the number of the Raspberry.

And to compile the **collect.c** file must be compiled like this
```bash
gcc collect.c -o collect
```

### scripts
All the Raspberry needs to have a copy of the *script_rX.sh* file and the master Raspberry needs to have a copy of the *script_merge.sh*.

To start the script just run
```bash
sudo ./script_rX.sh
```
This must be done for each Raspberry and you also need to start the **script_merge.sh** on the master Raspberry
```bash
sudo ./script_merge.sh
```

After you have done all these steps everything should be running, to make it all work you also need to start the file_watcher script and the server. Further information is provided under the **file_watcher** and **server** folders.
