package helpers

import (
	"fmt"
	"testing"
)

func TestExcelize(t *testing.T) {
	got, err := Excelize(6, "2023")
	fmt.Println(string(got))
	if err != nil {
		t.Errorf("got %v", got)
	}
}
