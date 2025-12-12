// Learning Diagram Components Index
// Animated SVG diagrams for sustainability education

export { WaterCycleDiagram } from './WaterCycleDiagram'
export { SolarEnergyDiagram } from './SolarEnergyDiagram'
export { SoilLayersDiagram } from './SoilLayersDiagram'
export { CompostingProcessDiagram } from './CompostingProcessDiagram'
export { FoodWebDiagram } from './FoodWebDiagram'
export { PassiveSolarDiagram } from './PassiveSolarDiagram'
export { WasteHierarchyPyramid } from './WasteHierarchyPyramid'
export { PhotosynthesisDiagram } from './PhotosynthesisDiagram'
export { CarbonCycleDiagram } from './CarbonCycleDiagram'
export { EnergyFlowDiagram } from './EnergyFlowDiagram'
export { RainwaterHarvestingDiagram } from './RainwaterHarvestingDiagram'
export { ThermalMassDiagram } from './ThermalMassDiagram'

// Diagram type registry for dynamic rendering
export const DIAGRAM_COMPONENTS = {
  'water-cycle': 'WaterCycleDiagram',
  'solar-energy': 'SolarEnergyDiagram',
  'soil-layers': 'SoilLayersDiagram',
  'composting-process': 'CompostingProcessDiagram',
  'food-web': 'FoodWebDiagram',
  'passive-solar': 'PassiveSolarDiagram',
  'waste-hierarchy': 'WasteHierarchyPyramid',
  'photosynthesis': 'PhotosynthesisDiagram',
  'carbon-cycle': 'CarbonCycleDiagram',
  'energy-flow': 'EnergyFlowDiagram',
  'rainwater-harvesting': 'RainwaterHarvestingDiagram',
  'thermal-mass': 'ThermalMassDiagram',
} as const

export type DiagramType = keyof typeof DIAGRAM_COMPONENTS
