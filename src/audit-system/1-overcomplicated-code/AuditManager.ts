/* eslint-disable @typescript-eslint/no-unused-vars */
import * as fs from "fs";

export class AuditManager {
  constructor(
    private maxEntriesPerFile: number,
    private directoryName: string
  ) {}

  public addRecord(visitorName: string, timeOfVisit: Date) {
    const filePaths: string[] = []; // get file paths from directoryName
    const sortedDirectories: string[] = this.sortByIndex(filePaths);

    const newRecord = `${visitorName};${timeOfVisit.toISOString()}`;

    if (sortedDirectories.length == 0) {
      fs.writeFileSync(`${this.directoryName}/audit_1.txt`, newRecord);
      return;
    }

    const currentFileIndex = sortedDirectories.length;
    const currentFilePath = sortedDirectories[sortedDirectories.length - 1];
    const lines = []; // read file lines;

    if (lines.length < this.maxEntriesPerFile) {
      lines.push(newRecord);
      const newContent = lines.join("\r\n");
      // write newContent in currentFilePath
    } else {
      const newIndex = currentFileIndex + 1;
      const newName = `audit_${newIndex}.txt`;
      // create a new file in this.directoryName / newName,
      // and write newRecord in it
    }
  }

  private sortByIndex(files: string[]): string[] {
    return files;
    /*
      .map(path => (index: getFileIndex(path), path))
      .OrderBy(x => x.index)
      .map(path => path.path);
      */
  }

  private getFileIndex(filePath: string) {
    // File name example: audit_1.txt
    const fileName = ""; // get file name from path
    return parseInt(fileName.split("_")[1]);
  }
}
