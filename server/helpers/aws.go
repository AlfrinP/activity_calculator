package helpers

import (
	"fmt"
	"io"

	con "github.com/AlfrinP/point_calculator/config"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
)

func Uploader(file io.Reader, key string, fileType string) (string, error) {

	contentType := aws.String("binary/octet-stream")

	switch fileType {
	case "jpg", "png", "jpeg":
		contentType = aws.String("image/jpg")
	case "pdf":
		contentType = aws.String("application/pdf")
	}

	con, _ := con.LoadConfig(".")

	sess, err := session.NewSession(&aws.Config{
		Credentials: credentials.NewStaticCredentials(con.AWSAccessKeyID, con.AWSSecretAccessKey, ""),
		Region:      aws.String(con.AWSRegion)},
	)
	if err != nil {
		return "", err
	}
	uploader := s3manager.NewUploader(sess)

	result, err := uploader.Upload(&s3manager.UploadInput{
		Bucket:             aws.String("activiypoint"),
		Key:                aws.String(key),
		Body:               file,
		ACL:                aws.String("public-read"),
		ContentDisposition: aws.String("inline"),
		ContentType:        contentType,
	})
	if err != nil {
		return "", err
	}

	fmt.Printf("%v", result.Location)
	return result.Location, nil
}

func Downloader() {
	sess, _ := session.NewSession(&aws.Config{
		Region: aws.String("ap-south-1"),
	})

	_ = s3manager.NewDownloader(sess)

}
