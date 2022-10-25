package main

import (
	"log"
	"strings"

	"firebase.google.com/go/auth"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	authC "github.com/sayedmurtaza24/trackmatev2/api/auth"
	"github.com/sayedmurtaza24/trackmatev2/api/classes"
	"github.com/sayedmurtaza24/trackmatev2/api/students"
	"github.com/sayedmurtaza24/trackmatev2/api/teachers"
	"github.com/sayedmurtaza24/trackmatev2/database"
	"github.com/sayedmurtaza24/trackmatev2/firebase"
	"github.com/spf13/viper"
)

func authMiddleware(a *auth.Client) func(*fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		authHeader := c.Get("Authorization")
		if len(authHeader) == 0 {
			return c.SendStatus(403)
		}

		authSplit := strings.Split(authHeader, " ")
		if len(authSplit) != 2 {
			return c.SendStatus(403)
		}

		token, err := a.VerifySessionCookie(c.Context(), authSplit[1])
		if err != nil {
			return c.SendStatus(403)
		}

		user, err := a.GetUser(c.Context(), token.UID)
		if err != nil {
			return c.SendStatus(403)
		}

		c.Locals("Email", user.Email)

		return c.Next()
	}
}

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

	authC.RegisterRoute(app, authClient)

	app.Use(authMiddleware(authClient))

	students.RegisterRoute(app, db)
	teachers.RegisterRoute(app, db)
	classes.RegisterRoute(app, db)

	err := app.Listen(":3000")

	if err != nil {
		log.Fatal(err)
	}
}
