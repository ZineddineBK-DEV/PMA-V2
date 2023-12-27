import { Component, Inject } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectsService } from 'src/app/core/service/projects.service';

@Component({
  selector: 'app-share-file',
  templateUrl: './share-file.component.html',
  styleUrls: ['./share-file.component.sass']
})
export class ShareFileComponent {
  public shareFile: UntypedFormGroup;
  projectname:string
  constructor(
    private formBuilder: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ShareFileComponent>,
    private snackBar: MatSnackBar,
    private projectServ: ProjectsService){}

    ngOnInit(){
      this.projectname = this.data.projectname
      this.shareFile = this.formBuilder.group({
        receiverEmail: new FormControl('',[Validators.required, Validators.email, Validators.minLength(5)]),
      });
    }
    showNotification(colorName, text, placementFrom, placementAlign) {
      this.snackBar.open(text, "", {
        duration: 1000,
        verticalPosition: placementFrom,
        horizontalPosition: placementAlign,
        panelClass: colorName,
      });
    }
    sendFile(){
      const data={
        projectName : this.projectname,
        fileName:this.data.file,
        receiverEmail : this.shareFile.value.receiverEmail
      }
      this.projectServ.sendfile(data).subscribe()
    }
}
