# People Density
A solution for visualize people density in Niagara building.

This is a project for the course Internet and Things and People, that aim to visualize people density in the Niagara
building at Malmö University.

## Getting the source code
Stand in a directory where you want to add the project, then run following command
``` bash
git clone https://github.com/MattiasPernhult/people_density.git
```

## Building and running the code
To run this project you must follow this steps listed bellow.

#### 1. Installing the rethinkdb
First of all you need to install the rethinkdb on your computer: https://www.rethinkdb.com/docs/install

Once installed you can start it by running **rethinkdb** in the terminal.

#### 2. Setting up a database and table
Once you started the rethinkdb, you should be able to go to the admin page through localhost:8080.
In the admin page, click the Data Explorer menu tab, then run this command to create a new database
``` bash
r.dbCreate('people_density')
```

After this you should have a database named 'people_density', then run this command to create a new table
``` bash
r.db('people_density').tableCreate('test1')
```

After this everything with the rethinkdb is installed and set up.

#### 3. Starting the scripts
First you must start the listening script by standing in the root path and running
``` bash
node src/listener.js
```
This will start the server and you can go to localhost:3000

Then run the second script to start inserting random data, just for testing.
``` bash
node src/insert.js
```

This will start a infinite loop to insert new data each 5000 ms as this is the default, you can tweak the interval by
providing a process environment variable INTERVAL
``` bash
INTERVAL=<milliseconds> node src/insert.js
```

for example,
``` bash
INTERVAL=10000 node src/insert.js
```

and this will insert new data each 10 seconds.
