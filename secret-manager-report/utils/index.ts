import fs from 'fs';
import path from 'path';


export async function readAllJSONFilesFromDirectory<T> (pathDir: string): Promise<T[]> {
  const filesNames = fs.readdirSync(pathDir);
  const files =  filesNames.map(fileName => {
    const file = fs.readFileSync(path.join(pathDir, fileName), "utf8");
    return JSON.parse(file)
  });
  return files as T[]
}

export async function saveJsonFile (filename: string, file: any){
  fs.writeFileSync(filename, JSON.stringify(file, null, 2));
}
