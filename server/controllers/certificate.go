package controllers

import (
	"log"
	"time"

	internals "github.com/AlfrinP/point_calculator/internal"
	"github.com/AlfrinP/point_calculator/models"
	"github.com/AlfrinP/point_calculator/repository"
	"github.com/AlfrinP/point_calculator/storage"
	"github.com/AlfrinP/point_calculator/util"
	"github.com/gofiber/fiber/v2"
)

func PostCertificate(c *fiber.Ctx) error {

	s, _ := c.Locals("user").(*util.Data)

	if s == nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "User not found",
		})
	}
	if s.Role == "student" {
		params := &models.CertificateCreate{}
		if err := c.BodyParser(params); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Cant get certificate data",
			})
		}

		if err := params.Validate(); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "certificate parames are not valid",
			})
		}

		file, err := c.FormFile("upload_certificate")
		if err != nil {
			return err
		}
		log.Println(file.Filename)
		c.SaveFile(file, "certificates/"+file.Filename)

		date, err := time.Parse("2006-01-02", params.Date)
		if err != nil {
			return err
		}
		certificate := &models.Certificate{
			StudentID: s.ID,
			Name:      params.Name,
			Category:  params.Category,
			Level:     util.Levels[params.Level],
			Position:  params.Position,
			Point:     internals.GetPoint(params),
			Date:      date,
		}

		certificateRepo := repository.NewCertificateRepository(storage.GetDB())

		if err := certificateRepo.Create(certificate); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"msg": err.Error(),
			})
		}
		return c.Status(fiber.StatusCreated).JSON(fiber.Map{
			"msg": "Certificate successfully uploaded",
		})

	} else {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid user role",
		})
	}

}

func GetAllCertificate(c *fiber.Ctx) error {
	certificateRepo := repository.NewCertificateRepository(storage.GetDB())
	certificate, err := certificateRepo.GetAll()
	if err != nil {
		return err
	}
	return c.JSON(certificate)
}
