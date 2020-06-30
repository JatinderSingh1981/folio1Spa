import { Component, OnInit } from '@angular/core';
import { FolioClassTemplate } from '../_models';
import { FolioService } from '../_services';
import { AlertService } from '../alert/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-folio-class-dynamic',
  templateUrl: './folio-class-dynamic.component.html',
  styleUrls: ['./folio-class-dynamic.component.css']
})
export class FolioClassDynamicComponent implements OnInit {

  selectedClass = null;
  
  folioClasses = null;
  folioClassesOriginal = null;
  
  addOrEditingClass = false;
  deletingClass = false;

  addOrEditingStudent = false;

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };


  constructor(private fService: FolioService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.getAllClasses();
  }
  showAlertMessage(showSuccessMessage: boolean, message: string) {
    if (showSuccessMessage)
      this.alertService.success(message, this.options);
    else
      this.alertService.error(message, this.options);
  }

  getAllClasses() {
    this.fService.getAllClasses()
      .pipe(first())
      .subscribe((result) => {
        this.folioClasses = result.item1;
        this.folioClassesOriginal = JSON.parse(JSON.stringify(result.item1));
      });
  }



  //Methods for handling Class
  selectClass(selected: FolioClassTemplate) {
    this.selectedClass = selected;
   
    //Child component will do rest of the function 
    
  }

  addClassClicked() {
    this.addNewClass();
    this.selectedClass = new FolioClassTemplate();
    this.selectedClass.id = 0;
    this.selectedClass.isEditing = true;
    this.folioClasses.push(this.selectedClass);
  }

  addNewClass() {

    this.addOrEditingClass = true;
    //this.selectedClass = null;
    this.addOrEditingStudent = false;
  }
  editClass(selected: FolioClassTemplate) {
    this.addNewClass();
    selected.isEditing = true;
    this.selectedClass = selected;
  }

  deleteClass(selected: FolioClassTemplate) {

    selected.isDeleting = this.deletingClass = true;
    this.fService.deleteClass(selected.id)
      .pipe(first())
      .subscribe((res) => {
        if (res.item2) {
          this.folioClassesOriginal = this.folioClassesOriginal.filter(x => x.id !== selected.id);
          this.folioClasses = JSON.parse(JSON.stringify(this.folioClassesOriginal));
          this.deletingClass = false;
          this.selectedClass = null;
        }

        this.showAlertMessage(res.item2, res.item3);
      });
  }

  //On Click of Save
  onSubmit() {


    if (this.selectedClass.id > 0) {
      this.fService.editClass(this.selectedClass.id, this.selectedClass)
        .pipe(first())
        .subscribe((res) => {
          this.showAlertMessage(res.item2, res.item3);
          if (res.item2) {

            this.onCancel(this.selectedClass);
            this.getAllClasses();
          }

          
        });
    }
    else {

      this.fService.addClass(this.selectedClass)
        .pipe(first())
        .subscribe((res) => {
          if (res.item2) {
            this.folioClassesOriginal.push(res.item1);
            this.onCancel(this.selectedClass);
          }

          this.showAlertMessage(res.item2, res.item3);
        });
    }

  }

  onCancel(selected: FolioClassTemplate) {
    this.folioClasses = JSON.parse(JSON.stringify(this.folioClassesOriginal));
    //this.folioClasses = this.folioClassesOriginal;
    selected.isEditing = false;
    this.addOrEditingClass = false;
    this.deletingClass = false;

    this.selectedClass = null;

  }

}
