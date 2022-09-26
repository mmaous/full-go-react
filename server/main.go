package main

import (
	fiber "github.com/gofiber/fiber/v2"
	cors "github.com/gofiber/fiber/v2/middleware/cors"
	logger "github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	// initials web server with fiber
	// and starts listening for requests
	app := fiber.New()
	app.Get("/api/welcome", func(c *fiber.Ctx) error {
		c.Status(200)
		return c.SendString("Hello, World!!")
	})
	// use logger 
	app.Use(logger.New())
	app.Use((cors.New(cors.Config{AllowCredentials: true, AllowOrigins: "*"})))
	app.Listen(":3003")
}
