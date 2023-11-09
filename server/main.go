package main

import (
	"fmt"

	database "reacter/database"

	fiber "github.com/gofiber/fiber/v2"
	cors "github.com/gofiber/fiber/v2/middleware/cors"
	logger "github.com/gofiber/fiber/v2/middleware/logger"
	"go.mongodb.org/mongo-driver/bson"
)

type Customer struct {
	gender       string `bson:"omitempty"`
	age          int    `bson:"omitempty"`
	email        string `bson:"omitempty"`
	satisfaction int    `bson:"omitempty"`
}

type Item struct {
	name     string   `bson:"omitempty"`
	tags     []string `bson:"omitempty"`
	price    float64  `bson:"omitempty"`
	quantity int      `bson:"omitempty"`
}
type Sales struct {
	saleDate       string   `bson:"omitempty"`
	items          []Item   `bson:"omitempty"`
	storeLocation  string   `bson:"omitempty"`
	customer       Customer `bson:"omitempty"`
	couponUsed     bool     `bson:"omitempty"`
	purchaseMethod string   `bson:"omitempty"`
}

type bodyType struct {
	a int32
	b int32
}
type CollectionInfo struct {
	Name string `json:"name"`
	Type string `json:"type"`
}

const DBName = "sample_training"

func main() {
	// initials web server with fiber
	// and starts listening for requests
	app := fiber.New()
	//TODO: check if the collection param is exist in db than send the data of the collect
	app.Get("/many/:collection", func(c *fiber.Ctx) error {
		client, ctx := database.Connect()
		filter := bson.M{"couponUsed": false}
		// collectionName := c.Params("collection")
		//list all collections

		cols, _ := client.Database(DBName).ListCollections(ctx, bson.D{})
		defer cols.Close(ctx)

		for cols.Next(ctx) {
			var colInfo CollectionInfo
			if err := cols.Decode(&colInfo); err != nil {
				fmt.Println("error::", err)
			}
			fmt.Printf("Name: %s, Type: %s \n", colInfo.Name, colInfo.Type)
		}

		data := client.Database(DBName).Collection("zips")

		var results bson.D

		doc := data.FindOne(ctx, filter)

		doc.Decode(&results)

		// fmt.Println(results)
		return c.JSON(results)

	})

	defer database.Disconnect()

	// use logger

	app.Get("/", func(c *fiber.Ctx) error {
		return c.Send([]byte("Hello fuckers!!!!"))
	})

	app.Post("/sum", func(c *fiber.Ctx) error {
		var body bodyType
		c.BodyParser(&body)

		fmt.Println(body)
		sum := body.a + body.b

		return c.JSON(sum)
	})

	app.Use(logger.New())
	app.Use((cors.New(cors.Config{AllowCredentials: true, AllowOrigins: "*"})))
	app.Listen(":3003")
}
