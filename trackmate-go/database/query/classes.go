package query

import (
	"github.com/sayedmurtaza24/trackmatev2/models"
	"gorm.io/gorm"
)

type ClassQueryI struct {
	DB *gorm.DB
}

func (query ClassQueryI) CreateClass(ClassName string, TeacherEmail string) (models.Class, error) {
	class := models.Class{ClassName: ClassName}
	teacher := models.Teacher{Email: TeacherEmail}

	if db := query.DB.Find(&teacher); db.Error != nil {
		return class, db.Error
	}

	class.TeacherID = int(teacher.ID)

	if db := query.DB.Create(&class); db.Error != nil {
		return class, db.Error
	}

	return class, nil
}

func (query ClassQueryI) GetClass(ID uint, TeacherEmail string) (models.Class, error) {
	class := models.Class{}

	if db :=
		query.DB.Preload("Students").Find(&class); db.Error != nil {
		return class, db.Error
	}

	return class, nil
}
