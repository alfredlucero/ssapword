import { Component, signal } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';

interface PasswordData {
  id: string;
  appName: string;
  appUrl: string;
  description: string;
  password: string;
}

@Component({
    selector: 'app-passwords',
    standalone: true,
    imports: [ ReactiveFormsModule ],
    template: `
      <h2>Passwords</h2>
      <h3>Add a new password to remember</h3>
      <form [formGroup]="addPasswordForm" (submit)="savePassword($event)">
        <div>
          <label for="appName">App Name</label>
          <input id="appName" type="text" formControlName="appName">
        </div>
        <div>
          <label for="appName">App URL</label>
          <input id="appName" type="text" formControlName="appUrl">
        </div>
        <div>
          <label for="appName">Description</label>
          <input id="appName" type="text" formControlName="description">
        </div>
        <div>
          <label for="appName">Password</label>
          <input id="appName" type="password" formControlName="password">
        </div>
        <button type="submit">Save Password</button>
      </form>

      Manage all of your passwords here.
      @for (passwordData of passwords(); track passwordData.id) {
        <div>
          <p>App name: {{ passwordData.appName }}</p>
          <p>App URL: {{ passwordData. appUrl }}</p>
          <p>Description: {{ passwordData.description }}</p>
          <p>Password: {{ passwordData.password }}</p>
        </div>
      }

    `,
    styles: ``,
})
export default class PasswordsComponent {
  passwords = signal<PasswordData[]>([]);

  addPasswordForm = new FormGroup({
    appName: new FormControl(''),
    appUrl: new FormControl(''),
    description: new FormControl(''),
    password: new FormControl(''),
  });

  savePassword(e: Event) {
    e.preventDefault();
    this.passwords.update((passwords) => [...passwords, {
      id: `${Date.now()}`,
      appName: this.addPasswordForm.value.appName ?? '',
      appUrl: this.addPasswordForm.value.appUrl ?? '',
      description: this.addPasswordForm.value.description ?? '',
      password: this.addPasswordForm.value.password ?? '',
    }]);
    this.addPasswordForm.reset();
  }
}
