import { formatDate } from "@angular/common";
export class Resumes {
  id: number;
  img: string;
  name: string;
  title: string;
  status: string;
  download: string;
  role: string;
  department: string;
  jobType: string;
  constructor(resumes) {
    {
      this.id = resumes.id || this.getRandomID();
      this.img = resumes.avatar || "assets/images/user/user1.jpg";
      this.name = resumes.name || "";
      this.title = resumes.title || "";
      this.status = resumes.status || "";
      this.download = resumes.download || "";
      this.role = resumes.role || "";
      this.department = resumes.department || "";
      this.jobType = resumes.jobType || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
