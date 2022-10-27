package auth

import (
	"strings"

	"firebase.google.com/go/auth"
	"github.com/gofiber/fiber/v2"
)

func AuthMiddleware(a *auth.Client) func(*fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		e := c.OriginalURL()
		if strings.Contains(e, "/api/auth/login") {
			return c.Next()
		}

		authHeader := c.Get("Authorization")
		if len(authHeader) == 0 {
			return c.SendStatus(403)
		}

		authSplit := strings.Split(authHeader, " ")
		if len(authSplit) != 2 {
			return c.SendStatus(403)
		}

		token, err := a.VerifySessionCookieAndCheckRevoked(c.Context(), authSplit[1])
		if err != nil {
			return c.SendStatus(403)
		}

		user, err := a.GetUser(c.Context(), token.UID)
		if err != nil {
			return c.SendStatus(403)
		}

		c.Locals("Email", user.Email)
		c.Locals("UID", user.UID)

		return c.Next()
	}
}
