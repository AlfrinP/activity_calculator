package controllers

import (
	"github.com/AlfrinP/point_calculator/repository"
	"github.com/AlfrinP/point_calculator/storage"
	"github.com/AlfrinP/point_calculator/types"
	"github.com/AlfrinP/point_calculator/util"
	"github.com/gofiber/fiber/v2"
)

type Update struct {
	FacultyName string `json:"faculty_name"`
	StudentID   uint   `json:"student_id"`
}

func UpdateFacultyID(c *fiber.Ctx) error {
	params := &Update{}
	if err := c.BodyParser(params); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "failed to read request",
		})
	}

	if params.StudentID == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "invalid student id",
		})
	}

	u, ok := c.Locals("user").(*util.TokenData)

	if ok && u.Role == types.Faculty {
		studentRepo := repository.NewStudentRepository(storage.GetDB())
		studentRepo.UpdateFacultyIDWithName(params.StudentID, u.ID, params.FacultyName)
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"error": false,
			"msg":   "updated successfully",
		})
	} else {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "invalid user role",
		})
	}
}
