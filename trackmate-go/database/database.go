package database

import (
	"log"
	"os"

	"github.com/sayedmurtaza24/trackmatev2/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func GetDB(dbUrl string) *gorm.DB {
	db, err := gorm.Open(postgres.Open(dbUrl), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect \n", err.Error())
		os.Exit(2)
	}

	log.Println("Connected to database successfully")
	db.Logger = logger.Default.LogMode(logger.Info)
	log.Println("Running migrations")

	// db.Migrator().DropTable(&models.Class{})
	// db.Migrator().DropTable(&models.Teacher{})

	db.AutoMigrate(
		&models.Student{},
		&models.Teacher{},
		&models.Class{},
		&models.Assessment{},
		&models.AssessmentField{},
	)

	return db
}
