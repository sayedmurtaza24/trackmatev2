package students

import (
	"github.com/gofiber/fiber/v2"
)

func (h StudentHandler) handleDeleteStudent(c *fiber.Ctx) error {
	email := c.Locals("Email").(string)

	param := struct {
		ID uint `params:"id"`
	}{}

	if err := c.ParamsParser(&param); err != nil {
		return c.Status(403).JSON(map[string]string{"message": "Student ID should be integer"})
	}

	student, err := h.query.DeleteStudent(param.ID, email)

	if err != nil {
		return c.Status(403).JSON(map[string]string{"message": "Student doesn't exist. Call reception!"})
	}

	return c.Status(200).JSON(&student)
}
