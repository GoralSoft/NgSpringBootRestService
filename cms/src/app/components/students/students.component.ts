import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Column } from 'primeng/primeng';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {Message} from '../../model/Message';
import {SelectItem} from '../../model/SelectItem';
import { ConfirmDialogModule, ConfirmationService, SharedModule } from 'primeng/primeng';
import { Student } from '../../model/Student';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: any[];
  student: any;
  msgs: Message[] = [];

  logs: string[] = [];
  displayDialog: boolean;
  newStudent: boolean;

  studentform: FormGroup;
  submitted: boolean;
  public dob: Date;
  constructor(private ss: StudentService, private confirmationService: ConfirmationService, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.getAllStudents();
    this.studentform = this.fb.group({
      'regno': new FormControl('', Validators.required),
      'name': new FormControl(''),
      'dob': new FormControl('', Validators.required),
      'course': new FormControl(''),
      'deptid': new FormControl(''),
      'batch': new FormControl('')
  });
  }

  showDialogToAdd() {
    this.newStudent = true;
    this.student = new PrimeStudent();
    this.displayDialog = true;
  }

  getAllStudents(): void {
    this.ss.getStudents().subscribe(s => this.students = s);
  }

  onEdit(event: {originalEvent: any, column: Column, data: any}): void {
    this.logs.push('onEdit -', JSON.stringify(event.data));
    // console.log(JSON.stringify(event.data));
  }

  onEditComplete(event: {column: Column, data: any}): void {
    this.logs.push('onEditComplete -', JSON.stringify(event.data));
    // console.log(JSON.stringify(event.data));
  }

  showDialogToEdit(stud: Student) {
    // console.log(JSON.stringify(stud));
    this.dob = new Date(stud.dob);
    stud.dob = this.dob;
    // console.log(stud.dob);
    this.newStudent = false;
    this.student = this.cloneStudent(stud);
    this.displayDialog = true;
    // console.log('this.student...'+JSON.stringify(this.student));
  }
  cloneStudent(c: Student): Student {
    let p = new PrimeStudent();
    for (let prop in c) {
        p[prop] = c[prop];
    }
    return p;
  }
  confirm(s) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to Delete this Record?',
        accept: () => {
            // Actual logic to perform a confirmation
            console.log('confirm...' + JSON.stringify(s));
            this.delete(s);
        }
    });
  }

  saveStudent(stud: any): void {
    console.log(JSON.stringify(stud));
    if (!stud) { return; }
    this.ss.addStudent(stud).subscribe(s =>  {
      let st = [...this.students];
      if (this.newStudent) {
      st.push(this.student);
      }
      else {
      st[this.students.indexOf(s)] = this.students;
      }
      //console.log(JSON.stringify(this.student));
      this.students = st;
      this.student = null;
      this.displayDialog = false;

      this.submitted = true;
      this.msgs = [];
      this.msgs.push({severity: 'info', summary: 'Success', detail: 'New Student Added'});
      // console.log("save Data: "+JSON.stringify(name));
    });
  }

  delete(student: any): void {
    this.ss.deleteStudent(student.regno).subscribe(p =>  {
      let index = this.students.indexOf(student); // this.findSelectedPaperIndex();
      this.students = this.students.filter((val, i) => i != index);
      this.student = null;
      this.displayDialog = false;

      this.msgs = [];
      this.msgs.push({severity: 'info', summary: 'Success', detail: 'Student Deleted'});
    });
  }
  updateStudent(student: any) {
    //console.log(JSON.stringify(student));
    if (!student) { return; }
    this.ss.updateStudent(student).subscribe(newstudent =>
      {
      // let updatedPapers=this.formPapers.filter(p1 =>p1.papercode == upaper.papercode);
      // this.formPapers=updatedPapers;
      for (var i = 0; i < this.students.length; i++)
      {
        if (this.students[i].regno === student.regno)
        {
          this.students[i].name = student.name;
          this.students[i].dob = student.dob;
          this.students[i].course = student.course;
          this.students[i].deptid = student.deptid;
          this.students[i].batch = student.batch;
        }
      }
      this.displayDialog = false;
      // console.log(index+','+JSON.stringify(this.formPapers));
      // this.submitted = true;
      this.msgs = [];
      this.msgs.push({severity: 'info', summary: 'Success', detail: 'Student details updated'});
      // const ix = newpaper ? this.formPapers.findIndex(h => h.papercode === newpaper.papercode) : -1;
      // console.log(ix);
      // if (ix > -1) { this.formPapers[ix] = upaper;}
      // console.log("Update Data: "+JSON.stringify(upaper));
    });

  }
}

class PrimeStudent implements Student {
  constructor(public regno?, public name?, public dob?, public course?, public deptid?, public batch?) {}
}