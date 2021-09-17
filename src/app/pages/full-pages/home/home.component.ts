import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from 'app/core/services/customer.service';
import { Subscription } from 'rxjs';
import { Customer } from 'app/core/model/customer.model';
import { InsertUpdateComponent } from '../insert-update/insert-update.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class HomeComponent implements OnInit {
  closeResult = '';
  customer: Customer;
  isLoaded: boolean = false;
  public form: FormGroup;


  constructor(
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private customerService:CustomerService
  ) {
  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.customerService.get().subscribe(element => {
      this.customer = element;
      this.cdr.detectChanges();
    });
  }

  open(customer?) {
    const modalRef = this.modalService.open(InsertUpdateComponent);
    modalRef.componentInstance.customer = customer;
  }

  excluir(customer) {
    this.customerService.get().subscribe(element => {
      this.customer = element;
      this.cdr.detectChanges();
    });
  }
}
