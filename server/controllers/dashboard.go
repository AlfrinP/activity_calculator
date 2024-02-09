package controllers

import (
	"fmt"

	"github.com/AlfrinP/point_calculator/internal"
	"github.com/AlfrinP/point_calculator/repository"
	"github.com/AlfrinP/point_calculator/storage"
	"github.com/AlfrinP/point_calculator/util"
	"github.com/gofiber/fiber/v2"
)

type Update struct {
	FacultyName string `json:"faculty_name"`
	StudentID   uint   `json:"student_id"`
}

func Dashboard(c *fiber.Ctx) error {
	u, _ := c.Locals("user").(*util.Data)

	fmt.Println(u)

	if u == nil {
		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"status": "fail", "message": "the user belonging to this token no logger exists"})
	} else if u.Role == "student" {
		studentRepo := repository.NewStudentRepository(storage.GetDB())
		student, err := studentRepo.GetAll(u.ID)
		if err != nil {
			return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"status": "fail", "message": "the user belonging to this token no logger exists"})
		}
		return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "student": student})
	} else if u.Role == "faculty" {
		facultyRepo := repository.NewFacultyRepository(storage.GetDB())
		faculty, err := facultyRepo.GetAll(u.ID)

		if err != nil {
			return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"status": "fail", "message": "the user belonging to this token no logger exists"})
		}
		return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "faculty": faculty})
	} else {
		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"status": "fail", "message": "the user belonging to this token no logger exists"})
	}

}

func UpdateFacultyID(c *fiber.Ctx) error {
	params := &Update{}
	if err := c.BodyParser(params); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	if params.StudentID == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid student id",
		})
	}

	s, ok := c.Locals("user").(*util.Data)
	if ok && s.Role == "faculty" {
		studentRepo := repository.NewStudentRepository(storage.GetDB())
		studentRepo.UpdateFacultyIDWithName(params.StudentID, s.ID, params.FacultyName)
		return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success"})
	} else {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid user role",
		})
	}
}

type Shortlist struct {
	Batch      string `json:"batch"`
	Department string `json:"department"`
}

func StudentFilter(c *fiber.Ctx) error {
	u, _ := c.Locals("user").(*util.Data)

	if u != nil {
		params := &Shortlist{}
		if err := c.BodyParser(params); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"msg": "Failed to parse request",
			})
		}
		if u.Role == "faculty" {
			params := &Shortlist{}
			if err := c.BodyParser(params); err != nil {
				return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
					"msg": err.Error(),
				})
			}
			fmt.Println(params)
			studentRepo := repository.NewStudentRepository(storage.GetDB())
			student, err := studentRepo.Shortlist(params.Batch, params.Department)
			if err != nil {
				return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"status": "fail", "message": "the user belonging to this token no logger exists"})
			}
			return c.Status(fiber.StatusOK).JSON(student)
		} else {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Invalid user role",
			})
		}
	} else {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid user",
		})
	}
}

type YearlyPoint struct {
	FacultyID uint   `json:"faculty_id"`
	Year      string `json:"year"`
}

func YearlyTotalPoint(c *fiber.Ctx) error {
	u, _ := c.Locals("user").(*util.Data)

	if u == nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid user",
		})
	}

	if u.Role == "faculty" {
		params := &YearlyPoint{}
		if err := c.BodyParser(params); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"msg": err.Error(),
			})
		}
		fmt.Println(params)

		studentRepo := repository.NewStudentRepository(storage.GetDB())
		yearlyPoint, err := studentRepo.FetchStudentTotalPoints(params.FacultyID, params.Year)
		if err != nil {
			return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"status": "fail", "message": "cant find yearly point"})
		}
		return c.Status(fiber.StatusOK).JSON(yearlyPoint)
	} else {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid user role",
		})
	}
}

func GenerateExcel(c *fiber.Ctx) error {
	u, _ := c.Locals("user").(*util.Data)

	if u == nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid user",
		})
	}

	if u.Role == "faculty" {
		params := &YearlyPoint{}
		if err := c.BodyParser(params); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"msg": err.Error(),
			})
		}
		fmt.Println(params)

		file, err := internal.Excelize(params.FacultyID, params.Year)
		if err != nil {
			return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"status": "fail", "message": "cant find yearly point"})
		}

		// Send the file as a response
		return c.Status(fiber.StatusAccepted).JSON(fiber.Map{
			"file":file,
		})
	} else {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid user role",
		})
	}
}
