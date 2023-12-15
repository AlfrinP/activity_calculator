package models

import (
	"time"

	"github.com/go-playground/validator/v10"
	"gorm.io/gorm"
)

type Certificate struct {
	gorm.Model
	Category  string    `json:"category"`
	Level     string    `json:"level"`
	Name      string    `json:"name"`
	Date      time.Time `json:"date"`
	Comment   []Comment `json:"comment"`
	StudentID uint      `json:"student_id" gorm:"index"`
}

type CertificateCreate struct {
	Name     string `validate:"required" json:"name"`
	Category string `validate:"required" json:"category"`
	Level    string `validate:"required" json:"level"`
	Date     string `validate:"required" json:"date"`
}

func (cc *CertificateCreate) Validate() error {
	validate := validator.New()
	if err := validate.Struct(cc); err != nil {
		return err
	}
	return nil
}

type Comment struct {
	gorm.Model
	Message       string `json:"message"`
	CertificateID uint   `json:"certificate_id"`
}

type CommentCreate struct {
	Message       string `validate:"required" json:"message"`
	CertificateID uint   `json:"certificate_id"`
}

func (cm *CommentCreate) Validate() error {
	validate := validator.New()
	if err := validate.Struct(cm); err != nil {
		return err
	}
	return nil
}
