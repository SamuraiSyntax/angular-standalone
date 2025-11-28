import { FormControl, ValidationErrors } from "@angular/forms"

export function checkNomValidator(field: FormControl): ValidationErrors | null {
  const value = field.value ?? ''
  if (value[0] >= 'A' && value[0] < 'Z') {
    return null
  }
  return {
    majuscule: "Première lettre obligatoirement en majuscule"
  }
}