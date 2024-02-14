package util

import (
	"fmt"
	"testing"
)

func TestGetContentType(t *testing.T) {
	ext := GetContentType("image.jpg")

	want := "jpg"

	if ext != want {
		t.Errorf("got %q want %q ", ext, want)
	}
	fmt.Println(ext)
}
