package main

import (
	fiber "github.com/gofiber/fiber/v2"
	cors "github.com/gofiber/fiber/v2/middleware/cors"
	logger "github.com/gofiber/fiber/v2/middleware/logger"

	database "reacter/database"
)

func main() {
	// initials web server with fiber
	// and starts listening for requests
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		client, _ := database.Connect()
		_ = database.GetCollection(client, "users")
		return c.JSON("Conncected to database")

	})

	// use logger
	app.Use(logger.New())
	app.Use((cors.New(cors.Config{AllowCredentials: true, AllowOrigins: "*"})))
	app.Listen(":3003")
}
