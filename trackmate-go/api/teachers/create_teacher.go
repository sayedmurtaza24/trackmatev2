package teachers

import (
	"github.com/gofiber/fiber/v2"
)

type CreateTeacherSchemaI struct {
	FirstName string `json:"firstName" validate:"required,alpha,min=2,max=24"`
	LastName  string `json:"lastName" validate:"required,alpha,min=2,max=24"`
}

func (h TeacherHandler) handleCreateTeacher(c *fiber.Ctx) error {
	email := c.Locals("Email").(string)

	var body CreateTeacherSchemaI

	if err := c.BodyParser(&body); err != nil {
		return c.Status(422).JSON(err.Error())
	}

	teacher, err := h.query.CreateTeacher(body.FirstName, body.LastName, email)

	if err != nil {
		return c.Status(403).JSON(map[string]string{"message": "Teacher already exists with this email"})
	}

	return c.Status(201).JSON(&teacher)
}
