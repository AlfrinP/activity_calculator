package models

import (
	"github.com/go-playground/validator/v10"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type Student struct {
	gorm.Model
	Email        string        `json:"email" gorm:"unique"`
	PasswordHash string        `json:"-"`
	Department   string        `json:"department"`
	Name         string        `json:"name"`
	RegNo        string        `json:"reg_no"`
	Batch        string        `json:"batch"`
	FacultyName  string        `json:"faculty_name"`
	FacultyID    uint          `json:"faculty_id" gorm:"index;default:null"`
	Certificates []Certificate `json:"certificates" gorm:"foreignKey:StudentID"`
}

type StudentCreate struct {
	Name       string `validate:"required" json:"name"`
	Email      string `validate:"required" json:"email"`
	RegNo      string ` json:"reg_no"`
	Password   string `validate:"required" json:"password"`
	Department string `validate:"required" json:"department"`
	Batch      string `validate:"required" json:"batch"`
}

type UserSignIn struct {
	Email    string `validate:"required" json:"email"`
	Password string `validate:"required" json:"password"`
}

func (bc *StudentCreate) Validate() error {
	validate := validator.New()
	if err := validate.Struct(bc); err != nil {
		return err
	}
	return nil
}

func (us *UserSignIn) Validate() error {
	validate := validator.New()
	if err := validate.Struct(us); err != nil {
		return err
	}
	return nil
}

func (bc *StudentCreate) Convert() (*Student, error) {
	hashedPasswd, err := bcrypt.GenerateFromPassword([]byte(bc.Password), bcrypt.DefaultCost)
	if err != nil {
		return &Student{}, err
	}

	return &Student{
		Email:        bc.Email,
		Name:         bc.Name,
		RegNo:        bc.RegNo,
		PasswordHash: string(hashedPasswd),
		Department:   bc.Department,
		Batch:        bc.Batch,
	}, nil
}
