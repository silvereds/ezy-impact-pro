enum STATUS {
  ALL = 'ALL',
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  VALIDATED = 'VALIDATED'
}
export enum SCOPE {
  FIXE_EQUIPMENT = 'FIXE_EQUIPMENT',
  ELECTRICAL_EQUIPMENT = 'ELECTRICAL_EQUIPMENT',
  MOBILE_EQUIPMENT = 'MOBILE_EQUIPMENT',
  COLD_HEAT_EQUIPMENT = 'COLD_HEAT_EQUIPMENT',
  INDUSTRIAL_ACTIVITIES = 'INDUSTRIAL_ACTIVITIES',
  BIOMAS_ACTIVITIES = 'BIOMASS_ACTIVITIES',
  GES_ACTIVITIES = 'GES_ACTIVITIES'
}

export interface BUILDING {
  id?: string
  reference: string
  name: string
  area: number
}
export type Select = {
  id: string
  name: string
}
export interface MOBILES {
  id?: string | null
  reference: string | null
  userId?: string | null
  type: Select | null
  brand: Select | null
  model: Select | null
  yearProduction: number | null
  fuelUsed: Select | null
  performanceValue: number | null
  performanceUnit: Select | null
  name: string | null
  declarerId: string | null
  owner: string | null
}
export interface EQUIPMENT {
  id?: string | null
  reference: string | null
  userId?: string | null
  type: Select | null
  brand: Select | null
  model: Select | null
  performanceValue: number | null
  performanceUnit: Select | null
  name: string | null
  declarerId: string | null
  owner: string | null
}
export interface ACTIVITIES {
  id?: string | null
  reference: string | null
  userId?: string | null
  type: Select | null
  unit: Select | null
  declarerId: string | null
}

export { STATUS as default }
