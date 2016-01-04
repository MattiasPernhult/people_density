package main

import (
	"fmt"
	"testing"
	"time"
)

var (
	number = 1
)

func TestWhole1(t *testing.T) {

}

func TestIsInsertedNeeded1(t *testing.T) {
	changeWaitTime(0)
	floors := []Floor{
		{"3A", 50, 20}, {"3B", 50, 20}, {"3C", 50, 20},
	}

	expected := true
	checkResult(floors, t, expected)
}

func TestIsInsertedNeeded2(t *testing.T) {
	changeWaitTime(0)
	floors := []Floor{
		{"3A", 56, 20}, {"3B", 50, 20}, {"3C", 50, 20},
	}

	expected := true
	checkResult(floors, t, expected)
}

func TestIsInsertedNeeded3(t *testing.T) {
	changeWaitTime(0)
	floors := []Floor{
		{"3A", 57, 20}, {"3B", 50, 20}, {"3C", 50, 20},
	}

	expected := false
	checkResult(floors, t, expected)
}

func TestIsInsertedNeeded4(t *testing.T) {
	changeWaitTime(0)
	floors := []Floor{
		{"3A", 57, 20}, {"3B", 50, 20}, {"3C", 30, 20},
	}

	expected := true
	checkResult(floors, t, expected)
}

func TestIsInsertedNeeded5(t *testing.T) {
	changeWaitTime(0)
	floors := []Floor{
		{"3A", 57, 20}, {"3B", 50, 20}, {"3C", 30, 20},
	}

	expected := true
	time.Sleep(20 * time.Second)
	checkResult(floors, t, expected)
}

func checkResult(floors []Floor, t *testing.T, expected bool) {
	ti := time.Now()
	data := Building{floors, ti.Format(time.RFC3339)}
	if actual := IsInsertNeeded(data); actual != expected {
		t.Error(formatError(data, expected, actual, number))
	}
	if expected {
		SetLastInsert(floors)
	}
	number++
}

func formatError(input interface{}, expected interface{}, actual interface{}, number int) string {
	return fmt.Sprintf("\nTestcase:    %v\nInput:    %v\nExpected: %v\nActual:   %v\n", number, input, expected, actual)
}
