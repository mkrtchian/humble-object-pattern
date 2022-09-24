import * as fs from "fs";
import path from "path";

export class AuditManager {
  constructor(
    private maxEntriesPerFile: number,
    private directoryName: string
  ) {}

  public addRecord(visitorName: string, timeOfVisit: Date) {
    const fileNames = fs.readdirSync(this.directoryName);
    const sortedFileNames: string[] = this.sortByIndex(fileNames);

    const newRecord = `${visitorName};${timeOfVisit.toISOString()}`;

    if (sortedFileNames.length == 0) {
      fs.writeFileSync(`${this.directoryName}/audit_1.txt`, newRecord);
      return;
    }

    const currentFileIndex = sortedFileNames.length;
    const currentFileName = sortedFileNames[sortedFileNames.length - 1];
    const currentFilePath = `${this.directoryName}/${currentFileName}`;
    const lines = fs.readFileSync(currentFilePath).toString().split("\r\n");

    if (lines.length < this.maxEntriesPerFile) {
      lines.push(newRecord);
      const newContent = lines.join("\r\n");
      fs.writeFileSync(currentFilePath, newContent);
    } else {
      const newFileIndex = currentFileIndex + 1;
      const newFileName = `audit_${newFileIndex}.txt`;
      fs.writeFileSync(`${this.directoryName}/${newFileName}`, newRecord);
    }
  }

  private sortByIndex(files: string[]): string[] {
    const getFileIndex = (filePath: string) => {
      const fileName = path.basename(filePath);
      return fileName.split("_")[1];
    };
    const compareFiles = (file1: string, file2: string) => {
      const index1 = getFileIndex(file1);
      const index2 = getFileIndex(file2);
      if (index1 > index2) return 1;
      if (index1 < index2) return -1;
      return 0;
    };
    return [...files].sort(compareFiles);
  }
}
