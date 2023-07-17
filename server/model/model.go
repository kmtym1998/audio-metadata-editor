package model

// model =========================================
type DirEntry struct {
	Name     string `json:"name"`
	FullPath string `json:"fullPath"`
	IsDir    bool   `json:"isDir"`
}

// request params ================================
type GetDirEntriesParam struct {
	Dir string `json:"dir"`
}
