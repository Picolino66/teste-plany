import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Customer } from 'app/core/model/customer.model';
import { CustomerService } from 'app/core/services/customer.service';

@Component({
  selector: 'app-insert-update',
  templateUrl: './insert-update.component.html',
  styleUrls: ['./insert-update.component.scss']
})

export class InsertUpdateComponent implements OnInit {
  @Input() public customer;
  customerUpdate: Customer;

  perfil: FormGroup;

  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    if(this.customer){
      this.perfil = this.formBuilder.group({
        name: this.customer.name,
        email: this.customer.email,
        birthDate: this.customer.birthDate
      });
    }else{
      this.perfil = this.formBuilder.group({
        name: '',
        email: '',
        birthDate: null
      });
    }
  }

  salvar(){
    this.customerUpdate = {
      name: this.customer.name,
      email: this.customer.email,
      birthdate: this.customer.birthdate
    }

    if (this.customer){
      this.customerService.update(this.customerUpdate).subscribe(x => {
        console.log(x);
      })
    }
    else{
      this.customerService.create(this.customerUpdate).subscribe(x => {
        console.log(x);
      })
    }
  }

}
