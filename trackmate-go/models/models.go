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
	Fields    []AssessmentField `json:"fields,omitempty"`
	StudentID uint              `json:"-"`
	Student   Student           `json:"-"`
}

type Student struct {
	ID             uint         `json:"id" gorm:"primaryKey"`
	FirstName      string       `json:"firstName"`
	LastName       string       `json:"lastName"`
	Dob            time.Time    `json:"dob"`
	Gender         string       `json:"gender"`
	GuardianEmail  string       `json:"guardianEmail"`
	GuardianNumber string       `json:"guardianNumber"`
	Assessments    []Assessment `json:"assessments,omitempty"`
	ClassID        uint         `json:"-"`
	Class          Class        `json:"-"`
}

type Class struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	ClassName string    `json:"className"`
	Students  []Student `json:"students,omitempty"`
	TeacherID uint      `json:"-"`
	Teacher   Teacher   `json:"-"`
}

type Teacher struct {
	ID        uint    `json:"id" gorm:"primaryKey"`
	FirstName string  `json:"firstName"`
	LastName  string  `json:"lastName"`
	Email     string  `json:"email" gorm:"unique"`
	Classes   []Class `json:"classes,omitempty"`
}
