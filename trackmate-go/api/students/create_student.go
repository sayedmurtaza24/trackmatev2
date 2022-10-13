package students

import "github.com/gofiber/fiber/v2"

type CreateStudentSchemaI struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
}

func (h StudentHandler) handleCreateStudent(c *fiber.Ctx) error {
	// email := c.Locals("Email").(string)

	// var body CreateStudentSchemaI

	// if err := c.BodyParser(&body); err != nil {
	// 	return c.Status(422).JSON(err.Error())
	// }

	// student, err := h.query.CreateStudent(body.FirstName, body.LastName, email)

	// if err != nil {
	// 	return c.Status(403).JSON(map[string]string{"message": "something went wrong"})
	// }

	// return c.Status(201).JSON(&student)
	return c.Next()
}
