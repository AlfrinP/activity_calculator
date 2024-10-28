package util

import (
	"fmt"
	"strings"
	"time"

	"github.com/AlfrinP/point_calculator/config"
	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

var Levels = []string{
	"Level I - College Events",
	"Level II - Zonal Events",
	"Level III - State/ University Events",
	"Level IV - National Events",
	"Level V - International Events",
}

var Positions = []string{
	"Core coordinator",
	"Sub coordinator",
	"Volunteer",
}

type TokenData struct {
	ID   uint
	Role string
}

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

func Min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func GetContentType(filename string) string {
	res := strings.Split(filename, ".")
	fmt.Println(res)
	return res[len(res)-1]
}
