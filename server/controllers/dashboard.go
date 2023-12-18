package controllers

import (
	"fmt"

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
