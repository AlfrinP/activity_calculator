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
	Position  string    `json:"position"`
	Name      string    `json:"name"`
	Date      time.Time `json:"date"`
	Point     int       `json:"point"`
	Status    string    `json:"status" gorm:"default:pending"`
	Comment   string    `json:"comment"`
	StudentID uint      `json:"student_id" gorm:"index"`
	FileUrl   string    `json:"file_url"`
	FileName  string    `json:"filename"`
}

type CertificateCreate struct {
	Name     string `validate:"required" json:"name"`
	Category string `validate:"required" json:"category"`
	Level    uint   `json:"level"`
	Position string `json:"position"`
	Date     string `validate:"required" json:"date"`
}

func (cc *CertificateCreate) Validate() error {
	validate := validator.New()
	if err := validate.Struct(cc); err != nil {
		return err
	}
	return nil
}

type CommentCreate struct {
	Message       string `json:"message"`
	Status        string `validate:"required" json:"status"`
	CertificateID uint   `json:"certificate_id"`
}

func (cm *CommentCreate) Validate() error {
	validate := validator.New()
	if err := validate.Struct(cm); err != nil {
		return err
	}
	return nil
}
