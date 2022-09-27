package database

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	env "github.com/joho/godotenv"
	// "go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB_NAME = "golang-app"

// Connect to the database returns a client and a context
func Connect() (*mongo.Client, context.Context) {
	// load .env file
	err := env.Load("../global/.env")
	// if there is an error loading the .env file
	if err != nil {
		log.Fatal("Error loading .env file")
		// panic in case of error
		panic(err)
	}
	// get the database url from the .env file
	MONGO_URI := os.Getenv("MONGO_URI")

	client, err := mongo.NewClient(options.Client().ApplyURI(MONGO_URI))
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connecting to database...")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second) // 10 seconds

	fmt.Println("after ctx")

	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}

	defer client.Disconnect(ctx)

	return client, ctx
}

// GetCollection returns a collection from the database
func GetCollection(client *mongo.Client, collectionName string) *mongo.Collection {

	collection := client.Database(DB_NAME).Collection(collectionName)
	return collection
}
