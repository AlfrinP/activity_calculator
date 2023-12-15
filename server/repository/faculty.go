package repository

import (
	"errors"
	"strings"

	"github.com/AlfrinP/point_calculator/models"
	"gorm.io/gorm"
)

// type User interface{
// 	Get(username string)
// }

type FacultyRepositry struct {
	db *gorm.DB
}

func NewFacultyRepository(db *gorm.DB) *FacultyRepositry {
	return &FacultyRepositry{db}
}

func (repo *FacultyRepositry) Create(u *models.Faculty) error {
	if err := repo.db.Create(u).Error; err != nil {
		if strings.Contains(err.Error(), "duplicate key value violates unique") {
			return errors.New("email already exists")
		}
		return err
	}
	return nil
}

func (repo *FacultyRepositry) Get(email string) (*models.Faculty, error) {
	var faculty models.Faculty
	if err := repo.db.Where("email = ?", email).First(&faculty).Error; err != nil {
		return &faculty, err
	}
	return &faculty, nil
}

func (repo *FacultyRepositry) GetByID(id uint) (*models.Faculty, error) {
	var faculty models.Faculty
	if err := repo.db.Where("id = ?", id).First(&faculty).Error; err != nil {
		return &faculty, err
	}
	return &faculty, nil
}

func (repo *FacultyRepositry) All() ([]models.Faculty, error) {
	var faculty []models.Faculty
	if err := repo.db.Find(&faculty).Error; err != nil {
		return faculty, err
	}
	return faculty, nil
}

func (repo *FacultyRepositry) GetAll(id uint) (*models.Faculty, error) {
	var faculty models.Faculty
	if err := repo.db.Preload("Students").First(&faculty, id).Error; err != nil {
		return nil, err
	}

	return &faculty, nil
}
