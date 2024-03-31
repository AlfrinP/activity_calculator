package controllers

import (
	"time"

	"github.com/AlfrinP/point_calculator/helpers"
	"github.com/AlfrinP/point_calculator/models"
	"github.com/AlfrinP/point_calculator/repository"
	"github.com/AlfrinP/point_calculator/storage"
	"github.com/AlfrinP/point_calculator/types"
	"github.com/AlfrinP/point_calculator/util"

	"github.com/gofiber/fiber/v2"
)

func PostCertificate(c *fiber.Ctx) error {

	s, _ := c.Locals("user").(*util.TokenData)

	if s == nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "user not found",
		})
	}

	if s.Role != types.Student {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "invalid user role",
		})
	}

	params := &models.CertificateCreate{}
	if err := c.BodyParser(params); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "cant get certificate data",
		})
	}

	if err := params.Validate(); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "certificate parames are not valid",
		})
	}

	file, err := c.FormFile("upload_certificate")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "certificate upload failed",
		})
	}

	f, err := file.Open()

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "certificate upload failed",
		})
	}
	res, err := helpers.Uploader(f, file.Filename, util.GetContentType(file.Filename))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "certificate upload failed",
		})
	}

	date, err := time.Parse("2006-01-02", params.Date)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "certificate upload failed while parsing date",
		})
	}
	certificate := &models.Certificate{
		StudentID: s.ID,
		Name:      params.Name,
		Category:  params.Category,
		Level:     util.Levels[params.Level],
		Position:  params.Position,
		Point:     helpers.GetPoint(params),
		Date:      date,
		FileUrl:   res,
		FileName:  file.Filename,
	}

	certificateRepo := repository.NewCertificateRepository(storage.GetDB())

	if err := certificateRepo.Create(certificate); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "certificate upload failed",
		})
	}
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"error": false,
		"msg":   "certificate successfully uploaded",
	})

}

func DeleteCertificate(c *fiber.Ctx) error {
	s, _ := c.Locals("user").(*util.TokenData)

	if s == nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "user not found",
		})
	}

	if s.Role != types.Student {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "invalid user role",
		})
	}

	certificateID := c.Params("id")

	certificateRepo := repository.NewCertificateRepository(storage.GetDB())

	certificate, err := certificateRepo.GetByID(certificateID)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   "certificate not found",
		})
	}

	if err := helpers.DeleteFile(certificate.FileName); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   "operation failed in s3",
		})
	}

	if err := certificateRepo.DeleteByID(certificate.ID); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   "operation failed",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"error": false,
		"msg":   "certificate deleted successfully",
	})
}
