export enum STATUS {
  ALL = 'ALL',
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  VALIDATED = 'VALIDATED'
}
export enum SCOPE {
  FIXE_EQUIPMENT = 'FIXED_EQUIPMENT',
  INDUSTRIAL_ACTIVITY = 'INDUSTRIAL_ACTIVITY',
  ELECTRICAL_EQUIPMENT = 'ELECTRICAL_EQUIPMENT',
  MOBILE_EQUIPMENT = 'MOBILE_EQUIPMENT',
  COLD_HEAT_EQUIPMENT = 'COLD_HEAT_EQUIPMENT',
  INDUSTRIAL_ACTIVITIES = 'INDUSTRIAL_ACTIVITIES',
  BIOMAS_ACTIVITIES = 'BIOMASS_ACTIVITIES',
  GES_ACTIVITIES = 'GES_ACTIVITIES',
  COLD_AND_HEAT_EQUIPMENT='COLD_AND_HEAT_EQUIPMENT',
  ACTIVITY_OF_FUGITIVE_EMISSION='ACTIVITY_OF_FUGITIVE_EMISSION',
  BIOMASS_ACTIVITY='BIOMASS_ACTIVITY',
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
}
export interface VALIDATION_EQUIPMENT extends EQUIPMENT{
  emissionFactor: number|null,
  emissionFactorDataSource?: string|null,
  reportingFrequencyId: string | null,
  hypotheses?: string,
  adminComment?: string
}

export interface MOBILES {
  reference: string | null,
  userId: string | null,
  typeReference: UNIT | null,
  fuelUsed: UNIT | null,
  performanceReference:UNIT | null ,
  equipmentName: string | null,
  enterpriseId: string|null,
  ownerType: string|null,
  declarationStatus?: string | null,
  brand?:UNIT | null,
  modele?:UNIT | null,
  productionYear?: number|null,
  emissionFactor?: number|null,
  emissionFactorDataSource?: string|null,
  reportingFrequencyId?: string | null,
  hypotheses?: string,
  adminComment?: string
}
export interface ELECTRIC_DTO {
  reference: string | null,
  userId: string | null,
  typeReference: UNIT | null,
  performanceReference:UNIT | null ,
  equipmentName: string | null,
  enterpriseId: string|null,
  ownerType: string|null,
  declarationStatus?: string | null,
  brand?:UNIT | null,
  modele?:UNIT | null,
  emissionFactor?: number|null,
  emissionFactorDataSource?: string|null,
  reportingFrequencyId?: string | null,
  hypotheses?: string,
  adminComment?: string
}

export interface COLD_HEAT_EQUIPMENT_DTO{
  reference: string | null,
  userId: string | null,
  typeReference: UNIT | null,
  performanceReference:UNIT | null ,
  enterpriseId: string|null,
  ownerType: string|null,
  declarationStatus?: string | null,
  brand?:UNIT | null,
  modele?:UNIT | null,
  emissionFactor?: number|null,
  emissionFactorDataSource?: string|null,
  reportingFrequencyId?: string | null,
  hypotheses?: string,
  adminComment?: string
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

export interface ACTIVITY{
    reference: string|null,
    typeOfActivity: UNIT | null,
    unitOfMeasure: UNIT | null,
    userId?: string |null,
    ownerType: string|null,
    equipmentName?: string|null,
    enterpriseId?: string|null,
    declarationStatus?: string|null,
    emissionFactor?: number|null,
    emissionFactorDataSource?: string,
    reportingFrequencyId?: number|null,
    hypotheses?: string,
    adminComment?: string
}

export { STATUS as default }
