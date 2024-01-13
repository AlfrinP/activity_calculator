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

	f, _ := c.Locals("user").(*util.Data)
	if f == nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "user is not allowed",
		})
	}

	if f.Role == "faculty" {
		params := &models.CommentCreate{}
		if err := c.BodyParser(params); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "error in parsing request data ",
			})
		}
		log.Println(params.CertificateID)
		if err := params.Validate(); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "error in validating request data ",
			})
		}
		log.Println(params)
		commentRepo := repository.NewCommentRepository(storage.GetDB())
		comment := &models.Comment{
			Message:       params.Message,
			CertificateID: uint(params.CertificateID),
		}

		if err := commentRepo.Create(comment); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "errror in creating the comment",
			})
		}

		certificateRepo := repository.NewCertificateRepository(storage.GetDB())
		if err := certificateRepo.ChangeStatus(params.CertificateID, params.Status); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"msg": "Certificate status updated failed",
			})
		}
		return c.Status(fiber.StatusCreated).JSON(fiber.Map{
			"msg": "Comment successfully uploaded and status changed",
		})
	} else {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "role is not allowed",
		})
	}
}
