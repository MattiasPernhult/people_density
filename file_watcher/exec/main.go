package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"math"
	"math/rand"
	"time"
)

func main() {
	for {
		random := getRandom()
		text := fmt.Sprintf("%s,%v,%d\n", "3A", random, 20)
		random = getRandom()
		text += fmt.Sprintf("%s,%v,%d\n", "3B", random, 20)
		random = getRandom()
		text += fmt.Sprintf("%s,%v,%d\n", "3C", random, 20)

		err := ioutil.WriteFile("../result.txt", []byte(text), 0644)
		if err != nil {
			log.Fatal(err)
		}

		fmt.Println("Wrote:", random)

		time.Sleep(5 * time.Second)
	}
}

func getRandom() float64 {
	random := math.Floor((rand.Float64() * 80) + 5)
	return random
}
