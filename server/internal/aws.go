package internal

import (
	"context"
	"fmt"
	"io"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/feature/s3/manager"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
)

func Uploader(file io.Reader, key string) (string, error) {

	cfg, err := config.LoadDefaultConfig(context.Background(), func(lo *config.LoadOptions) error {
		lo.Region = "ap-south-1"
		return nil
	})
	if err != nil {
		return "", err
	}

	client := s3.NewFromConfig(cfg)
	if err != nil {
		return "", err
	}
	uploader := manager.NewUploader(client)

	result, err := uploader.Upload(context.Background(), &s3.PutObjectInput{
		Bucket:             aws.String("activiypoint"),
		Key:                aws.String(key),
		Body:               file,
		ACL:                "public-read",
		ContentDisposition: aws.String("inline"),
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
