package students

import (
	"time"

	"github.com/gofiber/fiber/v2"
)

type CreateStudentSchemaI struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Dob       string `json:"dob"`
	Gender    string `json:"gender"`
}

func (h StudentHandler) handleCreateStudent(c *fiber.Ctx) error {
	email := c.Locals("Email").(string)

	query := struct {
		ClassID uint `query:"classId"`
	}{}

	if err := c.QueryParser(&query); err != nil {
		return c.Status(403).JSON(map[string]string{"message": "Class ID should be integer"})
	}

	var body CreateStudentSchemaI

	if err := c.BodyParser(&body); err != nil {
		return c.Status(422).JSON(err.Error())
	}

	dob, err := time.Parse("2006-01-02", body.Dob)

	if err != nil {
		return c.Status(403).JSON(map[string]string{"message": "can't parse date for dob"})
	}

	student, err := h.query.CreateStudent(query.ClassID, body.FirstName, body.LastName, dob, body.Gender, email)

	if err != nil {
		return c.Status(403).JSON(map[string]string{"message": "something went wrong"})
	}

	return c.Status(201).JSON(&student)
}
