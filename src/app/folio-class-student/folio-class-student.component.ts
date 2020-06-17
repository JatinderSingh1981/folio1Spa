import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FolioClass, Student } from '../_models';
import { FolioService } from '../_services';
import { AlertService } from '../alert/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-folio-class-student',
  templateUrl: './folio-class-student.component.html',
  styleUrls: ['./folio-class-student.component.css']
})
export class FolioClassStudentComponent implements OnInit {
  classForm: FormGroup;
  submitted = false;

  studentForm: FormGroup;
  submittedStudent = false;
  selectedClass = null;
  selectedStudent = null;

  folioClasses = null;
  students = null;

  addingClass = false;
  editingClass = false;
  deletingClass = false;

  addingStudent = false;
  editingStudent = false;
  deletingStudent = false;

  highLightGPA = 3.2;

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  constructor(private formBuilder: FormBuilder, private fService: FolioService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.classForm = this.formBuilder.group({
      id: 0,
      name: ['', Validators.required],
      location: ['', Validators.required],
      teacherName: ['', Validators.required]
    });

    this.studentForm = this.formBuilder.group({
      id: 0,
      folioClassId: 0,
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      gpa: ['', Validators.required],
    });

    this.getAllClasses();
  }

  getAllClasses() {
    this.fService.getAllClasses()
      .pipe(first())
      .subscribe(result => this.folioClasses = result.item1);
  }
  // convenience getter for easy access to form fields
  get f() { return this.classForm.controls; }
  get s() { return this.studentForm.controls; }

  showAlertMessage(showSuccessMessage: boolean, message: string) {
    if (showSuccessMessage)
      this.alertService.success(message, this.options);
    else
      this.alertService.error(message, this.options);
  }

  //Methods for handling Class
  selectClass(selected: FolioClass) {
    this.selectedClass = selected;

    this.fService.getStudentsForSelectedClass(this.selectedClass.id)
      .pipe(first())
      .subscribe(result => this.students = result.item1);
  }

  addClass() {
    this.addingClass = true;
    this.selectedClass = null;
    this.addingStudent = false;
  }
  editClass(selected: FolioClass) {

    this.classForm.patchValue({
      id: parseInt(selected.id),
      name: selected.name,
      location: selected.location,
      teacherName: selected.teacherName,
    });

    this.addClass();
    this.editingClass = true;
    this.selectedClass = selected;
  }

  deleteClass(id: string) {
    const result = this.folioClasses.find(x => x.id === id);
    result.isDeleting = this.deletingClass = true;
    this.fService.deleteClass(id)
      .pipe(first())
      .subscribe((res) => {
        if (res.item2) {
          this.folioClasses = this.folioClasses.filter(x => x.id !== id);

          this.deletingClass = false;
          this.selectedClass = false;
        }

        this.showAlertMessage(res.item2, res.item3);
      });
  }

  //On Click of Save
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.classForm.invalid) {
      return;
    }

    if (parseInt(this.classForm.get("id").value) > 0) {
      this.fService.editClass(this.classForm.get("id").value, this.classForm.value)
        .pipe(first())
        .subscribe((res) => {
          if (res.item2) {

            this.onReset();
            this.getAllClasses();
          }

          this.showAlertMessage(res.item2, res.item3);
        });
    }
    else {
      this.classForm.patchValue({ id: 0 });
      this.fService.addClass(this.classForm.value)
        .pipe(first())
        .subscribe((res) => {
          if (res.item2) {
            this.folioClasses.push(res.item1);
            //this.alertService.success(res.item3, this.options);
            this.onReset();
          }

          this.showAlertMessage(res.item2, res.item3);
        });
    }

  }

  onReset() {
    this.submitted = false;
    this.addingClass = false;
    this.editingClass = false;
    this.deletingClass = false;

    this.selectedClass = null;
    this.classForm.reset();
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  //Methods for handing Student
  addStudent() {
    this.addingStudent = true;
  }

  editStudent(selected: Student) {
    this.studentForm.patchValue({
      id: parseInt(selected.id),
      folioClassId: this.selectedClass.id,
      firstName: selected.firstName,
      lastName: selected.lastName,
      age: parseInt(selected.age),
      gpa: parseFloat(selected.gpa)
    });

    this.addStudent();
    this.editingStudent = true;
    this.selectedStudent = selected;
  }
  deleteStudent(id: string) {
    const result = this.students.find(x => x.id === id);
    result.isDeleting = this.deletingStudent = true;
    this.fService.deleteStudent(id)
      .pipe(first())
      .subscribe((res) => {
        if (res.item2) {
          this.students = this.students.filter(x => x.id !== id);
          this.deletingStudent = false;
        }
        this.showAlertMessage(res.item2, res.item3);
      });
  }

  onStudentSubmit() {
    this.submittedStudent = true;

    // stop here if form is invalid
    if (this.studentForm.invalid) {
      return;
    }

    if (parseInt(this.studentForm.get("id").value) > 0) {
      this.fService.editStudent(this.studentForm.get("id").value, this.studentForm.value)
        .pipe(first())
        .subscribe((res) => {

          if (res.item2) {
            //this.alertService.success('Success!!', this.options);
            this.onStudentReset();
            this.selectClass(this.selectedClass);
          }

          this.showAlertMessage(res.item2, res.item3);

        });
    }
    else {

      this.studentForm.patchValue({
        id: 0,
        folioClassId: this.selectedClass.id,
        age: parseInt(this.studentForm.get("age").value),
        gpa: parseFloat(this.studentForm.get("gpa").value)
      });
      this.fService.addStudent(this.studentForm.value)
        .pipe(first())
        .subscribe((res) => {
          if (res.item2) {
            if (res && res.item1)
              this.students.push(res.item1);
            else
              this.selectClass(this.selectedClass);
            //this.alertService.success('Success!!', this.options);
            this.onStudentReset();
          }

          this.showAlertMessage(res.item2, res.item3);
        });
    }


  }

  onStudentReset() {
    this.submittedStudent = false;
    this.addingStudent = false;
    this.editingStudent = false;
    this.deletingStudent = false;
    this.studentForm.reset();
  }

}
