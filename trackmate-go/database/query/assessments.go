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

func (query AssessmentQueryI) CreateAssessment(
	StudentID uint,
	Date time.Time,
	AssessmentFields []types.AssessmentField,
	TeacherEmail string,
) (*models.Assessment, error) {

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
		return &assessment, errors.New("student wasn't found")
	}

	teacher := models.Teacher{}
	if db := query.DB.Where("email = ?", TeacherEmail).Find(&teacher); db.Error != nil {
		return &assessment, errors.New("teacher not found")
	}

	fieldOptions := []types.FieldOption{}

	fieldOptionsEncoded, err := teacher.FieldOptions.MarshalJSON()
	if err != nil {
		return &assessment, errors.New("some error")
	}

	if err := json.Unmarshal(fieldOptionsEncoded, &fieldOptions); err != nil {
		return &assessment, errors.New("some error")
	}

	// this is how to make an array with a specified length
	fields := make([]models.AssessmentField, len(AssessmentFields))

	if len(AssessmentFields) != len(fieldOptions) {
		return &assessment, errors.New("correct number of assessment fields is necessary to proceed")
	}

	// validation for field options
	for i, f := range AssessmentFields {
		exists := false
		valid := false
		for _, fo := range fieldOptions {
			if fo.Name == f.Name {
				exists = true
				if f.Value <= fo.ValueRange {
					valid = true
				}
			}
		}
		if !exists || !valid {
			return &assessment, errors.New("field option has an error (it either exists or the value range is incorrect)")
		}
		fields[i] = models.AssessmentField{Name: f.Name, Value: f.Value, Comment: f.Comment}
	}

	assessment.Fields = fields
	assessment.StudentID = student.ID

	query.DB.Create(&assessment)

	return &assessment, nil
}

func (query AssessmentQueryI) UpdateAssessment(
	AssessmentID uint,
	Date time.Time,
	AssessmentFields []types.AssessmentField,
	TeacherEmail string,
) (*models.Assessment, error) {

	assessment := models.Assessment{}

	teacher := models.Teacher{}
	if db := query.DB.Where("email = ?", TeacherEmail).Find(&teacher); db.Error != nil {
		return &assessment, errors.New("teacher wasn't found")
	}

	if db := query.DB.
		Preload("Fields").
		Where("assessments.id = ? AND teachers.email = ?", AssessmentID, TeacherEmail).
		Joins("left join students on students.id = assessments.student_id").
		Joins("left join classes on classes.id = students.class_id").
		Joins("left join teachers on teachers.id = classes.teacher_id").
		Find(&assessment); db.Error != nil {
		return &assessment, db.Error
	}

	if assessment.ID == 0 {
		return &assessment, errors.New("assessment wasn't found")
	}

	fieldOptions := []types.FieldOption{}

	fieldOptionsEncoded, err := teacher.FieldOptions.MarshalJSON()
	if err != nil {
		return &assessment, errors.New("some error")
	}

	if err := json.Unmarshal(fieldOptionsEncoded, &fieldOptions); err != nil {
		return &assessment, errors.New("some error")
	}

	for i, f := range AssessmentFields {
		exists := false
		valid := false
		for _, fo := range fieldOptions {
			if fo.Name == f.Name {
				exists = true
				if f.Value <= fo.ValueRange {
					valid = true
				}
			}
		}
		if !exists || !valid {
			return &assessment, errors.New("field option has an error (it either doesn't exists or the value range is incorrect)")
		}
		assessment.Fields[i].Name = f.Name
		assessment.Fields[i].Value = f.Value
		assessment.Fields[i].Comment = f.Comment
	}

	assessment.Date = Date

	query.DB.Save(&assessment)

	return &assessment, nil
}
