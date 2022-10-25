package query

import (
	"errors"

	"github.com/sayedmurtaza24/trackmatev2/models"
	"gorm.io/gorm"
)

type TeacherQueryI struct {
	DB *gorm.DB
}

func (query TeacherQueryI) CreateTeacher(FirstName string, LastName string, Email string) (models.Teacher, error) {
	teacher := models.Teacher{FirstName: FirstName, LastName: LastName, Email: Email}

	if db := query.DB.Create(&teacher); db.Error != nil {
		return teacher, db.Error
	}

	return teacher, nil
}

func (query TeacherQueryI) GetTeacher(Email string) (models.Teacher, error) {
	teacher := models.Teacher{Email: Email}

	if db := query.DB.Preload("Classes").Find(&teacher); db.Error != nil {
		return teacher, db.Error
	}

	if teacher.ID == 0 {
		return teacher, errors.New("Teacher not found")
	}

	return teacher, nil
}
