package auth

import (
	"firebase.google.com/go/auth"
	"github.com/gofiber/fiber/v2"
)

type AuthHandler struct {
	FirebaseAuth *auth.Client
	FiberCtx     *fiber.Ctx
}
