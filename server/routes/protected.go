package routes

import (
	"github.com/AlfrinP/point_calculator/controllers"
	"github.com/AlfrinP/point_calculator/middleware"
	"github.com/gofiber/fiber/v2"
)

func SetupProtectedRoutes(app *fiber.App) {
	api := app.Group("/api")
	api.Use(middleware.DeserializeUser)
	api.Get("/securitycheck", controllers.SecurityCheck)
	api.Get("/dashboard/:role", controllers.Dashboard)
	api.Post("/shortlist", controllers.UpdateFacultyID)
	api.Post("/certificate", controllers.PostCertificate)
	api.Get("/certificate", controllers.GetAllCertificate)
	api.Post("/comment", controllers.PostComment)
	api.Get("/logout", controllers.LogoutUser)
}
