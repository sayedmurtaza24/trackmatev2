package query

import (
	"errors"

	"github.com/sayedmurtaza24/trackmatev2/models"
	"gorm.io/gorm"
)

type ClassQueryI struct {
	DB *gorm.DB
}

func (query ClassQueryI) CreateClass(ClassName string, TeacherEmail string) (models.Class, error) {
	class := models.Class{ClassName: ClassName}
	teacher := models.Teacher{}

	if db := query.DB.Where("email = ?", TeacherEmail).Find(&teacher); db.Error != nil {
		return class, db.Error
	}

	class.TeacherID = uint(teacher.ID)

	if db := query.DB.Create(&class); db.Error != nil {
		return class, db.Error
	}

	return class, nil
}

func (query ClassQueryI) GetClass(ID uint, TeacherEmail string) (*models.Class, error) {
	class := models.Class{}

	if db :=
		query.DB.
			Preload("Students").
			Where("classes.id = ?", ID).
			Joins("Teacher", query.DB.Where(&models.Teacher{Email: TeacherEmail})).
			Find(&class); db.Error != nil {
		return &class, db.Error
	}

	if class.ID == 0 {
		return &class, errors.New("no class found")
	}

	return &class, nil
}
