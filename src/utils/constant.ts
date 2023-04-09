export const CATEGORY_LIST = {
  BIOMASS_ACTIVITY: 'BIOMASS_ACTIVITY',
  ACTIVITY_OF_FUGITIVE_EMISSION: 'ACTIVITY_OF_FUGITIVE_EMISSION',
  COLD_AND_HEAT_EQUIPMENT: 'COLD_AND_HEAT_EQUIPMENT',
  ELECTRICAL_EQUIPMENT: 'ELECTRICAL_EQUIPMENT',
  FIXED_EQUIPMENT: 'FIXED_EQUIPMENT',
  INDUSTRIAL_ACTIVITY: 'INDUSTRIAL_ACTIVITY',
  MOBILE_EQUIPMENT: 'MOBILE_EQUIPMENT',
  BUILDING: 'BUILDING'
}
export const CATEGORY_LABELS = {
  BUILDING: 'Bâtiments',
  FIXED_EQUIPMENT: 'Équipements Fixes',
  MOBILE_EQUIPMENT: 'Équipements Mobiles',
  INDUSTRIAL_ACTIVITY: 'Activités Industrielles Émettrices de GES',
  ACTIVITY_OF_FUGITIVE_EMISSION: 'Activités Émettrices des Emissions Fugitives',
  BIOMASS_ACTIVITY: 'Activités Liées à la Biomasse',
  ELECTRICAL_EQUIPMENT: 'Équipements Électriques',
  COLD_AND_HEAT_EQUIPMENT: 'Équipements Froid Chaleur'
}

export const columnsPage1 = [
  { title: "Référence", key: "reference" },
  { title: "Nom du site", key: "nameOfTheSite" },
  { title: "Superficie", key: "area" },
];
export const columnsPage2 = [
  { title: "Référence", key: "reference" },
  { title: "Type", key: "type" },
  { title: "Combustible", key: "fuelUsed" },
  { title: "Performance", key: "equipmentPerformance" },
  {title:"Unité", key:"measureUnit"},
  { title: "Site", key: "nameOfTheSite" },
  
  { title: "Propriétaire", key: "userId" },
  { title: "Nom d'équipement", key: "equipmentName" },
  {title:"Type de propriété" , key:"ownerType"},
  // { title: "Propriétaire", key: "owner" },
];
export const columnsPage3 = [
  { title: "Référence", key: "reference" },
  { title: "Type", key: "type" },
  { title: "Marque", key: "brand" },
  { title: "Modèle", key: "model" },
  {title:"Année de production" , key:"productionYear"},
  { title: "Combustible", key: "fuelUsed" },
  { title: "Performance", key: "equipmentPerformance" },
  {title:"Unité", key:"measureUnit"},
  
  // { title: "Emplacement", key: "location" },
  // { title: "Déclarant", key: "author" },
  { title: "Nom d'équipement", key: "equipmentName" },
  { title: "Propriétaire", key: "userId" },
  {title:"Type de propriété" , key:"ownerType"},
];
export const columnsPage4 = [
  { title: "Référence", key: "reference" },
  { title: "Type D'activité", key: "type" },
  { title: "Unité", key: "measurment" },
  { title: "Déclarant", key: "userId" },
];
export const columnsPage5 = [
  { title: "Référence", key: "reference" },
  { title: "Type d'activité", key: "type" },
  { title: "Unité", key: "measurment" },
  { title: "Déclarant", key: "userId" },
];
export const columnsPage6 = [
  { title: "Référence", key: "reference" },
  { title: "Type d'activité", key: "type" },
  { title: "Unité", key: "measurment" },
  { title: "Déclarant", key: "userId" },
];
export const columnsPage7 = [
  { title: "Référence", key: "reference" },
  { title: "Type", key: "type" },
  { title: "Marque", key: "brand" },
  { title: "Modèle", key: "model" },
  { title: "Performance", key: "equipmentPerformance" },
  {title:"Unité", key:"measureUnit"},
  {title:"Type de propriété" , key:"ownerType"},
  // { title: "Déclarant", key: "author" },
  { title: "Nom d'équipement", key: "equipmentName" },
  { title: "Déclarant", key: "userId" },
];
export const columnsPage8 = [
  { title: "Référence", key: "reference" },
  { title: "Type", key: "type" },
  { title: "Marque", key: "brand" },
  { title: "Modèle", key: "model" },
  { title: "Performance", key: "equipmentPerformance" },
  {title:"Unité", key:"measureUnit"},
  {title:"Type de propriété" , key:"ownerType"},
  { title: "Déclarant", key: "userId" },
  // { title: "Propriétaire", key: "userId" },
];

export const validationColumns = [
  {title:"Catégorie",key:"category"},
  { title: "Référence", key: "reference" },
  {title:"Type" , key:"type"},
  { title: "Marque", key: "brand" },
  { title: "Modèle", key: "model" },
  { title: "Performance", key: "equipmentPerformanceValue" },
  {title:"Unité", key:"equipmentPerformanceUnit"},
  { title: "Type d'activité", key: "type" },
  // { title: "Unité Pour l'activité", key: "measurment" },
  {title:"Type de propriété" , key:"ownerType"},
  { title: "Déclarant", key: "userId" },
  // { title: "Type d'activité", key: "activitype" },
  { title: "Nom d'équipement", key: "equipmentName" },
  {title:"Année de production" , key:"productionYear"},
  { title: "Combustible", key: "fuelUsed" },
  {title:"Hypothèse",key:"hypotheses"},
  {title:"Source de données",key:"emissionFactorDataSource"},
  {title:"Facteur d'emission", key:"emissionFactor"},
  {title:"Commentaires", key:"adminComment"}
]
const DECLARATION_STATUS = {
  ALL: "ALL",
  DRAFT: "DRAFT",
  PENDING: "PENDING",
  VALIDATED: "VALIDATED",
};


export const OWNER_TYPE = {
  OWNER:"OWNER", 
  TENANT:"TENANT"
}
export const OWNER_TYPE_LABEL = {
  OWNER:"PROPRIÉTAIRE", 
  TENANT:"LOCATAIRE"
}


export { DECLARATION_STATUS as default }

