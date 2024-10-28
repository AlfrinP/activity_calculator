package routes

import (
	"github.com/AlfrinP/point_calculator/controllers"
	"github.com/AlfrinP/point_calculator/middleware"
	"github.com/gofiber/fiber/v2"
)

func SetupProtectedRoutes(app *fiber.App) {
	api := app.Group("/api")
	api.Use(middleware.DeserializeUser)

	//Common
	api.Get("/securitycheck", controllers.SecurityCheck)
	api.Get("/dashboard", controllers.Dashboard)
	api.Post("/yearlypoint/:year", controllers.YearlyTotalPoint)
	api.Post("/logout", controllers.LogoutUser)

	//Faculty
	api.Post("/studentsfilter", controllers.StudentFilter)
	api.Post("/shortlist", controllers.UpdateFacultyID)
	api.Post("/commentstatus", controllers.PostCommentWithStatusChange)
	api.Post("/generatexl/:year", controllers.GenerateExcel)

	//Student
	api.Post("/certificate", controllers.PostCertificate)
	api.Post("/certificate/:id", controllers.DeleteCertificate)
}
