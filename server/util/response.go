package util

import (
	"encoding/json"
	"net/http"
)

func WriteJSON(w http.ResponseWriter, code int, resp any) {
	b, err := json.Marshal(resp)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(b)
}
