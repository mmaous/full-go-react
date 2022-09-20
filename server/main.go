package main 

import (
	fiber "github.com/gofiber/fiber/v2"
	cors "github.com/gofiber/fiber/v2/middleware/cors"
	// logger "github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	// initials web server with fiber
	// and starts listening for requests
	app := fiber.New()
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})
	app.Use(cors.New())
	app.Listen(":3003")
}