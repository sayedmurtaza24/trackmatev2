package models

import "time"

type AssessmentField struct {
	ID           uint       `json:"id" gorm:"primaryKey"`
	Value        uint       `json:"value"`
	Comment      string     `json:"comment"`
	AssessmentID uint       `json:"-"`
	Assessment   Assessment `json:"-"`
}

type Assessment struct {
	ID        uint              `json:"id" gorm:"primaryKey"`
	Date      time.Time         `json:"date"`
	Fields    []AssessmentField `json:"fields"`
	StudentID uint              `json:"-"`
	Student   Student           `json:"-"`
}

type Student struct {
	ID          uint         `json:"id" gorm:"primaryKey"`
	FirstName   string       `json:"first_name"`
	LastName    string       `json:"last_name"`
	Dob         time.Time    `json:"dob"`
	Gender      string       `json:"gender"`
	Assessments []Assessment `json:"assessments"`
	ClassID     uint         `json:"-"`
	Class       Class        `json:"-"`
}

type Class struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	ClassName string    `json:"class_name"`
	Students  []Student `json:"students"`
	TeacherID int       `json:"-"`
	Teacher   Teacher   `json:"-"`
}

type Teacher struct {
	ID        uint    `json:"id" gorm:"primaryKey"`
	FirstName string  `json:"first_name"`
	LastName  string  `json:"last_name"`
	Classes   []Class `json:"classes"`
}
