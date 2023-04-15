enum STATUS {
  ALL = 'ALL',
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  VALIDATED = 'VALIDATED'
}
export enum SCOPE {
  FIXE_EQUIPMENT = 'FIXE_EQUIPMENT'
}
export interface BUILDING {
  id?: string
  reference: string
  name: string
  area: number
}

export { STATUS as default }
