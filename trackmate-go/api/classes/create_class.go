package classes

import (
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type CreateClassSchemaI struct {
	ClassName string `json:"className" validate:"required,alphanum,min=1"`
}

func (h ClassHandler) handleCreateClass(c *fiber.Ctx) error {
	email := c.Locals("Email").(string)

	var body CreateClassSchemaI

	if err := c.BodyParser(&body); err != nil {
		return c.Status(422).JSON(err.Error())
	}

	validate := validator.New()

	if err := validate.Struct(body); err != nil {
		return c.Status(403).JSON("Bad request: add class name")
	}

	class, err := h.query.CreateClass(body.ClassName, email)

	if err != nil {
		return c.Status(403).JSON(map[string]string{"message": "Class error unknown. Call reception!"})
	}

	return c.Status(201).JSON(&class)
}
