package main

import (
	"log"

	"github.com/AlfrinP/point_calculator/config"
	"github.com/AlfrinP/point_calculator/routes"
	"github.com/AlfrinP/point_calculator/storage"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func init() {
	config, err := config.LoadConfig(".")
	if err != nil {
		log.Fatalln("Failed to load environment variables! \n", err.Error())
	}
	storage.ConnectDB(&config)
}
func main() {

	app := fiber.New()
	app.Use(cors.New())
	routes.SetupRoutes(app)
	routes.SetupPublicRoutes(app)
	routes.SetupProtectedRoutes(app)

	app.Listen(":3000")
}
