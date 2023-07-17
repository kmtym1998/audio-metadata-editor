package util

import "net/http"

type AppError struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

func (e AppError) Error() string {
	return e.Message
}

func NewInternalServerError(err error) *AppError {
	return &AppError{
		Code:    http.StatusInternalServerError,
		Message: err.Error(),
	}
}
