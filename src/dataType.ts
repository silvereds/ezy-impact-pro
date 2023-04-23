enum STATUS {
  ALL = 'ALL',
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  VALIDATED = 'VALIDATED'
}
export enum SCOPE {
  FIXE_EQUIPMENT = 'FIXED_EQUIPMENT',
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
  nameOfTheSite: string
  area: number
}
export type Select = {
  id: string
  name: string
}

type UNIT = {
  reference: string,
  unit: string,
  value: string
}

export interface EQUIPMENT {
  reference: string | null,
  userId: string | null,
  typeReference: UNIT | null,
  fuelReference: UNIT | null,
  performanceReference:UNIT | null ,
  equipmentName: string | null,
  buildingId: string|null,
  enterpriseId: string|null,
  ownerType: string|null,
  declarationStatus?: string | null,
  emissionFactor?: number|null,
  emissionFactorDataSource?: string|null,
  reportingFrequencyId?: number|null,
  hypotheses?: string|null,
  adminComment?: string|null
}

export interface MOBILES extends EQUIPMENT {
  brand:UNIT | null,
  modele:UNIT | null,
  productionYear: number|null,
}

export interface FIXED_EQUIPMENT extends EQUIPMENT {}

export interface ACTIVITIES {
  id?: string | null
  reference: string | null
  userId?: string | null
  type: Select | null
  unit: Select | null
  declarerId: string | null
}

export { STATUS as default }
