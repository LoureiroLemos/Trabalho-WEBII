import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../authentication/services/auth.service';
import { User } from '../../../shared/models/user.model';

interface EmployeeForm {
  id: number | null;
  name: string;
  email: string;
  birthDate: string;
  password: string;
}

@Component({
  selector: 'app-employee-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-management.html',
})
export class EmployeeManagementComponent implements OnInit {
  private readonly authService = inject(AuthService);

  employees: User[] = [];
  editing = false;
  errorMessage = '';
  successMessage = '';

  form: EmployeeForm = this.emptyForm();

  ngOnInit(): void {
    this.loadEmployees();
  }

  private emptyForm(): EmployeeForm {
    return { id: null, name: '', email: '', birthDate: '', password: '' };
  }

  private clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }

  loadEmployees(): void {
    this.employees = this.authService
      .getEmployees()
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  startCreate(): void {
    this.clearMessages();
    this.editing = false;
    this.form = this.emptyForm();
  }

  startEdit(employee: User): void {
    this.clearMessages();
    this.editing = true;
    this.form = {
      id: employee.id,
      name: employee.name,
      email: employee.email,
      birthDate: employee.birthDate || '',
      password: '',
    };
  }

  save(): void {
    this.clearMessages();
    try {
      if (this.editing && this.form.id) {
        this.authService.updateEmployee(this.form.id, {
          name: this.form.name,
          email: this.form.email,
          birthDate: this.form.birthDate,
          password: this.form.password || undefined,
        });
        this.successMessage = 'Funcionário atualizado com sucesso.';
      } else {
        this.authService.addEmployee({
          name: this.form.name,
          email: this.form.email,
          birthDate: this.form.birthDate,
          password: this.form.password,
        });
        this.successMessage = 'Funcionário cadastrado com sucesso.';
      }
      this.loadEmployees();
      this.startCreate();
    } catch (error: any) {
      this.errorMessage = error?.message || 'Não foi possível salvar o funcionário.';
    }
  }

  remove(employee: User): void {
    this.clearMessages();
    const confirmed = confirm(`Deseja remover o funcionário "${employee.name}"?`);
    if (!confirmed) return;

    try {
      this.authService.removeEmployee(employee.id);
      this.successMessage = 'Funcionário removido com sucesso.';
      this.loadEmployees();
      if (this.form.id === employee.id) this.startCreate();
    } catch (error: any) {
      this.errorMessage = error?.message || 'Não foi possível remover o funcionário.';
    }
  }
}
