export type DirEntry = {
  name: string;
  fullPath: string;
  isDir: boolean;
};

export type GetItemResult = {
  audio: AudioMetadata;
  fullPath: string;
  isDir: boolean;
  modTime: string;
  mode: string;
  name: string;
  size: number;
};

export type AudioMetadata = {
  album: string;
  artist: string;
  albumArtist: string;
  comment: string;
  composer: string;
  disc: number[];
  fileType: string;
  format: string;
  genre: string;
  lyrics: string;
  picture: Picture;
  title: string;
  track: number[];
  year: number;
};

export type Picture = {
  base64Img: string;
  description: string;
  ext: string;
  mimeType: string;
  type: string;
};
