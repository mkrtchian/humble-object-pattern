import { AuditManager, FileContent, FileUpdate } from "../core/AuditManager";
import { Persister } from "./Persister";

export class ApplicationService {
  private auditManager: AuditManager;
  private persister: Persister;

  constructor(public directoryName: string, maxEntriesPerFile: number) {
    this.auditManager = new AuditManager(maxEntriesPerFile);
    this.persister = new Persister();
  }

  addRecord(visitorName: string, timeOfVisit: Date) {
    const files: FileContent[] = this.persister.readDirectory(
      this.directoryName
    );
    const update: FileUpdate = this.auditManager.addRecord(
      files,
      visitorName,
      timeOfVisit
    );
    this.persister.applyUpdate(this.directoryName, update);
  }
}
