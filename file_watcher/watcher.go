package main

import (
	"bytes"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/go-fsnotify/fsnotify"
)

const (
	databaseName  = "people_density"
	tableName     = "test1"
	posDiffPeople = 5
	negDiffPeople = -5
)

var (
	lastInsertData []Floor
	lastInsertTime time.Time
	insertNext     bool
	waitTime       = 1
)

// Floor struct to represent a floor in a building
type Floor struct {
	Name       string `json:"name"`
	People     int    `json:"people"`
	SoundLevel int    `json:"soundLevel"`
}

// Building struct to represent a building
type Building struct {
	Floors    []Floor `json:"floors"`
	Timestamp string  `json:"timestamp"`
}

func checkError(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

func changeWaitTime(wt int) {
	if wt == 0 || wt == 1 {
		waitTime = wt
	}
}

// SetLastInsert j
func SetLastInsert(f []Floor) {
	lastInsertData = f
	lastInsertTime = time.Now()
}

func main() {
	files := []string{"result.txt"}
	startWatchingFiles(files)
}

func startWatchingFiles(files []string) {
	watcher, err := fsnotify.NewWatcher()
	checkError(err)
	defer watcher.Close()

	done := make(chan bool)
	go func() {
		for {
			select {
			case event := <-watcher.Events:
				if event.Op&fsnotify.Write == fsnotify.Write {
					log.Println("modified file:", event.Name)
					readFile(event.Name)
				}
			}
		}
	}()

	for _, file := range files {
		if err = watcher.Add(file); err != nil {
			log.Fatal(err)
		}
	}

	<-done
}

func readFile(file string) {
	data, err := ioutil.ReadFile(file)
	checkError(err)
	middleware(string(data))
}

// IsInsertNeeded will check if there has been any important change
func IsInsertNeeded(data Building) bool {
	var duration float64
	if waitTime == 0 {
		duration = time.Since(lastInsertTime).Seconds()
	} else if waitTime == 1 {
		duration = time.Since(lastInsertTime).Minutes()
	}
	if duration >= 20 {
		return true
	}
	for _, v := range data.Floors {
		if lastInsertData == nil {
			return true
		}
		for _, u := range lastInsertData {
			if v.Name == u.Name {
				diff := v.People - u.People
				if diff > posDiffPeople || diff < negDiffPeople {
					return true
				}
			}
		}
	}
	return false
}

func middleware(jsonInsert string) {
	reader := csv.NewReader(strings.NewReader(jsonInsert))
	lines, _ := reader.ReadAll()
	var floors []Floor
	for _, line := range lines {
		name := line[0]
		people, _ := strconv.Atoi(line[1])
		sound, _ := strconv.Atoi(line[2])
		floor := Floor{name, people, sound}
		floors = append(floors, floor)
	}

	t := time.Now()
	data := Building{floors, t.Format(time.RFC3339)}

	if IsInsertNeeded(data) {
		ok := sendDataToAPI(data)
		if ok {
			fmt.Printf("Data inserted: %v\n", data)
		}
	} else {
		fmt.Println("Data not inserted")
		fmt.Printf("newData: %v\noldData: %v\n", data.Floors, lastInsertData)
	}
}

func sendDataToAPI(data Building) bool {
	url := "http://localhost:3000/insert"
	dataByte, err := json.Marshal(data)
	checkError(err)
	req, reqErr := http.NewRequest("POST", url, bytes.NewBuffer(dataByte))
	checkError(reqErr)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	response, respErr := client.Do(req)
	checkError(respErr)
	defer response.Body.Close()

	status := response.StatusCode
	if status == 200 {
		return true
	}
	return false
}

// InsertDataToRethink will insert the data that is passed into it
// func InsertDataToRethink(data Building) bool {
// 	_, err := r.DB(databaseName).Table(tableName).Insert(data).RunWrite(session)
// 	if err != nil {
// 		log.Fatal(err)
// 		// if strings.Contains(err2.Error(), "Table people_density.test1 does not exist") {
// 		// 	fmt.Println("creating missing table...")
// 		// 	createMissingComp(false, jsonInsert)
// 		// } else if strings.Contains(err2.Error(), "Database `people_density` does not exist") {
// 		// 	fmt.Println("creating missing database and table...")
// 		// 	createMissingComp(true, jsonInsert)
// 		// }
// 	}
// 	lastInsertTime = time.Now()
// 	lastInsertData = data.Floors
// 	return true
// }

// func createMissingComp(isDatabase bool, jsonInsert string) {
// 	if isDatabase {
// 		_, err := r.DBCreate(databaseName).RunWrite(session)
// 		if err != nil {
// 			log.Fatal(err)
// 		}
// 	}
// 	_, err := r.DB(databaseName).TableCreate(tableName).RunWrite(session)
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	fmt.Println("Created missing database/table")
// 	fmt.Println("Inserting again")
// 	middleware(jsonInsert)
// }
