package models

import (
	"gorm.io/gorm"
)

type Faculty struct {
	gorm.Model
	Name       string    `json:"name"`
	Email      string    `json:"email"`
	Department string    `json:"department"`
	Batch      string    `json:"batch"`
	Password   string    `json:"-"`
	Students   []Student `json:"students" gorm:"foreignKey:FacultyID"`
}
