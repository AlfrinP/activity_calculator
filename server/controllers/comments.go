package controllers

import (
	"log"

	"github.com/AlfrinP/point_calculator/models"
	"github.com/AlfrinP/point_calculator/repository"
	"github.com/AlfrinP/point_calculator/storage"
	"github.com/AlfrinP/point_calculator/util"
	"github.com/gofiber/fiber/v2"
)

func PostCommentWithStatusChange(c *fiber.Ctx) error {

	f, _ := c.Locals("user").(*util.TokenData)

	if f == nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "user is not allowed",
		})
	}

	if f.Role != "faculty" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "role is not allowed",
		})
	}

	params := &models.CommentCreate{}

	if err := c.BodyParser(params); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "failed in parsing request data ",
		})
	}

	if err := params.Validate(); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "failed in validating request data ",
		})
	}
	log.Println(params)

	certificateRepo := repository.NewCertificateRepository(storage.GetDB())
	if err := certificateRepo.ChangeStatusComment(params.CertificateID, params.Status, params.Message); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "certificate status and comment update failed",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"error": true,
		"msg":   "comment and status changed",
	})
}
