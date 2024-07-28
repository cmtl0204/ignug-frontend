import {PrimeIcons} from "primeng/api";

export function buttonActionHelper() {
  return {
    save: {
      id: 'save',
      label: 'Guardar',
      icon: PrimeIcons.SAVE,
      severity: 'info',
    }
  }
}
