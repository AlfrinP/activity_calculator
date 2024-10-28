package middleware

import (
	"fmt"
	"strings"

	"github.com/AlfrinP/point_calculator/config"
	"github.com/AlfrinP/point_calculator/repository"
	"github.com/AlfrinP/point_calculator/storage"
	"github.com/AlfrinP/point_calculator/types"
	"github.com/AlfrinP/point_calculator/util"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
)

func DeserializeUser(c *fiber.Ctx) error {
	var tokenString string
	authorization := c.Get("Authorization")
	config, _ := config.LoadConfig(".")

	if strings.HasPrefix(authorization, "Bearer ") {
		tokenString = strings.TrimPrefix(authorization, "Bearer ")
	} else if c.Cookies("token") != "" {
		tokenString = c.Cookies("token")
	}

	if tokenString == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": true,
			"msg":   "You are not logged in,empty token",
		})
	}

	c.Locals("token", tokenString)
	tokenByte, err := jwt.Parse(tokenString, func(jwtToken *jwt.Token) (interface{}, error) {
		if _, ok := jwtToken.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %s", jwtToken.Header["alg"])
		}
		return []byte(config.JwtSecret), nil
	})

	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": true,
			"msg":   "invalid token parse",
		})
	}

	claims, ok := tokenByte.Claims.(jwt.MapClaims)
	if !ok || !tokenByte.Valid {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": true,
			"msg":   "invalid token claim",
		})
	}

	role := claims["role"].(string)
	id, ok := claims["user_id"].(float64)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": true,
			"msg":   "invalid token claim",
		})
	}

	if role == types.Student {
		studentRepo := repository.NewStudentRepository(storage.GetDB())
		student, err := studentRepo.GetByID(uint(id))
		if err != nil {
			return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
				"error": true,
				"msg":   "the user belonging to this token no logger exists",
			})
		}
		c.Locals("user", &util.TokenData{
			ID:   student.ID,
			Role: types.Student,
		})

	} else if role == types.Faculty {

		facultyRepo := repository.NewFacultyRepository(storage.GetDB())
		faculty, err := facultyRepo.GetByID(uint(id))

		if err != nil {
			return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
				"error": true,
				"msg":   "the user belonging to this token no logger exists",
			})
		}

		c.Locals("user", &util.TokenData{
			ID:   faculty.ID,
			Role: types.Faculty,
		})
	} else {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": true,
			"msg":   "invalid token claim",
		})
	}

	return c.Next()
}
