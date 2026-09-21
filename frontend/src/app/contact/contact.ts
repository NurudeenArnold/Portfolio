import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  sending = signal(false);
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

    this.sending.set(true);
    try {
      await this.contactService.send(this.form.getRawValue());
      this.form.reset();
      Swal.fire({
        title: 'Thank you!',
        text: 'I will be in contact with you soon.',
        color: 'var(--text-color)',
        icon: 'success',
        confirmButtonColor: 'var(--main-color)',
        iconColor: 'var(--main-color)',
        confirmButtonText: 'Okay',
        background: 'var(--bg-color)',
      });
    } catch {
      Swal.fire({
        title: 'Error:',
        text: 'Something went wrong sending your message. Please try again.',
        color: '#ffffff',
        icon: 'error',
        confirmButtonText: 'Okay',
        iconColor: 'var(--text-color)',
        confirmButtonColor: 'var(--text-color)',
      });
    } finally {
      this.sending.set(false);
    }
  }
}
