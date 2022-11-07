package assessments

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/sayedmurtaza24/trackmatev2/types"
)

type CreateAssessmentSchemaI struct {
	Date             string                  `json:"date"`
	AssessmentFields []types.AssessmentField `json:"assessmentFields" validate:"required"`
}

func (h AssessmentHandler) handleCreateAssessment(c *fiber.Ctx) error {
	email := c.Locals("Email").(string)

	query := struct {
		StudentID uint `query:"studentId"`
	}{}

	if err := c.QueryParser(&query); err != nil {
		return c.Status(403).JSON(map[string]string{"message": "Student ID should be integer"})
	}

	var body CreateAssessmentSchemaI

	if err := c.BodyParser(&body); err != nil {
		return c.Status(422).JSON(err.Error())
	}

	date, err := time.Parse("2006-01-02", body.Date)

	if err != nil {
		return c.Status(403).JSON(map[string]string{"message": "can't parse date for date"})
	}

	assessment, err := h.query.CreateAssessment(query.StudentID, date, body.AssessmentFields, email)

	if err != nil {
		println(err.Error())
		return c.Status(403).JSON(map[string]string{"message": "something went wrong"})
	}

	return c.Status(201).JSON(&assessment)
}
