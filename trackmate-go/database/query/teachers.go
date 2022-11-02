package query

import (
	"errors"

	"encoding/json"

	"github.com/sayedmurtaza24/trackmatev2/models"
	"github.com/sayedmurtaza24/trackmatev2/types"
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type TeacherQueryI struct {
	DB *gorm.DB
}

func (query TeacherQueryI) CreateTeacher(
	FirstName string,
	LastName string,
	FieldOptions []types.FieldOption,
	Email string) (models.Teacher, error) {

	encoded, err := json.Marshal(&FieldOptions)

	if err != nil {
		return models.Teacher{}, err
	}

	fo := datatypes.JSON(encoded)

	teacher := models.Teacher{FirstName: FirstName, LastName: LastName, Email: Email, FieldOptions: fo}

	if db := query.DB.Create(&teacher); db.Error != nil {
		return teacher, db.Error
	}

	return teacher, nil
}

func (query TeacherQueryI) GetTeacher(Email string) (models.Teacher, error) {
	teacher := models.Teacher{}

	if db := query.DB.
		Preload("Classes").
		Where("email = ?", Email).
		First(&teacher); db.Error != nil {
		return teacher, db.Error
	}

	if teacher.ID == 0 {
		return teacher, errors.New("teacher not found")
	}

	return teacher, nil
}
