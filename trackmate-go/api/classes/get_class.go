package classes

import (
	"github.com/gofiber/fiber/v2"
)

func (h ClassHandler) handleGetClass(c *fiber.Ctx) error {
	email := c.Locals("Email").(string)

	param := struct {
		ID uint `params:"id"`
	}{}

	if err := c.ParamsParser(&param); err != nil {
		return c.Status(403).JSON(map[string]string{"message": "Class ID should be integer"})
	}

	class, err := h.query.GetClass(param.ID, email)

	if err != nil {
		return c.Status(403).JSON(map[string]string{"message": "Class doesn't exist. Call reception!"})
	}

	return c.Status(201).JSON(&class)
}
