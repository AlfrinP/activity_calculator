package types

import "github.com/go-playground/validator"

const (
	Student string = "student"
	Faculty string = "faculty"
)

type UserSignIn struct {
	Email    string `validate:"required" json:"email"`
	Password string `validate:"required" json:"password"`
}

func (us *UserSignIn) Validate() error {
	validate := validator.New()
	if err := validate.Struct(us); err != nil {
		return err
	}
	return nil
}
