package assessments

import (
	"github.com/gofiber/fiber/v2"
	"github.com/sayedmurtaza24/trackmatev2/database/query"
	"gorm.io/gorm"
)

type AssessmentHandler struct {
	query *query.AssessmentQueryI
}

func RegisterRoute(app *fiber.App, db *gorm.DB) {
	h := AssessmentHandler{
		query: &query.AssessmentQueryI{
			DB: db,
		},
	}

	r := app.Group("/api/assessments")

	r.Post("/", h.handleCreateAssessment)
}
