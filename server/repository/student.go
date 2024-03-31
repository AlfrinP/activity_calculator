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

type StudentRepositry struct {
	db *gorm.DB
}

func NewStudentRepository(db *gorm.DB) *StudentRepositry {
	return &StudentRepositry{db}
}

func (repo *StudentRepositry) Create(u *models.Student) error {
	if err := repo.db.Create(u).Error; err != nil {
		if strings.Contains(err.Error(), "duplicate key value violates unique") {
			return errors.New("email already exists")
		}
		return errors.New("student registration failed")
	}
	return nil
}

func (repo *StudentRepositry) Get(email string) (*models.Student, error) {
	var student models.Student
	if err := repo.db.Where("email = ?", email).First(&student).Error; err != nil {
		return &student, err
	}
	return &student, nil
}

// db.Model(&User{}).Where("active = ?", true).Update("name", "hello")

func (repo *StudentRepositry) UpdateFacultyIDWithName(studentID uint, facultyID uint, facultyName string) {
	repo.db.Model(&models.Student{}).Where("id = ?", studentID).Updates(&models.Student{FacultyID: facultyID, FacultyName: facultyName})
}

func (repo *StudentRepositry) GetByID(id uint) (*models.Student, error) {
	var student models.Student
	if err := repo.db.Where("id = ?", id).First(&student).Error; err != nil {
		return &student, err
	}
	return &student, nil
}

func (repo *StudentRepositry) GetStudentByID(id uint) ([]models.Student, error) {
	var student []models.Student
	err := repo.db.Model(&models.Student{}).Preload("Certificate").Find(&student).Error
	return student, err
}

func (repo *StudentRepositry) GetAll(id uint) (*models.Student, error) {
	var student models.Student
	if err := repo.db.Preload("Certificates").First(&student, id).Error; err != nil {
		return nil, err
	}

	return &student, nil
}

func (repo *StudentRepositry) Shortlist(batch string, department string) ([]models.Student, error) {
	var student []models.Student
	if err := repo.db.Where("batch = ? and department = ? and faculty_id is null", batch, department).Find(&student).Error; err != nil {
		return student, err
	}
	return student, nil
}

// type StudentSummary struct {
// 	Name        string
// 	RegNo       string
// 	TotalPoints int
// }

func (repo *StudentRepositry) FetchStudentTotalPoints(facultyID uint, year string) ([]map[string]interface{}, error) {
	var result []map[string]interface{}

	// var students []models.Student
	// var summery []StudentSummary

	// Gorm query to fetch the required data
	err := repo.db.
		Model(&models.Student{}).
		Select("students.name, students.reg_no, SUM(certificates.point) as total_points, EXTRACT(YEAR FROM certificates.date) as year").
		Joins("JOIN certificates ON students.id = certificates.student_id").
		Where("students.faculty_id = ? AND certificates.status = ? AND EXTRACT(YEAR FROM certificates.date) = ? AND students.deleted_at IS NULL",
			facultyID, "approved", year).
		Group("students.id, year").
		Order("year").
		Scan(&result).
		Error

	// err := repo.db.Model(&models.Student{}).Preload("Certificates", "status = 'approved'").Find(&students).Error

	if err != nil {
		return nil, err
	}

	// for _, student := range students {
	// 	totalPoints := 0
	// 	for _, cert := range student.Certificates {
	// 		fmt.Println(cert.Date.Year())
	// 		if cert.Date.Year() == year {
	// 			totalPoints += cert.Point
	// 		}
	// 	}
	// 	summery = append(summery, StudentSummary{
	// 		Name:        student.Name,
	// 		RegNo:       student.RegNo,
	// 		TotalPoints: totalPoints,
	// 	})

	// }

	return result, nil
}
