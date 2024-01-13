package repository

import (
	"log"
	"testing"

	"github.com/AlfrinP/point_calculator/storage"
)

func TestFetchStudentTotalPoints(t *testing.T) {
	studentrepo := NewStudentRepository(storage.GetDB())
	got, err := studentrepo.FetchStudentTotalPoints(6, "2023")
	if err != nil {
		t.Errorf("error occures %s", err)
	}
	log.Println(got)
}
