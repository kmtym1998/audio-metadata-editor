package main

import (
	"encoding/json"
	"fs-server/model"
	"io"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/httplog"
	"github.com/samber/lo"
)

func main() {
	router := chi.NewRouter()
	l := httplog.NewLogger("fs-server", httplog.Options{
		LogLevel: "INFO",
	})
	router.Use(httplog.RequestLogger(l))

	router.Route("/v1", func(v1Router chi.Router) {
		// Handler
		v1Router.Get("/dirEntries", func(w http.ResponseWriter, r *http.Request) {
			resp, err := handleGetDirEntries(w, r)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			writeJSON(w, http.StatusOK, resp)
		})
	})

	l.Info().Msg("server is running...")
	http.ListenAndServe(":80", router)
}

func writeJSON(w http.ResponseWriter, code int, resp any) {
	b, err := json.Marshal(resp)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(b)
}

func handleGetDirEntries(w http.ResponseWriter, r *http.Request) ([]model.DirEntry, error) {
	var param model.GetDirEntriesParam
	b, err := io.ReadAll(r.Body)
	if err != nil {
		return nil, err
	}

	if err = json.Unmarshal(b, &param); err != nil {
		return nil, err
	}

	dirEntries, err := os.ReadDir(param.Dir)
	if err != nil {
		return nil, err
	}

	return lo.Map(dirEntries, func(dirEntry os.DirEntry, _ int) model.DirEntry {
		return model.DirEntry{
			Name:     dirEntry.Name(),
			FullPath: param.Dir + "/" + dirEntry.Name(),
			IsDir:    dirEntry.IsDir(),
		}
	}), nil
}
