package model

import "github.com/dhowden/tag"

// model =========================================
type DirEntry struct {
	Name     string `json:"name"`
	FullPath string `json:"fullPath"`
	IsDir    bool   `json:"isDir"`
}

type FileDetail struct {
	AudioMetadata *AudioMetadata `json:"audioMetadata,omitempty"`
	Name          string         `json:"name"`
	FullPath      string         `json:"fullPath"`
	IsDir         bool           `json:"isDir"`
	Size          int64          `json:"size"`
	Mode          string         `json:"mode"`
	ModTime       string         `json:"modTime"`
}

type AudioMetadata struct {
	Format      tag.Format   `json:"format"`
	FileType    tag.FileType `json:"fileType"`
	Title       string       `json:"title"`
	Album       string       `json:"album"`
	Artist      string       `json:"artist"`
	AlbumArtist string       `json:"albumArtist"`
	Composer    string       `json:"composer"`
	Year        int          `json:"year"`
	Genre       string       `json:"genre"`
	Track       []int        `json:"track"`
	Disc        []int        `json:"disc"`
	Picture     *Picture     `json:"picture"`
	Lyrics      string       `json:"lyrics"`
	Comment     string       `json:"comment"`
}

type Picture struct {
	Ext         string `json:"ext"`
	MIMEType    string `json:"mimeType"`
	Type        string `json:"type"`
	Description string `json:"description"`
	Raw         string `json:"raw"`
}
