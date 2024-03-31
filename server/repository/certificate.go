package repository

import (
	"errors"

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
		return errors.New("certificate creation failed")
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

func (repo *CertificateRepository) GetByID(id string) (models.Certificate, error) {
	var certificate models.Certificate
	if err := repo.db.Where("id = ?", id).First(&certificate).Error; err != nil {
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
	err := repo.db.Find(&certificate).Error
	return certificate, err
}

func (repo *CertificateRepository) ChangeStatusComment(certificateID uint, status string, comment string) error {
	return repo.db.Model(&models.Certificate{}).Where("id = ?", certificateID).Updates(map[string]interface{}{
		"status":  status,
		"comment": comment,
	}).Error
}

func (repo *CertificateRepository) DeleteByID(certficateID uint) error {
	return repo.db.Model(&models.Certificate{}).Delete("id = ?", certficateID).Error
}
