package controllers

import "github.com/gofiber/fiber/v2"

func HealthCheck(ctx *fiber.Ctx) error {
	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Still Alive",
	})
}

func SecurityCheck(ctx *fiber.Ctx) error {
	return ctx.Status(fiber.StatusAccepted).JSON(fiber.Map{
		"message": "Security Check Succesful",
	})
}
