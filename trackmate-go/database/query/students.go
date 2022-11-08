package query

import (
	"errors"
	"time"

	"github.com/sayedmurtaza24/trackmatev2/models"
	"gorm.io/gorm"
)

type StudentQueryI struct {
	DB *gorm.DB
}

func (query StudentQueryI) CreateStudent(
	ClassID uint,
	FirstName string,
	LastName string,
	Dob time.Time,
	Gender string,
	TeacherEmail string) (*models.Student, error) {

	student := models.Student{FirstName: FirstName, LastName: LastName, Dob: Dob, Gender: Gender}

	classQuery := ClassQueryI(query)

	class, err := classQuery.GetClass(ClassID, TeacherEmail)

	if err != nil {
		return &student, err
	}

	student.ClassID = class.ID

	query.DB.Create(&student)

	return &student, nil
}

func (query StudentQueryI) GetStudent(ID uint, TeacherEmail string) (*models.Student, error) {
	student := models.Student{}

	if db :=
		query.DB.
			Preload("Assessments").
			Preload("Assessments.Fields").
			Where("students.id = ?", ID).
			Joins("left join classes on classes.id = students.class_id").
			Joins("left join teachers on teachers.id = classes.teacher_id").
			Find(&student); db.Error != nil {
		return &student, db.Error
	}

	if student.ID == 0 {
		return &student, errors.New("no student found")
	}

	return &student, nil
}

func (query StudentQueryI) DeleteStudent(ID uint, TeacherEmail string) (*models.Student, error) {
	student := models.Student{}

	if db :=
		query.DB.
			Where("students.id = ?", ID).
			Joins("left join classes on classes.id = students.class_id").
			Joins("left join teachers on teachers.id = classes.teacher_id").
			Find(&student); db.Error != nil {
		return &student, db.Error
	}

	if student.ID == 0 {
		return &student, errors.New("no student found")
	}

	query.DB.Delete(&student)

	return &student, nil
}

func (query StudentQueryI) UpdateStudent(
	StudentID uint,
	FirstName string,
	LastName string,
	Dob time.Time,
	Gender string,
	GuardianEmail string,
	GuardianNumber string,
	Email string,
) (*models.Student, error) {
	student := models.Student{}

	if db :=
		query.DB.
			Where("students.id = ?", StudentID).
			Joins("left join classes on classes.id = students.class_id").
			Joins("left join teachers on teachers.id = classes.teacher_id").
			Find(&student); db.Error != nil {
		return &student, db.Error
	}

	if student.ID == 0 {
		return &student, errors.New("no student found")
	}

	student.FirstName = FirstName
	student.LastName = LastName
	student.Dob = Dob
	student.Gender = Gender
	student.GuardianEmail = GuardianEmail
	student.GuardianNumber = GuardianNumber

	query.DB.Save(&student)

	return &student, nil
}
