package auth

import (
	"firebase.google.com/go/auth"
	"github.com/gofiber/fiber/v2"
)

type AuthHandler struct {
	FirebaseAuth *auth.Client
}

func RegisterRoute(app *fiber.App, auth *auth.Client) {
	h := AuthHandler{
		FirebaseAuth: auth,
	}

	r := app.Group("/api/auth")

	r.Post("/login", h.handleSignIn)
}
