import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from './contact.service';

type Status = 'idle' | 'sending' | 'sent' | 'error';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  status = signal<Status>('idle');
  form!: ReturnType<Contact['buildForm']>;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
  ) {
    this.form = this.buildForm();
  }

  private buildForm() {
    return this.fb.nonNullable.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.status.set('sending');
    try {
      await this.contactService.send(this.form.getRawValue());
      this.status.set('sent');
      this.form.reset();
    } catch {
      this.status.set('error');
    }
  }
}
