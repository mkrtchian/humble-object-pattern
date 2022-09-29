export class AuditManager {
  constructor(private maxEntriesPerFile: number) {}

  public addRecord(
    files: FileContent[],
    visitorName: string,
    timeOfVisit: Date
  ) {
    const newRecord = `${visitorName};${timeOfVisit.toISOString()}`;

    if (files.length == 0) {
      return new FileUpdate("audit_1.txt", newRecord);
    }

    const sortedFiles: FileContent[] = this.sortByIndex(files);
    const currentFileIndex = sortedFiles.length;
    const currentFile = sortedFiles[sortedFiles.length - 1];
    if (currentFile.lines.length < this.maxEntriesPerFile) {
      return new FileUpdate(`audit_${currentFileIndex}.txt`, newRecord);
    } else {
      const newFileIndex = currentFileIndex + 1;
      return new FileUpdate(`audit_${newFileIndex}.txt`, newRecord);
    }
  }

  private sortByIndex(files: FileContent[]): FileContent[] {
    const getFileIndex = (file: FileContent) => {
      return file.fileName.split("_")[1];
    };
    const compareFiles = (file1: FileContent, file2: FileContent) => {
      const index1 = getFileIndex(file1);
      const index2 = getFileIndex(file2);
      if (index1 > index2) return 1;
      if (index1 < index2) return -1;
      return 0;
    };
    return [...files].sort(compareFiles);
  }
}

export class FileContent {
  constructor(public fileName: string, public lines: string[]) {}
}

export class FileUpdate {
  constructor(public fileName: string, public newContent: string) {}
}
