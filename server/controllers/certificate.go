package controllers

import (
	"fmt"
	"time"

	"github.com/AlfrinP/point_calculator/internal"
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
	if s.Role != "student" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid user role",
		})
	}

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
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "certificate upload failed",
		})
	}

	f, err := file.Open()

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "certificate upload failed",
		})
	}
	res, err := internal.Uploader(f, file.Filename, util.GetContentType(file.Filename))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	fmt.Println(res)

	// c.SaveFile(file, "certificates/"+file.Filename)

	date, err := time.Parse("2006-01-02", params.Date)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "certificate upload failed while parsing date",
		})
	}
	certificate := &models.Certificate{
		StudentID: s.ID,
		Name:      params.Name,
		Category:  params.Category,
		Level:     util.Levels[params.Level],
		Position:  params.Position,
		Point:     internal.GetPoint(params),
		Date:      date,
		FileUrl:   res,
	}

	certificateRepo := repository.NewCertificateRepository(storage.GetDB())

	if err := certificateRepo.Create(certificate); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"msg": "Certificate successfully uploaded",
	})

}
