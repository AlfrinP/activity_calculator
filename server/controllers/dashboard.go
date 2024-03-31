package controllers

import (
	"log"

	"github.com/AlfrinP/point_calculator/repository"
	"github.com/AlfrinP/point_calculator/storage"
	"github.com/AlfrinP/point_calculator/types"
	"github.com/AlfrinP/point_calculator/util"
	"github.com/gofiber/fiber/v2"
)

func Dashboard(c *fiber.Ctx) error {
	log.Println(c.Locals("user"))
	u, _ := c.Locals("user").(*util.TokenData)

	log.Println(u)

	if u == nil {
		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
			"error": true,
			"msg":   "the user does not exist",
		})
	}
	if u.Role == types.Student {
		studentRepo := repository.NewStudentRepository(storage.GetDB())
		student, err := studentRepo.GetAll(u.ID)
		if err != nil {
			return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
				"error": true,
				"msg":   "the student user belonging to this token no logger exists",
			})
		}
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"error":   false,
			"student": student,
		})
	}
	if u.Role == types.Faculty {
		facultyRepo := repository.NewFacultyRepository(storage.GetDB())
		faculty, err := facultyRepo.GetAll(u.ID)

		if err != nil {
			return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
				"error": true,
				"msg":   "the faculty user belonging to this token no logger exists",
			})
		}
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"error":   false,
			"faculty": faculty,
		})
	}

	return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
		"error": true,
		"msg":   "user role does not exists",
	})

}

func YearlyTotalPoint(c *fiber.Ctx) error {
	u, _ := c.Locals("user").(*util.TokenData)

	if u == nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "invalid user",
		})
	}

	if u.Role == types.Faculty {
		year := c.Params("year")

		studentRepo := repository.NewStudentRepository(storage.GetDB())
		yearlyPoint, err := studentRepo.FetchStudentTotalPoints(u.ID, year)
		if err != nil {
			return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
				"error": true,
				"msg":   "cant generate yearly point",
			})
		}
		return c.Status(fiber.StatusOK).JSON(yearlyPoint)
	} else {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "invalid user role",
		})
	}
}
