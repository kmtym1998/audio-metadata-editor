type Config = {
  rootDir: string;
  excludeFiles: string[];
};

const toStrArray = (v?: string): string[] | undefined => {
  if (!v) return undefined;

  return v.split(',');
};

const defaultRootDir = '/Users/kmtym1998/Music/Music/Media.localized/Music';
const defaultExcludeFiles = ['.DS_Store'];

export const config: Config = {
  rootDir: process.env.ROOT_DIR || defaultRootDir,
  excludeFiles: toStrArray(process.env.IGNORE_FILES) || defaultExcludeFiles,
};

export const isExcludedFileOrDir = (filepath: string): boolean => {
  return config.excludeFiles.some((file) => filepath.endsWith(file));
};
