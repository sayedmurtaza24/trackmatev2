package teachers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/sayedmurtaza24/trackmatev2/database/query"
	"gorm.io/gorm"
)

type TeacherHandler struct {
	query *query.TeacherQueryI
}

func RegisterRoute(app *fiber.App, db *gorm.DB) {
	h := TeacherHandler{
		query: &query.TeacherQueryI{
			DB: db,
		},
	}

	r := app.Group("/api/teachers")

	r.Post("/", h.handleCreateTeacher)
	r.Get("/", h.handleGetTeacher)
}
