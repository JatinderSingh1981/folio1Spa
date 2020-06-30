import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FolioClassTemplate, StudentTemplate, messageToParent } from '../_models';
import { FolioService } from '../_services';
// import { AlertService } from '../alert/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-folio-student-dynamic',
  templateUrl: './folio-student-dynamic.component.html',
  styleUrls: ['./folio-student-dynamic.component.css']
})
export class FolioStudentDynamicComponent implements OnInit {

  private _selectedClass = null;

  @Input()
  set selectedClass(selected: FolioClassTemplate) {
    this._selectedClass = selected;

    this.getStudentsForSelectedClass();
  }
  get selectedClass(): FolioClassTemplate { return this._selectedClass; }

  @Input()
  addOrEditingStudent = false;

  @Output() showAlertMessage = new EventEmitter();

  selectedStudent = null;

  students = null;
  studentsOriginal = null;

  deletingStudent = false;

  minNum = 15;
  maxNum = 55;

  highLightGPA = 3.2;

  constructor(private fService: FolioService) { }

  ngOnInit(): void {
  }

  getStudentsForSelectedClass() {
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
  showMessage(showSuccessMessage: boolean, message: string) {
    var alertMessage = new messageToParent();
    alertMessage.showSuccessMessage = showSuccessMessage;
    alertMessage.message = message;
    //Emit the message, so that parent can catch it and display it to the user
    this.showAlertMessage.emit(alertMessage);

  }
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
        this.showMessage(res.item2, res.item3);
      });
  }

  onStudentSubmit() {


    if (this.selectedStudent.id > 0) {
      this.fService.editStudent(this.selectedStudent.id, this.selectedStudent)
        .pipe(first())
        .subscribe((res) => {

          if (res.item2) {

            //this.selectedClass = this.selectedClass;
            this.getStudentsForSelectedClass();
          }

          this.showMessage(res.item2, res.item3);

        });
    }
    else {

      this.fService.addStudent(this.selectedStudent)
        .pipe(first())
        .subscribe((res) => {
          if (res.item2) {
            if (res && res.item1)
              this.studentsOriginal.push(res.item1);
            else {
              this.getStudentsForSelectedClass();
              //this.selectClass(this.selectedClass);
            }
            this.onStudentReset(this.selectedStudent);
          }

          this.showMessage(res.item2, res.item3);
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
