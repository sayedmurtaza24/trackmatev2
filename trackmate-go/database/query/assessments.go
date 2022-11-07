package query

import (
	"encoding/json"
	"errors"
	"time"

	"github.com/sayedmurtaza24/trackmatev2/models"
	"github.com/sayedmurtaza24/trackmatev2/types"
	"gorm.io/gorm"
)

type AssessmentQueryI struct {
	DB *gorm.DB
}

func (query AssessmentQueryI) CreateAssessment(StudentID uint, Date time.Time, AssessmentFields []types.AssessmentField, TeacherEmail string) (*models.Assessment, error) {
	assessment := models.Assessment{Date: Date}
	student := models.Student{}

	if db := query.DB.
		Where("students.id = ? AND teachers.email = ?", StudentID, TeacherEmail).
		Joins("left join classes on classes.id = students.class_id").
		Joins("left join teachers on teachers.id = classes.teacher_id").
		Find(&student); db.Error != nil {
		return &assessment, db.Error
	}

	if student.ID == 0 {
		return &assessment, errors.New("Student wasn't found")
	}

	teacher := models.Teacher{}
	if db := query.DB.Where("email = ?", TeacherEmail).Find(&teacher); db.Error != nil {
		return &assessment, errors.New("Teacher not found")
	}

	fieldOptions := []types.FieldOption{}

	fieldOptionsEncoded, err := teacher.FieldOptions.MarshalJSON()
	if err != nil {
		return &assessment, errors.New("Some error")
	}

	if err := json.Unmarshal(fieldOptionsEncoded, &fieldOptions); err != nil {
		return &assessment, errors.New("Some error")
	}

	// this is how to make an array with a specified length
	fields := make([]models.AssessmentField, len(AssessmentFields))

	if len(AssessmentFields) != len(fieldOptions) {
		return &assessment, errors.New("Correct number of assessment fields is necessary to proceed!")
	}

	//validation for field options
	for i, f := range AssessmentFields {
		exists := false
		valid := false
		for _, fo := range fieldOptions {
			if fo.Name == f.Name {
				exists = true
				if f.Value < fo.ValueRange {
					valid = true
				}
			}
		}
		if exists == false || valid == false {
			return &assessment, errors.New("Field option has an error (it either exists or the value range is incorrect).")
		}
		fields[i] = models.AssessmentField{Name: f.Name, Value: f.Value, Comment: f.Comment}
	}

	assessment.Fields = fields
	assessment.StudentID = student.ID

	query.DB.Create(&assessment)

	return &assessment, nil
}

func (query AssessmentQueryI) UpdateAssessment(StudentID uint, Date time.Time, AssessmentFields []types.AssessmentField, TeacherEmail string) (models.Assessment, error) {
	class := models.Assessment{}
	// teacher := models.Teacher{Email: TeacherEmail}

	// if db := query.DB.Find(&teacher); db.Error != nil {
	// 	return class, db.Error
	// }

	// class.TeacherID = uint(teacher.ID)

	// if db := query.DB.Create(&class); db.Error != nil {
	// 	return class, db.Error
	// }

	return class, nil
}
