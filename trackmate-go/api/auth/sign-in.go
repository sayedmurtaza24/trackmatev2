package auth

import (
	"time"

	"github.com/gofiber/fiber/v2"
)

type LoginSchemaIn struct {
	IDToken string `json:"id_token"`
}

func (h *AuthHandler) handleSignIn(c *fiber.Ctx) error {
	var loginSchema LoginSchemaIn
	if err := c.BodyParser(&loginSchema); err != nil {
		return c.SendStatus(403)
	}

	sessionToken, err := h.FirebaseAuth.SessionCookie(c.Context(), loginSchema.IDToken, 24*60*60*3*time.Second)

	if err != nil {
		return c.SendStatus(403)
	}

	c.Cookie(&fiber.Cookie{Name: "Authorization", Value: "Bearer " + sessionToken})

	return c.Status(200).JSON(map[string]string{"token": sessionToken})
}
