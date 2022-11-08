package models

import (
	"time"

	"gorm.io/datatypes"
)

type AssessmentField struct {
	ID           uint       `json:"id" gorm:"primaryKey"`
	Name         string     `json:"name"`
	Value        uint       `json:"value"`
	Comment      string     `json:"comment"`
	AssessmentID uint       `json:"-"`
	Assessment   Assessment `json:"-"`
}

// using CASCADE, we delete orphans of a table that has been deleted
type Assessment struct {
	ID        uint              `json:"id" gorm:"primaryKey"`
	Date      time.Time         `json:"date"`
	Fields    []AssessmentField `json:"fields,omitempty" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
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
	Assessments    []Assessment `json:"assessments,omitempty" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
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
	ID           uint           `json:"id" gorm:"primaryKey"`
	FirstName    string         `json:"firstName"`
	LastName     string         `json:"lastName"`
	FieldOptions datatypes.JSON `json:"fieldOptions"`
	Email        string         `json:"email" gorm:"unique"`
	Classes      []Class        `json:"classes,omitempty"`
}
