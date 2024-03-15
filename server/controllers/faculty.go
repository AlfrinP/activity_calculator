package controllers

import (
	"github.com/AlfrinP/point_calculator/helpers"
	"github.com/AlfrinP/point_calculator/repository"
	"github.com/AlfrinP/point_calculator/storage"
	"github.com/AlfrinP/point_calculator/types"
	"github.com/AlfrinP/point_calculator/util"
	"github.com/gofiber/fiber/v2"
)

type Shortlist struct {
	Batch      string `json:"batch"`
	Department string `json:"department"`
}

func GenerateExcel(c *fiber.Ctx) error {
	u, _ := c.Locals("user").(*util.TokenData)

	if u == nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "invalid user found",
		})
	}

	if u.Role == types.Faculty {
		year := c.Params("year")

		file, err := helpers.Excelize(u.ID, year)
		if err != nil {
			return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
				"error": true,
				"msg":   "cant generate excel file",
			})
		}

		// Send the file as a response
		return c.Status(fiber.StatusAccepted).JSON(fiber.Map{
			"error": false,
			"file":  file,
		})
	} else {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "invalid user role",
		})
	}
}

func StudentFilter(c *fiber.Ctx) error {
	u, _ := c.Locals("user").(*util.TokenData)

	if u != nil {
		params := &Shortlist{}
		if err := c.BodyParser(params); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": true,
				"msg":   "failed to parse request",
			})
		}
		if u.Role == types.Faculty {
			params := &Shortlist{}
			if err := c.BodyParser(params); err != nil {
				return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
					"error": true,
					"msg":   "failed to read request",
				})
			}
			studentRepo := repository.NewStudentRepository(storage.GetDB())
			student, err := studentRepo.Shortlist(params.Batch, params.Department)
			if err != nil {
				return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
					"error":   true,
					"message": "the user belonging to this token no logger exists",
				})
			}
			return c.Status(fiber.StatusOK).JSON(student)
		} else {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": true,
				"msg":   "invalid user role",
			})
		}
	} else {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "invalid user",
		})
	}
}
