import * as fs from "fs";
import { FileContent, FileUpdate } from "../core/AuditManager";

export class Persister {
  readDirectory(directoryName: string): FileContent[] {
    return fs.readdirSync(directoryName).map((fileName) => {
      const lines = fs
        .readFileSync(`${directoryName}/${fileName}`)
        .toString()
        .split("\r\n");
      return new FileContent(fileName, lines);
    });
  }

  applyUpdate(directoryName: string, update: FileUpdate) {
    fs.appendFileSync(`${directoryName}/${update.fileName}`, update.newContent);
  }
}
