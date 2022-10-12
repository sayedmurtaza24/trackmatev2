package students

import (
	"github.com/gofiber/fiber/v2"
	"github.com/sayedmurtaza24/trackmatev2/database/query"
	"gorm.io/gorm"
)

type StudentHandler struct {
	query *query.StudentQueryI
}

func RegisterRoute(app *fiber.App, db *gorm.DB) {
	h := StudentHandler{
		query: &query.StudentQueryI{
			DB: db,
		},
	}

	r := app.Group("/api/students")

	r.Get("/", h.handleCreateStudent)
}
