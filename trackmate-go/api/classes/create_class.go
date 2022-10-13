package classes

import (
	"github.com/gofiber/fiber/v2"
)

type CreateClassSchemaI struct {
	ClassName string `json:"class_name"`
}

func (h ClassHandler) handleCreateClass(c *fiber.Ctx) error {
	email := c.Locals("Email").(string)

	var body CreateClassSchemaI

	if err := c.BodyParser(&body); err != nil {
		return c.Status(422).JSON(err.Error())
	}

	class, err := h.query.CreateClass(body.ClassName, email)

	if err != nil {
		return c.Status(403).JSON(map[string]string{"message": "Class error unknown. Call reception!"})
	}

	return c.Status(201).JSON(&class)
}
