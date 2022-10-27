package students

import (
	"time"

	"github.com/gofiber/fiber/v2"
)

type UpdateStudentSchemaI struct {
	FirstName      string `json:"firstName" validate:"required,alpha,min=2,max=24"`
	LastName       string `json:"lastName" validate:"required,alpha,min=2,max=24"`
	Dob            string `json:"dob"`
	Gender         string `json:"gender" validate:"required,alpha,min=2,max=10"`
	GuardianEmail  string `json:"guardianEmail" validate:"email"`
	GuardianNumber string `json:"guardianNo" validate:"e164"`
}

func (h StudentHandler) handleUpdateStudent(c *fiber.Ctx) error {
	email := c.Locals("Email").(string)

	params := struct {
		StudentID uint `params:"id"`
	}{}

	if err := c.ParamsParser(&params); err != nil {
		return c.Status(403).JSON(map[string]string{"message": "Student ID should be integer"})
	}

	var body UpdateStudentSchemaI

	if err := c.BodyParser(&body); err != nil {
		return c.Status(422).JSON(err.Error())
	}

	dob, err := time.Parse("2006-01-02", body.Dob)

	if err != nil {
		return c.Status(403).JSON(map[string]string{"message": "can't parse date for dob"})
	}

	student, err := h.query.UpdateStudent(params.StudentID, body.FirstName, body.LastName, dob, body.Gender, body.GuardianEmail, body.GuardianNumber, email)

	if err != nil {
		return c.Status(403).JSON(map[string]string{"message": "something went wrong"})
	}

	return c.Status(201).JSON(&student)
}
