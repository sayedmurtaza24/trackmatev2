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

// func (query TeacherQueryI) CreateTeacher(FirstName string, LastName string, Email string) models.Teacher {

// 	teacher := models.Teacher{FirstName: FirstName, LastName: LastName, Email: Email}

// 	query.DB.Create(&teacher)

// 	return teacher
// }
