import { Component, OnInit } from '@angular/core';
import { FolioClassTemplate, StudentTemplate } from '../_models';
import { FolioService } from '../_services';
import { AlertService } from '../alert/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-folio-class-student-dynamic',
  templateUrl: './folio-class-student-dynamic.component.html',
  styleUrls: ['./folio-class-student-dynamic.component.css']
})
export class FolioClassStudentDynamicComponent implements OnInit {

  selectedClass = null;
  selectedStudent = null;

  folioClasses = null;
  students = null;

  folioClassesOriginal = null;
  studentsOriginal = null;

  addOrEditingClass = false;
  deletingClass = false;


  addOrEditingStudent = false;
  deletingStudent = false;

  minNum = 15;
  maxNum = 55;

  highLightGPA = 3.2;

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
    this.onStudentReset(null);
    this.fService.getStudentsForSelectedClass(this.selectedClass.id)
      .pipe(first())
      .subscribe((result) => {
        if (result && result.item1)
          this.students = result.item1;
        else
          this.students = [];
        this.studentsOriginal = JSON.parse(JSON.stringify(this.students));
      });
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

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  //Methods for handing Student
  addStudentClicked() {
    this.addNewStudent();
    this.selectedStudent = new StudentTemplate();
    this.selectedStudent.id = 0;
    this.selectedStudent.folioClassId = this.selectedClass.id;
    this.selectedStudent.isEditing = true;
    this.students.push(this.selectedStudent);
  }
  addNewStudent() {
    this.addOrEditingStudent = true;

  }

  editStudent(selected: StudentTemplate) {

    this.addNewStudent();
    selected.isEditing = true;
    this.selectedStudent = selected;
  }
  deleteStudent(selected: StudentTemplate) {
    //const result = this.students.find(x => x.id === id);
    selected.isDeleting = this.deletingStudent = true;
    this.fService.deleteStudent(selected.id)
      .pipe(first())
      .subscribe((res) => {
        if (res.item2) {
          this.studentsOriginal = this.studentsOriginal.filter(x => x.id !== selected.id);
          this.students = JSON.parse(JSON.stringify(this.studentsOriginal));
          this.deletingStudent = false;
        }
        this.showAlertMessage(res.item2, res.item3);
      });
  }

  onStudentSubmit() {


    if (this.selectedStudent.id > 0) {
      this.fService.editStudent(this.selectedStudent.id, this.selectedStudent)
        .pipe(first())
        .subscribe((res) => {

          if (res.item2) {
            //this.alertService.success('Success!!', this.options);
            //this.onStudentReset(this.selectedStudent);
            this.selectClass(this.selectedClass);
          }

          this.showAlertMessage(res.item2, res.item3);

        });
    }
    else {

      // this.studentForm.patchValue({
      //   id: 0,
      //   folioClassId: this.selectedClass.id,
      //   age: parseInt(this.studentForm.get("age").value),
      //   gpa: parseFloat(this.studentForm.get("gpa").value)
      // });
      this.fService.addStudent(this.selectedStudent)
        .pipe(first())
        .subscribe((res) => {
          if (res.item2) {
            if (res && res.item1)
              this.studentsOriginal.push(res.item1);
            else
              this.selectClass(this.selectedClass);
            this.onStudentReset(this.selectedStudent);
          }

          this.showAlertMessage(res.item2, res.item3);
        });
    }


  }

  onStudentReset(selected: StudentTemplate) {
    this.students = JSON.parse(JSON.stringify(this.studentsOriginal));
    if (selected != null)
      selected.isEditing = false;
    this.selectedStudent = null;

    this.addOrEditingStudent = false;
    this.deletingStudent = false;
  }




}
