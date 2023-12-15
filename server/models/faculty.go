package models

import (
	"github.com/go-playground/validator/v10"
	"golang.org/x/crypto/bcrypt"
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

type FacultyCreate struct {
	Name       string `validate:"required" json:"name"`
	Email      string `validate:"required,email" json:"email"`
	Department string `json:"department"`
	Batch      string `json:"batch"`
	Password   string `validate:"required" json:"password"`
}

func (fc *FacultyCreate) Validate() error {
	validate := validator.New()
	if err := validate.Struct(fc); err != nil {
		return err
	}
	return nil
}

func (fc *FacultyCreate) Convert() (*Faculty, error) {
	hashedPasswd, err := bcrypt.GenerateFromPassword([]byte(fc.Password), bcrypt.DefaultCost)
	if err != nil {
		return &Faculty{}, err
	}

	return &Faculty{
		Name:       fc.Name,
		Email:      fc.Email,
		Department: fc.Department,
		Batch:      fc.Batch,
		Password:   string(hashedPasswd),
	}, nil
}
