import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PaperService} from '../../services/paper.service';
import {Paper} from '../../model/Paper'
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {Message} from '../../model/message';
import {SelectItem} from '../../model/SelectItem';
import {ConfirmDialogModule, ConfirmationService, SharedModule} from 'primeng/primeng';


/*
let paperForm = [
  { key: 'papercode',
    title: 'Enter paper code',
    validationMessages: {
      // Put your error messages for the 'name' field here
      'papercode':'Ex:UTAM101'
    }
  },
  { type: 'submit', title: 'Submit' }
]
*/
@Component({
  selector: 'app-papers-data',
  templateUrl: './papers.component.html',
  styleUrls: ['./papers.component.css']
})
export class PapersComponent implements OnInit {
  //papers:any;
  paper: any;
  formPapers: any[];
  allpapers;

  displayDialog: boolean;
  newPaper: boolean;
  //car: Paper = new PrimePaper();
  selectedPaper: Paper;

  paperSchema = {
    "type": "object",
    "title": "Paper",
    "properties": {
      "papercode": {
        "title": "Paper Code",
        "type": "string"
      },
      "papername": {
        "title": "Paper Name",
        "type": "string"
      }
    },
    "required": ["papercode"]
  };

  paperModel = {
    "papercode": "",
    "papername": ""
  }

  paperForm = [{
    "type": "section",
    "htmlClass": "row",
    "items": [
      {
        "type": "section",
        "htmlClass": "col-xs-2",
        "items": [
          "papercode"
        ]
      },
      {
        "type": "section",
        "htmlClass": "col-xs-2",
        "items": [
          "papername"
        ]
      }
    ]
  },
  {
    "type": "submit",
    "style": "btn-info",
    "title": "save"
    //"onClick":'this.savePaper(this.papers)'
  }
  ];


  /*
  papersSchema = {
    "type": "object",
    "title": "List of Papers",

    "properties": {
      "Papers": {
        "type": "array",
        "format": "table",
        "items": {
          "type": "object",
          "properties": {
            "papercode": {
              "title": "Paper Code",
              "type": "string"
            },
            "papername": {
              "title": "Paper Name",
              "type": "string"
            }
          },
          "required": [
            "papercode"
          ]
        }
      }
    }
  };
  */
  msgs: Message[] = [];

  pform: FormGroup;

  submitted: boolean;

  constructor(private ps: PaperService, private fb: FormBuilder, private confirmationService: ConfirmationService) {

  }

  edit(rowdata: any, index: number) {
    this.selectedPaper = rowdata;
    rowdata.isEditable = true;
  }

  onRowSelectClick(e) {
    console.log(e);
    this.CloseAllEditable();
    e.data.isEditable = true;
  }
  CloseAllEditable() {
    for (let item of this.formPapers) {
      if (item.isEditable) {
        item.isEditable = false;
      }
    }
  }
  confirm(p) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete this Record?',
      accept: () => {
        // Actual logic to perform a confirmation
        console.log('confirm...' + p.papercode);
        this.delete(p);
      }
    });
  }

  ngOnInit() {
    this.getFormPapers();
    this.pform = this.fb.group({
      'papercode': new FormControl('', Validators.required),
      'papername': new FormControl('')
    });

  }

  onSubmit(value: string) {
    this.submitted = true;
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Success', detail: 'Form Submitted'});
  }

  get diagnostic() {return JSON.stringify(this.pform.value);}

  showDialogToAdd() {
    this.newPaper = true;
    this.paper = new PrimePaper();
    this.displayDialog = true;
  }

  showDialogToEdit(paper: Paper) {
    console.log(paper);
    this.newPaper = false;
    this.paper = this.clonePaper(paper);
    this.displayDialog = true;
    console.log('this.paper...' + this.paper);
  }

  onRowSelect(event) {
    this.newPaper = false;
    this.paper = this.clonePaper(event.data);
    //this.displayDialog = true;
  }


  clonePaper(c: Paper): Paper {
    let p = new PrimePaper();
    for (let prop in c) {
      p[prop] = c[prop];
    }
    return p;
  }

  findSelectedPaperIndex(): number {
    return this.formPapers.indexOf(this.selectedPaper);
  }

  getFormPapers(): void {
    this.ps.getPapers().subscribe(p => this.formPapers = p);
  }
  savePaper(name: any): void {
    if (!name) {return;}
    this.ps.addPaper(name).subscribe(paper => {
      //this.formPapers.push(name);
      //this.paperModel.papername="";

      let papers = [...this.formPapers];
      if (this.newPaper)
        papers.push(this.paper);
      else
        papers[this.formPapers.indexOf(paper)] = this.formPapers;
      this.formPapers = papers;
      this.paper = null;
      this.displayDialog = false;

      this.submitted = true;
      this.msgs = [];
      this.msgs.push({severity: 'info', summary: 'Success', detail: 'New Paper Added'});
      //console.log("save Data: "+JSON.stringify(name));
    });

    //console.log('save done....');
  }

  delete(paper: any): void {
    //this.formPapers = this.formPapers.filter(h => h !== paper);
    this.ps.deletePaper(paper.papercode).subscribe(p => {
      let index = this.formPapers.indexOf(paper);//this.findSelectedPaperIndex();
      this.formPapers = this.formPapers.filter((val, i) => i != index);
      this.paper = null;
      this.displayDialog = false;
      //console.log(index+','+JSON.stringify(this.formPapers));
      //this.submitted = true;
      this.msgs = [];
      this.msgs.push({severity: 'info', summary: 'Success', detail: 'Paper Deleted'});
    });
  }

  selectPaper(paper: any): void {
    console.log("inside select paper..........");
    //this.formPapers = this.formPapers.filter(h => h !== paper);
    this.ps.selectPaper(paper.papercode).subscribe(
      pname => {
        this.paperModel = pname;

        //this.newPaper = false;
        this.paper = pname;//this.clonePaper(event.data);
        //this.displayDialog = true;
      }
    );
  }

  updatePaper(upaper: any) {
    if (!upaper) {return;}
    this.ps.updatePaper(upaper).subscribe(newpaper => {
      //let updatedPapers=this.formPapers.filter(p1 =>p1.papercode == upaper.papercode);
      //this.formPapers=updatedPapers;
      for (var i = 0; i < this.formPapers.length; i++) {
        if (this.formPapers[i].papercode === upaper.papercode) {
          this.formPapers[i].papername = upaper.papername;
        }
      }
      this.displayDialog = false;
      //console.log(index+','+JSON.stringify(this.formPapers));
      //this.submitted = true;
      this.msgs = [];
      this.msgs.push({severity: 'info', summary: 'Success', detail: 'Paper details updated'});
      //const ix = newpaper ? this.formPapers.findIndex(h => h.papercode === newpaper.papercode) : -1;
      //console.log(ix);
      //if (ix > -1) { this.formPapers[ix] = upaper;}
      //console.log("Update Data: "+JSON.stringify(upaper));
    });

  }

}
class PrimePaper implements Paper {
  constructor(public papercode?, public papername?) {}
}
