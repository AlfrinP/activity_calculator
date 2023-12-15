package util

import (
	"time"

	"github.com/AlfrinP/point_calculator/config"
	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

type Data struct {
	Role string
	ID   uint
}

var data *Data

func GenerateToken(id uint, role string, config config.Config) (string, error) {
	tokenByte := jwt.New(jwt.SigningMethodHS256)
	now := time.Now().UTC()
	claims := tokenByte.Claims.(jwt.MapClaims)
	claims["user_id"] = id
	claims["role"] = role
	claims["exp"] = now.Add(config.JwtExpiresIn).Unix()
	claims["iat"] = now.Unix()
	claims["nbf"] = now.Unix()

	return tokenByte.SignedString([]byte(config.JwtSecret))

}

func VerifyPassword(hashedPassword string, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}

func SetRoleAndID(role string, id uint) *Data {
	data = &Data{
		Role: role,
		ID:   id,
	}
	return data
}

func GetRoleAndID() (string, uint) {
	return data.Role, data.ID
}
