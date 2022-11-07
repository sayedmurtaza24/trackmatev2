package assessments

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/sayedmurtaza24/trackmatev2/types"
)

type UpdateAssessmentSchemaI struct {
	Date             time.Time               `json:"date"`
	AssessmentFields []types.AssessmentField `json:"assessmentField" validate:"required"`
}

func (h AssessmentHandler) handleUpdateAssessment(c *fiber.Ctx) error {
	email := c.Locals("Email").(string)

	query := struct {
		AssessmentID uint `query:"assessmentId"`
	}{}

	if err := c.QueryParser(&query); err != nil {
		return c.Status(403).JSON(map[string]string{"message": "Assessment ID should be integer"})
	}

	var body UpdateAssessmentSchemaI

	if err := c.BodyParser(&body); err != nil {
		return c.Status(422).JSON(err.Error())
	}

	assessment, err := h.query.UpdateAssessment(query.AssessmentID, body.Date, body.AssessmentFields, email)

	if err != nil {
		return c.Status(403).JSON(map[string]string{"message": "something went wrong"})
	}

	return c.Status(201).JSON(&assessment)
}
