import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private dataService: DataService,
              private route: ActivatedRoute) { }

  addForm: FormGroup;
  id: number;
  isUser: boolean = JSON.parse(localStorage.user) !== 'admin';

  ngOnInit() {
    let isEdit = false;

    this.route.queryParams.subscribe(params => {
      isEdit = !!params.id;
      this.id = +params.id;
    });
    if (!isEdit) {
      this.addForm = this.formBuilder.group({
        userName: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        emailid: ['', Validators.required],
        salary: ['', Validators.required]
      });
    }
    else {
      const userData = JSON.parse(localStorage.userList);
      const filteredData = userData.filter((user) => user.id === this.id);
      this.addForm = this.formBuilder.group({
        userName: [filteredData[0].userName, Validators.required],
        firstName: [filteredData[0].firstName, Validators.required],
        lastName: [filteredData[0].lastName, Validators.required],
        emailid: [filteredData[0].emailid, Validators.required],
        salary: [filteredData[0].salary, Validators.required]
      });
      if (this.isUser) {
        this.addForm.get('userName').disable();
      }
    }

  }

  onSubmit() {
    if (this.addForm.valid && !this.id) {
    const data = localStorage.userList ? JSON.parse(localStorage.userList) : [];
    this.addForm.value.id = data.length + 1;
    data.push (this.addForm.value);
    localStorage.userList = JSON.stringify(data);
    this.router.navigate(['/home']);
    }

    else if (this.addForm.valid && this.id) {
      const userData = JSON.parse(localStorage.userList);
      const filteredData = userData.filter((user) => user.id !== this.id);
      this.addForm.value.id = this.id;
      console.log("going")
      filteredData.push(this.addForm.value);
      localStorage.userList = JSON.stringify(filteredData);
      this.router.navigate(['/home']);
      
    }
  }

  onCancel() {
    this.router.navigate(['/home']);
  }


}
