## File watcher
This is a file watcher implemented in golang.

**To run this files you need to have installed and set up golang.**

#### Starting the filewatcher
First you need to start the *watcher.go* file.
```bash
go run watcher.go
```

#### Inserting test data
Then you need to start the script that changes the content in result.txt (the purpose is to simulate the raspberries and sensors).
```bash
cd exec && go run main.go
```
And this will start the script and change the content in result.txt every 5 seconds.

**Important:** You need to do *cd exec* otherwise it will give you an error like **../result.txt no such file**

#### Running the test
You need to stand in the root of the file_watcher directory.
```bash
go test .
```
The test will take about 20 seconds to execute, so don't worry if it takes time.
