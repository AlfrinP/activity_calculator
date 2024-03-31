package helpers

import (
	"fmt"

	"github.com/AlfrinP/point_calculator/repository"
	"github.com/AlfrinP/point_calculator/storage"
	"github.com/xuri/excelize/v2"
)

func Excelize(facultyID uint, year string) (string, error) {
	f := excelize.NewFile()
	defer f.Close()

	// // Assuming you have a repository method to fetch faculty-specific data
	studentRepo := repository.NewStudentRepository(storage.GetDB())
	yearlyPoint, err := studentRepo.FetchStudentTotalPoints(facultyID, year)
	if err != nil {
		return "", err
	}

	// Create a new sheet.
	index, err := f.NewSheet("Sheet1")
	if err != nil {
		fmt.Println(err)
		return "", err
	}

	// Set headers
	headers := []string{"Name", "Reg No", "Total Points"}
	for col, header := range headers {
		cell := fmt.Sprintf("%c1", 'A'+col)
		f.SetCellValue("Sheet1", cell, header)
	}

	// Populate data
	for row, data := range yearlyPoint {
		cellA := fmt.Sprintf("A%d", row+2)
		cellB := fmt.Sprintf("B%d", row+2)
		cellC := fmt.Sprintf("C%d", row+2)

		f.SetCellValue("Sheet1", cellA, data["name"])
		f.SetCellValue("Sheet1", cellB, data["reg_no"])
		f.SetCellValue("Sheet1", cellC, data["total_points"])
	}

	// Set active sheet of the workbook.
	f.SetActiveSheet(index)

	fileName := fmt.Sprintf("Faculty_%d_Year_%s.xlsx", facultyID, year)

	buf, err := f.WriteToBuffer()
	if err != nil {
		return "", err
	}
	res, err := Uploader(buf, fileName, "xlsx")
	if err != nil {
		return "", nil
	}

	return res, nil
}
