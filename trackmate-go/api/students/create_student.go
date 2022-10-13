package students

import (
	"github.com/gofiber/fiber/v2"
	// "github.com/sayedmurtaza24/trackmatev2/models"
)

func (h StudentHandler) handleCreateStudent(c *fiber.Ctx) error {
	email := c.Locals("Email").(string)

	// var student models.Student

	// if err := c.BodyParser(&student); err != nil {
	// 	return c.Status(400).JSON(err.Error())
	// }

	// h.query.CreateStudent(&student)

	return c.Status(200).SendString(email)
}
