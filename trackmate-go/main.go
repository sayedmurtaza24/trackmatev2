package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/sayedmurtaza24/trackmatev2/api/assessments"
	authC "github.com/sayedmurtaza24/trackmatev2/api/auth"
	"github.com/sayedmurtaza24/trackmatev2/api/classes"
	"github.com/sayedmurtaza24/trackmatev2/api/students"
	"github.com/sayedmurtaza24/trackmatev2/api/teachers"
	"github.com/sayedmurtaza24/trackmatev2/database"
	"github.com/sayedmurtaza24/trackmatev2/firebase"
	"github.com/spf13/viper"
)

func main() {
	viper.SetConfigFile(".env")

	if err := viper.ReadInConfig(); err != nil {
		panic(err)
	}

	dbUrl := viper.Get("DATABASE_URL").(string)

	app := fiber.New()
	db := database.GetDB(dbUrl)
	authClient := firebase.InitAuth()

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:19006",
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		AllowMethods:     "GET,POST,DELETE,PATCH,PUT",
		AllowCredentials: true,
	}))

	app.Use(authC.AuthMiddleware(authClient))

	authC.RegisterRoute(app, authClient)
	students.RegisterRoute(app, db)
	teachers.RegisterRoute(app, db)
	classes.RegisterRoute(app, db)
	assessments.RegisterRoute(app, db)

	err := app.Listen(":3000")

	if err != nil {
		log.Fatal(err)
	}
}
