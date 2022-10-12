package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/sayedmurtaza24/trackmatev2/database"
	"github.com/spf13/viper"
)

func main() {
	viper.SetConfigFile(".env")

	if err := viper.ReadInConfig(); err != nil {
		panic(err)
	}

	dbUrl := viper.Get("DATABASE_URL").(string)

	app := fiber.New()
	database.GetDB(dbUrl)
	err := app.Listen(":3000")

	if err != nil {
		log.Fatal(err)
	}
}
