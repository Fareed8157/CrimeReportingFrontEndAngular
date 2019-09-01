import { AbstractControl } from '@angular/forms';

export class CustomValidators {
    static  emailDomain(domainName: string) {
        return (control: AbstractControl): { [key: string]: any } | null => {
          const email: string = control.value;
          const domain = email.substring(email.lastIndexOf('@') + 1);
          if (email === '' || domain.toLowerCase() === domainName.toLowerCase()) {
            return null;
          } else {
            return { 'emailDomain': true };
          }
        };
      }

      static  phoneDomain(domainName: string) {
        return (control: AbstractControl): { [key: string]: any } | null => {
          const phone: string = control.value;
          const domain = phone.substring(phone.lastIndexOf('+92'));
          if (phone.startsWith('+92')) {
            return null;
          } else {
            return { 'phoneDomain': true };
          }
        };
      }
}