package controllers

import (
	"log"

	"github.com/AlfrinP/point_calculator/repository"
	"github.com/AlfrinP/point_calculator/storage"
	"github.com/AlfrinP/point_calculator/util"
	"github.com/gofiber/fiber/v2"
)

type Update struct {
	StudentID uint `json:"student_id"`
}

func Dashboard(c *fiber.Ctx) error {

	role := c.Params("role")
	_, id := util.GetRoleAndID()

	if role == "student" {
		studentRepo := repository.NewStudentRepository(storage.GetDB())
		student, err := studentRepo.GetAll(id)

		log.Println(student)

		if err != nil {
			return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"status": "fail", "message": "the user belonging to this token no logger exists"})
		}

		return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "student": student})
	} else if role == "faculty" {

		facultyRepo := repository.NewFacultyRepository(storage.GetDB())
		faculty, err := facultyRepo.GetAll(id)

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
			"msg": err.Error(),
		})
	}

	role, id := util.GetRoleAndID()
	log.Println(params)

	if role == "faculty" {
		studentRepo := repository.NewStudentRepository(storage.GetDB())
		studentRepo.UpdateFacultyID(params.StudentID, id)
		return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success"})
	} else {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "not updated"})
	}
}
