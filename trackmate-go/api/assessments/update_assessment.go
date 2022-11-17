package assessments

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/sayedmurtaza24/trackmatev2/types"
)

type UpdateAssessmentSchemaI struct {
	Date             string                  `json:"date" validate:"required"`
	AssessmentFields []types.AssessmentField `json:"fields" validate:"required"`
}

func (h AssessmentHandler) handleUpdateAssessment(c *fiber.Ctx) error {
	email := c.Locals("Email").(string)

	param := struct {
		AssessmentID uint `params:"id"`
	}{}

	println(param.AssessmentID)

	if err := c.ParamsParser(&param); err != nil {
		return c.Status(403).JSON(map[string]string{"message": "Assessment ID should be integer"})
	}

	var body UpdateAssessmentSchemaI

	if err := c.BodyParser(&body); err != nil {
		return c.Status(422).JSON(err.Error())
	}

	date, err := time.Parse("2006-01-02", body.Date)

	if err != nil {
		return c.Status(403).JSON(map[string]string{"message": "can't parse date for date"})
	}

	assessment, err := h.query.UpdateAssessment(param.AssessmentID, date, body.AssessmentFields, email)

	if err != nil {
		print(err.Error())
		return c.Status(403).JSON(map[string]string{"message": "something went wrong in the update assessement"})
	}

	return c.Status(201).JSON(&assessment)
}
