package classes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/sayedmurtaza24/trackmatev2/database/query"
	"gorm.io/gorm"
)

type ClassHandler struct {
	query *query.ClassQueryI
}

func RegisterRoute(app *fiber.App, db *gorm.DB) {
	h := ClassHandler{
		query: &query.ClassQueryI{
			DB: db,
		},
	}

	r := app.Group("/api/classes")

	r.Post("/", h.handleCreateClass)
	// r.Get("/", h.handleGetClass)
}
