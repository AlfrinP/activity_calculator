package controllers

import (
	"log"

	"github.com/AlfrinP/point_calculator/models"
	"github.com/AlfrinP/point_calculator/repository"
	"github.com/AlfrinP/point_calculator/storage"
	"github.com/AlfrinP/point_calculator/util"
	"github.com/gofiber/fiber/v2"
)

func PostComment(c *fiber.Ctx) error {

	f, _ := c.Locals("user").(*util.Data)
	if f != nil && f.Role == "faculty" {
		params := &models.CommentCreate{}
		if err := c.BodyParser(params); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"msg": err.Error(),
			})
		}
		log.Println(params.CertificateID)
		if err := params.Validate(); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"msg": err.Error(),
			})
		}
		log.Println(params)

		comment := &models.Comment{
			Message:       params.Message,
			CertificateID: uint(params.CertificateID),
		}

		commentRepo := repository.NewCommentRepository(storage.GetDB())

		if err := commentRepo.Create(comment); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"msg": err.Error(),
			})
		}
		return c.Status(fiber.StatusCreated).JSON(fiber.Map{
			"msg": "Comment successfully uploaded",
		})
	} else {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "role is not allowed",
		})
	}
}
