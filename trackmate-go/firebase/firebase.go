package firebase

import (
	"context"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"

	"google.golang.org/api/option"
)

func InitAuth() *auth.Client {
	opt := option.WithCredentialsFile("firebase-config.json")

	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		panic(err)
	}

	auth, err := app.Auth(context.Background())

	if err != nil {
		panic(err)
	}

	return auth
}
