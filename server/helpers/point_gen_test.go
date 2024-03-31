package helpers

import (
	"fmt"
	"testing"

	"github.com/AlfrinP/point_calculator/models"
)

func TestGetPoint(t *testing.T) {
	testCases := []struct {
		certificate models.CertificateCreate
		expected    int
	}{
		// Test case 1: Valid activity with position specified
		{
			certificate: models.CertificateCreate{
				Name:     "NCC",
				Category: "National Initiatives Participation",
				Level:    0,
			},
			expected: 60,
		},
		// Test case 2: Valid activity with level specified
		{
			certificate: models.CertificateCreate{
				Name:     "Games - Second",
				Category: "Sports & Games Participation",
				Level:    3,
			},
			expected: 16,
		},
		// Test case 3: Valid activity with both position and level specified
		{
			certificate: models.CertificateCreate{
				Name:     "Tech Fest",
				Category: "Professional Self Initiatives",
				Level:    2,
			},
			expected: 30,
		},
		// Test case 4: Invalid activity (not in the list)
		{
			certificate: models.CertificateCreate{
				Name:     "InvalidActivity",
				Category: "InvalidCategory",
			},
			expected: 0,
		},
		// Test case 5: Invalid position (not in Positions slice)
		{
			certificate: models.CertificateCreate{
				Name:     "Internship",
				Category: "Professional Self Initiatives",
				Position: "InvalidPosition",
			},
			expected: 20,
		},
		// Test case 6: Invalid level (out of bounds)
		{
			certificate: models.CertificateCreate{
				Name:     "Music",
				Category: "Sports & Games Participation",
				Level:    10,
			},
			expected: 0,
		},
		// Test case 7: Valid activity with no position or level specified
		{
			certificate: models.CertificateCreate{
				Name:     "StartUp",
				Category: "Entrepreneurship and Innovation",
			},
			expected: 60,
		},
		// Test case 8: Valid activity with position but no level specified
		{
			certificate: models.CertificateCreate{
				Name:     "Paper presentation @ IITs",
				Category: "Professional Self Initiatives",
			},
			expected: 20,
		},
		// Test case 9: Valid activity with level but no position specified
		{
			certificate: models.CertificateCreate{
				Name:     "Literary arts - Third",
				Category: "Sports & Games Participation",
				Level:    2,
			},
			expected: 5,
		},
		// Test case 10: Valid activity with unknown position and level
		{
			certificate: models.CertificateCreate{
				Name:     "Mooc Courses",
				Category: "Professional Self Initiatives",
				Position: "UnknownPosition",
				Level:    3,
			},
			expected: 50,
		},
		// Test case 11: Valid activity with the highest level
		{
			certificate: models.CertificateCreate{
				Name:     "Paper presentation @ IITs",
				Category: "Professional Self Initiatives",
				Level:    4,
			},
			expected: 20,
		},
		// Test case 12: Valid activity with the lowest level
		{
			certificate: models.CertificateCreate{
				Name:     "Literary arts - First",
				Category: "Sports & Games Participation",
				Level:    0,
			},
			expected: 10,
		},
	}

	// Run test cases
	for i, testCase := range testCases {
		t.Run(fmt.Sprintf("Test case %d", i+1), func(t *testing.T) {
			result := GetPoint(&testCase.certificate)
			fmt.Println(result)
			if result != testCase.expected {
				t.Errorf("Expected: %d, Got: %d", testCase.expected, result)
			}
		})
	}
}
