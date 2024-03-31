package models

import (
	"gorm.io/gorm"
)

type Student struct {
	gorm.Model
	Email        string        `json:"email" gorm:"unique"`
	PasswordHash string        `json:"-"`
	Department   string        `json:"department"`
	Name         string        `json:"name"`
	RegNo        string        `json:"regno"`
	Batch        string        `json:"batch"`
	FacultyName  string        `json:"faculty_name"`
	FacultyID    uint          `json:"faculty_id" gorm:"index;default:null"`
	Certificates []Certificate `json:"certificates" gorm:"foreignKey:StudentID"`
}
