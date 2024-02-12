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
	api.Get("/dashboard/", controllers.Dashboard)
	api.Post("/studentsfilter", controllers.StudentFilter)
	api.Post("/shortlist", controllers.UpdateFacultyID)
	api.Post("/certificate", controllers.PostCertificate)
	api.Post("/commentstatus", controllers.PostCommentWithStatusChange)
	api.Post("/yearlypoint/:year", controllers.YearlyTotalPoint)
	api.Post("/generatexl/:year", controllers.GenerateExcel)
	api.Post("/logout", controllers.LogoutUser)
}
