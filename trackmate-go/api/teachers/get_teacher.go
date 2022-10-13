package teachers

import (
	"github.com/gofiber/fiber/v2"
)

func (h TeacherHandler) handleGetTeacher(c *fiber.Ctx) error {
	email := c.Locals("Email").(string)

	teacher, err := h.query.GetTeacher(email)

	if err != nil {
		return c.Status(404).JSON(map[string]string{"message": "Teacher can't be found. Call reception!"})
	}

	return c.Status(200).JSON(&teacher)
}
