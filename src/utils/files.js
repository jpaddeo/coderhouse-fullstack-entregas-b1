import { access, writeFile } from 'fs/promises';

export const createIfNotExistsFile = async (path) => {
  try {
    await access(path);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await writeFile(path, JSON.stringify([]));
    }
    console.error(`Error accessing file at ${path}:`, error);
  }
};
