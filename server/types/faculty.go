package types

import (
	"github.com/AlfrinP/point_calculator/models"
	"github.com/go-playground/validator"
	"golang.org/x/crypto/bcrypt"
)

type FacultyCreate struct {
	Name       string `validate:"required" json:"name"`
	Email      string `validate:"required" json:"email"`
	Department string `validate:"required" json:"department"`
	Batch      string `validate:"required" json:"batch"`
	Password   string `validate:"required" json:"password"`
}

func (fc *FacultyCreate) Validate() error {
	validate := validator.New()
	if err := validate.Struct(fc); err != nil {
		return err
	}
	return nil
}

func (fc *FacultyCreate) Convert() (*models.Faculty, error) {
	hashedPasswd, err := bcrypt.GenerateFromPassword([]byte(fc.Password), bcrypt.DefaultCost)
	if err != nil {
		return &models.Faculty{}, err
	}

	return &models.Faculty{
		Name:       fc.Name,
		Email:      fc.Email,
		Department: fc.Department,
		Batch:      fc.Batch,
		Password:   string(hashedPasswd),
	}, nil
}
