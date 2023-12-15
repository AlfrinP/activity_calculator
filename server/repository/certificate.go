package repository

import (
	"github.com/AlfrinP/point_calculator/models"
	"gorm.io/gorm"
)

type CertificateRepository struct {
	db *gorm.DB
}

func NewCertificateRepository(db *gorm.DB) *CertificateRepository {
	return &CertificateRepository{db}
}

func (repo *CertificateRepository) Create(u *models.Certificate) error {
	if err := repo.db.Create(u).Error; err != nil {
		return err
	}
	return nil
}

func (repo *CertificateRepository) Get(name string) (models.Certificate, error) {
	var certificate models.Certificate
	if err := repo.db.Where("name = ?", name).First(&certificate).Error; err != nil {
		return certificate, err
	}
	return certificate, nil
}

func (repo *CertificateRepository) All() ([]models.Certificate, error) {
	var certificates []models.Certificate
	if err := repo.db.Find(&certificates).Error; err != nil {
		return certificates, err
	}
	return certificates, nil
}



func (repo *CertificateRepository) GetAll() ([]models.Certificate, error) {
	var certificate []models.Certificate
	err := repo.db.Model(&models.Certificate{}).Preload("Comment").Find(&certificate).Error
	return certificate, err
}
