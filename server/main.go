package main

import (
	// "context"
	"fmt"
	"log"

	fiber "github.com/gofiber/fiber/v2"
	cors "github.com/gofiber/fiber/v2/middleware/cors"
	logger "github.com/gofiber/fiber/v2/middleware/logger"
	"go.mongodb.org/mongo-driver/bson"

	database "reacter/database"
)

// type Customer struct {
// 	gender       string `bson:"omitempty"`
// 	age          int    `bson:"omitempty"`
// 	email        string `bson:"omitempty"`
// 	satisfaction int    `bson:"omitempty"`
// }

// type Item struct {
// 	name     string   `bson:"omitempty"`
// 	tags     []string `bson:"omitempty"`
// 	price    float64  `bson:"omitempty"`
// 	quantity int      `bson:"omitempty"`
// }
// type Sales struct {
// 	saleDate       string   `bson:"omitempty"`
// 	items          []Item   `bson:"omitempty"`
// 	storeLocation  string   `bson:"omitempty"`
// 	customer       Customer `bson:"omitempty"`
// 	couponUsed     bool     `bson:"omitempty"`
// 	purchaseMethod string   `bson:"omitempty"`
// }

func main() {
	// initials web server with fiber
	// and starts listening for requests
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		client, ctx := database.Connect()
		defer database.Disconnect()

		collection, err := client.ListDatabases(ctx, bson.M{}); if err != nil {
			log.Fatal("48", err)
		}
		
		// var result bson.D
		// err := collection.FindOne(context.TODO(), bson.D{}).Decode(&result)
		// if err != nil {
		// 	log.Fatal(err)
		// }

		fmt.Println(collection)
		// return c.JSON(result)
		return c.JSON(collection)

	})

	app.Get("/many", func(c *fiber.Ctx) error {
		client, ctx := database.Connect()

		//list all collections
		// collections := database.ListCollections(client, ctx)

		collection := client.Database("sample_supplies").Collection("sales")

		var results bson.D
		// bson.D{{"type", bson.D{{"$eq", "Oolong"}}}} // docs see : https://www.mongodb.com/docs/drivers/go/current/fundamentals/crud/read-operations/query-document/
		// filter := bson.M{"customer": bson.D{{"age", bson.D{{"$gt", 40}}}}}
		filter := bson.M{"couponUsed": false}

		doc := collection.FindOne(ctx, filter)

		doc.Decode(&results)

		fmt.Println(results)
		return c.JSON(results)

	})

	defer database.Disconnect()

	// use logger
	app.Use(logger.New())
	app.Use((cors.New(cors.Config{AllowCredentials: true, AllowOrigins: "*"})))
	app.Listen(":3003")
}
