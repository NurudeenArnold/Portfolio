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
  showOtherReason = signal(false);
  form!: ReturnType<Contact['buildForm']>;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
  ) {
    this.form = this.buildForm();
  }

  private buildForm() {
    return this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
      reason: ['', Validators.required],
      otherReason: ['', Validators.maxLength(200)],
      message: ['', [Validators.required, Validators.maxLength(2000)]],
      // Hidden from real visitors; only bots blindly filling every field
      // populate this. See contact.scss and backend/api/contact.ts.
      honeypot: [''],
    });
  }

  onReasonChange(): void {
    const isOther = this.form.controls.reason.value === 'other';
    this.showOtherReason.set(isOther);

    const otherReasonControl = this.form.controls.otherReason;
    otherReasonControl.setValidators(
      isOther ? [Validators.required, Validators.maxLength(200)] : Validators.maxLength(200),
    );
    if (!isOther) {
      otherReasonControl.setValue('');
    }
    otherReasonControl.updateValueAndValidity();
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
      this.showOtherReason.set(false);
      Swal.fire({
        title: 'Thank you!',
        text: "I'll get back to you within a few days.",
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
