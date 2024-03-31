package types

import (
	"github.com/AlfrinP/point_calculator/models"
	"github.com/go-playground/validator"
	"golang.org/x/crypto/bcrypt"
)

type StudentCreate struct {
	Name       string `validate:"required" json:"name"`
	Email      string `validate:"required" json:"email"`
	RegNo      string `validate:"required" json:"regno"`
	Password   string `validate:"required" json:"password"`
	Department string `validate:"required" json:"department"`
	Batch      string `validate:"required" json:"batch"`
}

func (bc *StudentCreate) Validate() error {
	validate := validator.New()
	if err := validate.Struct(bc); err != nil {
		return err
	}
	return nil
}

func (bc *StudentCreate) Convert() (*models.Student, error) {
	hashedPasswd, err := bcrypt.GenerateFromPassword([]byte(bc.Password), bcrypt.DefaultCost)
	if err != nil {
		return &models.Student{}, err
	}

	return &models.Student{
		Email:        bc.Email,
		Name:         bc.Name,
		RegNo:        bc.RegNo,
		PasswordHash: string(hashedPasswd),
		Department:   bc.Department,
		Batch:        bc.Batch,
	}, nil
}
