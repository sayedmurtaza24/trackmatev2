package auth

import "github.com/gofiber/fiber/v2"

func (h *AuthHandler) handleLogout(c *fiber.Ctx) error {
	uid := c.Locals("UID").(string)

	if err := h.FirebaseAuth.RevokeRefreshTokens(c.Context(), uid); err != nil {
		return c.SendStatus(401)
	}

	c.Cookie(&fiber.Cookie{Name: "Authorization", Value: ""})

	return c.SendStatus(200)
}
