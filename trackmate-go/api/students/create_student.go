package students

import (
	"github.com/gofiber/fiber/v2"
	"github.com/sayedmurtaza24/trackmatev2/models"
)

func (h StudentHandler) handleCreateStudent(c *fiber.Ctx) error {
	var student models.Student

	if err := c.BodyParser(&student); err != nil {
		return c.Status(400).JSON(err.Error())
	}

	h.query.CreateStudent(&student)

	return c.Status(200).JSON(student)
}

// firebase <= client,    firebase-admin-sdk => server
// login => id_token => auth/login =>
// 1. verify 2. session_token (3days)
// 3. 200 => set-cookie authorization header with cookie
// we will always receive authorization header with cookie
// middleware => all of the endpoints
// verify_session_token => email => pass the email
