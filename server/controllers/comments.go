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

	role, _ := util.GetRoleAndID()
	log.Println(role)
	if role == "faculty" {
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

		// certificateID, err := strconv.Atoi(params.CertificateID)
		// if err != nil {
		// 	return err
		// }

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
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Comment successfully uploaded",
		})
	} else {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "invalid role",
		})
	}

}
