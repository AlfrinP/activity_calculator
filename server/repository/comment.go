package repository

import (
	"github.com/AlfrinP/point_calculator/models"
	"gorm.io/gorm"
)

type CommentRepository struct {
	db *gorm.DB
}

func NewCommentRepository(db *gorm.DB) *CommentRepository {
	return &CommentRepository{db}
}

func (repo *CommentRepository) Create(u *models.Comment) error {
	if err := repo.db.Create(u).Error; err != nil {
		return err
	}
	return nil
}

func (repo *CommentRepository) Update(u *models.Comment) error {
	if err := repo.db.Save(u).Error; err != nil {
		return err
	}
	return nil
}

func (repo *CommentRepository) GetByCertificateID(id uint) (*models.Comment, error) {
	var comment models.Comment
	if err := repo.db.Where("certificate_id = ?", id).First(&comment).Error; err != nil {
		return &comment, err
	}
	return &comment, nil
}

func (repo *CommentRepository) All() ([]models.Comment, error) {
	var comment []models.Comment
	if err := repo.db.Find(&comment).Error; err != nil {
		return comment, err
	}
	return comment, nil
}
