package main

import (
	"fmt"
	"fs-server/model"
	"fs-server/util"
	"net/http"
	"os"
	"strings"

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
