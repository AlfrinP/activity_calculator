package helpers

import (
	"github.com/AlfrinP/point_calculator/models"
	"github.com/AlfrinP/point_calculator/util"
)

type Activity struct {
	Name     string
	Category string
	Point    []int
}

func GetPostionIndex(position string) int {
	for k, v := range util.Positions {
		if position == v {
			return k
		}
	}
	return -1
}

// levels - [0 - 4]
// Postions - [0 - 2]
var data = []Activity{
	{
		Name:     "NCC",
		Category: "National Initiatives Participation",
		Point:    []int{60},
	},
	{
		Name:     "NSS",
		Category: "National Initiatives Participation",
		Point:    []int{60},
	},
	{
		Name:     "Sports",
		Category: "Sports & Games Participation",
		Point:    []int{8, 15, 25, 40, 60},
	},
	{
		Name:     "Games - First",
		Category: "Sports & Games Participation",
		Point:    []int{10, 10, 10, 20, 20},
	},
	{
		Name:     "Games - Second",
		Category: "Sports & Games Participation",
		Point:    []int{8, 8, 8, 16, 16},
	},
	{
		Name:     "Games - Third",
		Category: "Sports & Games Participation",
		Point:    []int{5, 5, 5, 12, 12},
	},
	{
		Name:     "Music",
		Category: "Sports & Games Participation",
		Point:    []int{8, 12, 20, 40, 60},
	},
	{
		Name:     "Performing Arts",
		Category: "Sports & Games Participation",
		Point:    []int{8, 12, 20, 40, 60},
	},
	{
		Name:     "Literary arts - First",
		Category: "Sports & Games Participation",
		Point:    []int{10, 10, 10, 20, 20},
	},
	{
		Name:     "Literary arts - Second",
		Category: "Sports & Games Participation",
		Point:    []int{8, 8, 8, 16, 16},
	},
	{
		Name:     "Literary arts - Third",
		Category: "Sports & Games Participation",
		Point:    []int{5, 5, 5, 12, 12},
	},
	{
		Name:     "Tech Fest",
		Category: "Professional Self Initiatives",
		Point:    []int{10, 20, 30, 40, 50},
	},
	{
		Name:     "Mooc Courses",
		Category: "Professional Self Initiatives",
		Point:    []int{50},
	},
	{
		Name:     "Competitions conducted by professional bodies",
		Category: "Professional Self Initiatives",
		Point:    []int{10, 15, 20, 30, 40},
	},
	{
		Name:     "Conference @ IITs,NITS",
		Category: "Professional Self Initiatives",
		Point:    []int{15},
	},
	{
		Name:     "Conference @ KTU",
		Category: "Professional Self Initiatives",
		Point:    []int{6},
	},
	{
		Name:     "Paper presentation @ IITs",
		Category: "Professional Self Initiatives",
		Point:    []int{20},
	},
	{
		Name:     "Paper presentation @ KTU",
		Category: "Professional Self Initiatives",
		Point:    []int{8},
	},
	{
		Name:     "Poster presentation @ IITs,NITs",
		Category: "Professional Self Initiatives",
		Point:    []int{10},
	},
	{
		Name:     "Poster presentation @ KTU",
		Category: "Professional Self Initiatives",
		Point:    []int{4},
	},
	{
		Name:     "Internship",
		Category: "Professional Self Initiatives",
		Point:    []int{20},
	},
	{
		Name:     "IV",
		Category: "Professional Self Initiatives",
		Point:    []int{5},
	},
	{
		Name:     "IELTS",
		Category: "Professional Self Initiatives",
		Point:    []int{50},
	},
	{
		Name:     "StartUp",
		Category: "Entrepreneurship and Innovation",
		Point:    []int{60},
	},
	{
		Name:     "Patent Filed",
		Category: "Entrepreneurship and Innovation",
		Point:    []int{30},
	},
	{
		Name:     "Patent Published",
		Category: "Entrepreneurship and Innovation",
		Point:    []int{35},
	},
	{
		Name:     "Patent Approved",
		Category: "Entrepreneurship and Innovation",
		Point:    []int{50},
	},
	{
		Name:     "Patent Liscensed",
		Category: "Entrepreneurship and Innovation",
		Point:    []int{80},
	},
	{
		Name:     "Prototype",
		Category: "Entrepreneurship and Innovation",
		Point:    []int{60},
	},
	{
		Name:     "Approval of products",
		Category: "Entrepreneurship and Innovation",
		Point:    []int{60},
	},
	{
		Name:     "Innovation Tech",
		Category: "Entrepreneurship and Innovation",
		Point:    []int{60},
	},
	{
		Name:     "Got venture capital",
		Category: "Entrepreneurship and Innovation",
		Point:    []int{80},
	},
	{
		Name:     "Startup Employement",
		Category: "Entrepreneurship and Innovation",
		Point:    []int{80},
	},
	{
		Name:     "Social Innovation",
		Category: "Entrepreneurship and Innovation",
		Point:    []int{50},
	},
}

var dataWithPosition = []Activity{
	{
		Name:     "Student Professional Societies",
		Category: "Leadership & Management",
		Point:    []int{15, 10, 5},
	},
	{
		Name:     "College Association Chapter",
		Category: "Leadership & Management",
		Point:    []int{15, 10, 5},
	},
	{
		Name:     "Festival & Technical Events",
		Category: "Leadership & Management",
		Point:    []int{15, 10, 5},
	},
	{
		Name:     "Hobby Clubs",
		Category: "Leadership & Management",
		Point:    []int{15, 10, 5},
	},
	{
		Name:     "Elected student representatives",
		Category: "Leadership & Management",
		Point:    []int{30, 25, 15},
	},
}

func GetPoint(c *models.CertificateCreate) int {
	if int(c.Level) > len(util.Levels) {
		return 0
	}

	if c.Position == "" || GetPostionIndex(c.Position) == -1 {
		for _, v := range data {
			if v.Category == c.Category && v.Name == c.Name {
				return v.Point[util.Min(int(c.Level), len(v.Point)-1)]
			}
		}
	} else {
		for _, v := range dataWithPosition {
			if v.Category == c.Category && v.Name == c.Name {
				return v.Point[GetPostionIndex(c.Position)]
			}
		}
	}
	return 0
}
