import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { WorkersService } from '../services/workers.service';
import { isNullOrUndefined } from 'util';
import { ActivatedRoute, Router } from '@angular/router';
import { Worker } from '../shared/models/worker.model';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  public href: string = this.router.url;
  public selectedWorker: Worker;
  public workers: Worker[] = [];
  public workerForm: FormGroup;
  public maxDate = new Date();
  public mask = ['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  constructor(private workersService: WorkersService, private router: Router, private activatedRouter: ActivatedRoute) {
    this.workerForm = new FormGroup({
      id: new FormControl(),
      lastname: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.required, Validators.pattern(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      DOB: new FormControl(null, [Validators.required, this.dateValidator]),
      department: new FormControl(null, [Validators.required])
    });
  }

  async ngOnInit() {
    if (this.href === '/add') {
      try {
        const workers = await this.workersService.getWorkers();
        this.workers = (isNullOrUndefined(workers)) ? [] : workers;
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        let id;
        this.activatedRouter.params.subscribe(param => {
          id = param.id;
        });
        const selectedWorker = await this.workersService.getWorkerById(id);
        this.selectedWorker = (isNullOrUndefined(selectedWorker)) ? [] : selectedWorker;
        this.workerForm.patchValue({
          id: this.selectedWorker.id, lastname: this.selectedWorker.lastname, name: this.selectedWorker.name,
          surname: this.selectedWorker.surname, number: this.selectedWorker.number, email: this.selectedWorker.email, DOB: this.selectedWorker.DOB, department: this.selectedWorker.department
        });
      } catch (e) {
        console.log(e);
      }
    }

  }
  async onWorkerFormSubmit() {
    if (this.href === '/add') {
      try {
        const worker = this.workerForm.value;
        await this.workersService.postWorker(worker);
        await this.router.navigate(['/view']);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await this.workersService.putWorkerById(this.workerForm.value.id, this.workerForm.value);
        await this.router.navigate(['/view']);
      } catch (err) {
        console.log(err);
      }
    }

  }
  private dateValidator(control: FormControl): ValidationErrors {
    const date = new Date(control.value).getTime();
    const nowDate = new Date().getTime();
    if (date > nowDate) {
      return { invalidPassword: 'Дата рождения не может быть в будующем' };
    }
    return null;
  }

  async deleteWorker(id) {
    try {
      await this.workersService.deleteWorkerById(id);
      await this.router.navigate(['/view']);
    } catch (err) {
      console.log(err);
    }
  }
}
