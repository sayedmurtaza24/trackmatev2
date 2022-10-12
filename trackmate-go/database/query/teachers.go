package query

import (
	"github.com/sayedmurtaza24/trackmatev2/models"
	"gorm.io/gorm"
)

type TeacherQueryI struct {
	DB *gorm.DB
}

func (query TeacherQueryI) CreateTeacher(teacher *models.Teacher) {
	query.DB.Create(&teacher)
}
