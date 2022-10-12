package query

import (
	"github.com/sayedmurtaza24/trackmatev2/models"
	"gorm.io/gorm"
)

type StudentQueryI struct {
	DB *gorm.DB
}

func (query StudentQueryI) CreateStudent(student *models.Student) {
	query.DB.Create(&student)
}
