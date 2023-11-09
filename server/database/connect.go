package database

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	env "github.com/joho/godotenv"
	// "go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

var DB_NAME = "sample_training"

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

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Hour) // 10 seconds

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(MONGO_URI))
	if err != nil {
		log.Fatal(err)
	}
	// Ping the primary
	if err := client.Ping(context.TODO(), readpref.Primary()); err != nil {
		panic(err)
	}
	fmt.Println("Database Successfully connected and pinged.")
	// defer client.Disconnect(ctx)

	return client, ctx
}

// GetCollection returns a collection from the database
func GetCollection(client *mongo.Client, collectionName string) *mongo.Collection {

	collection := client.Database(DB_NAME).Collection(collectionName)
	return collection
}

// list all collections
func ListCollections(client *mongo.Client, ctx context.Context) []string {
	collections, err := client.Database(DB_NAME).ListCollectionNames(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	return collections
}

func Disconnect() {
	fmt.Println("Disconnecting from database...")
	clt, ctx := Connect()
	err := clt.Disconnect(ctx)
	
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel() // cancel when we are finished consuming integers

	if err != nil {
		log.Fatal(err)
	}
}
