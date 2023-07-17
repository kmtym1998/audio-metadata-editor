package main

import (
	"encoding/base64"
	"fmt"
	"fs-server/model"
	"fs-server/util"
	"net/http"
	"os"
	"strings"

	"github.com/dhowden/tag"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/go-chi/httplog"
	"github.com/samber/lo"
)

func main() {
	router := chi.NewRouter()
	l := httplog.NewLogger("fs-server", httplog.Options{
		LogLevel: "INFO",
	})
	router.Use(
		httplog.RequestLogger(l),
		cors.Handler(cors.Options{
			AllowedOrigins: []string{"*"},
			AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		}),
	)

	router.Route("/v1", func(v1Router chi.Router) {
		// Handler
		v1Router.Get("/dirEntries", func(w http.ResponseWriter, r *http.Request) {
			resp, err := handleGetDirEntries(w, r)
			if err != nil {
				http.Error(w, err.Error(), err.Code)
				return
			}

			util.WriteJSON(w, http.StatusOK, resp)
		})

		v1Router.Get("/files/{fullPath}", func(w http.ResponseWriter, r *http.Request) {
			resp, err := handleGetItem(w, r)
			if err != nil {
				http.Error(w, err.Error(), err.Code)
				return
			}

			util.WriteJSON(w, http.StatusOK, resp)
		})
	})

	l.Info().Msg("server is running...")
	http.ListenAndServe(":80", router)
}

func handleGetDirEntries(w http.ResponseWriter, r *http.Request) ([]model.DirEntry, *util.AppError) {
	dir := r.URL.Query().Get("dir")
	if !strings.HasPrefix(dir, "/") {
		return nil, &util.AppError{
			Code:    http.StatusBadRequest,
			Message: fmt.Sprintf("'%s' is invalid dir", dir),
		}
	}

	dirEntries, err := os.ReadDir(dir)
	if err != nil {
		if os.IsNotExist(err) {
			return nil, &util.AppError{
				Code:    http.StatusNotFound,
				Message: fmt.Sprintf("'%s' is not found", dir),
			}
		}

		return nil, util.NewInternalServerError(err)
	}

	return lo.Map(dirEntries, func(dirEntry os.DirEntry, _ int) model.DirEntry {
		return model.DirEntry{
			Name:     dirEntry.Name(),
			FullPath: dir + "/" + dirEntry.Name(),
			IsDir:    dirEntry.IsDir(),
		}
	}), nil
}

func handleGetItem(w http.ResponseWriter, r *http.Request) (*model.FileDetail, *util.AppError) {
	encodedPath := chi.URLParam(r, "fullPath")
	decodedPath, err := base64.StdEncoding.DecodeString(encodedPath)
	if err != nil {
		return nil, &util.AppError{
			Code:    http.StatusBadRequest,
			Message: fmt.Sprintf("'%s' is invalid fullPath", encodedPath),
		}
	}

	fullPath := string(decodedPath)

	f, err := os.Open(fullPath)
	if err != nil {
		if os.IsNotExist(err) {
			return nil, &util.AppError{
				Code:    http.StatusNotFound,
				Message: fmt.Sprintf("'%s' is not found", fullPath),
			}
		}
	}

	var audioMetadata *model.AudioMetadata
	tag, err := tag.ReadFrom(f)
	if err == nil {
		audioMetadata = &model.AudioMetadata{
			Format:      tag.Format(),
			FileType:    tag.FileType(),
			Title:       tag.Title(),
			Album:       tag.Album(),
			Artist:      tag.Artist(),
			AlbumArtist: tag.AlbumArtist(),
			Composer:    tag.Composer(),
			Year:        tag.Year(),
			Genre:       tag.Genre(),
			Track:       func() []int { track, total := tag.Track(); return []int{track, total} }(),
			Disc:        func() []int { disc, total := tag.Disc(); return []int{disc, total} }(),
			Picture: lo.If(tag.Picture() != nil, func() *model.Picture {
				return &model.Picture{
					Ext:         tag.Picture().Ext,
					MIMEType:    tag.Picture().MIMEType,
					Type:        tag.Picture().Type,
					Description: tag.Picture().Description,
					Raw:         base64.StdEncoding.EncodeToString(tag.Picture().Data),
				}
			}).Else(nil)(),
			Lyrics:  tag.Lyrics(),
			Comment: tag.Comment(),
		}
	}

	fileInfo, err := f.Stat()
	if err != nil {
		return nil, util.NewInternalServerError(err)
	}

	return &model.FileDetail{
		Name:          fileInfo.Name(),
		FullPath:      fullPath,
		IsDir:         fileInfo.IsDir(),
		Size:          fileInfo.Size(),
		Mode:          fileInfo.Mode().String(),
		ModTime:       fileInfo.ModTime().String(),
		AudioMetadata: audioMetadata,
	}, nil
}
