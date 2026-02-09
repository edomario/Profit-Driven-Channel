import { questions } from './questions';
import { library } from './library';
import { actions } from './actions';
import {
  ASSEMBLY_CLIFFHANGER_STARTERS,
  ASSEMBLY_COST_FRAMING_STYLES,
  ASSEMBLY_SIGNAL_INTELLIGENCE,
  buildAssemblyCostNarrative,
  buildAssemblyEvidencePrompt,
  buildAssemblySymptom,
  getAssemblySignalIntel
} from './signalIntelligence';
import { deriveAssemblyAutoTags } from './tagRules';

export const ASSEMBLY_PACK = {
  questions,
  library,
  actions
};

export {
  ASSEMBLY_SIGNAL_INTELLIGENCE,
  ASSEMBLY_COST_FRAMING_STYLES,
  ASSEMBLY_CLIFFHANGER_STARTERS,
  getAssemblySignalIntel,
  buildAssemblySymptom,
  buildAssemblyCostNarrative,
  buildAssemblyEvidencePrompt,
  deriveAssemblyAutoTags
};
