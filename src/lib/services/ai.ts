import type { AIAnalysis } from '../../types';

/**
 * Mock AI legal analysis function.
 * Returns a pre-built AIAnalysis tailored to keywords in the situation text.
 */
export async function runLegalAnalysis(situation: string): Promise<AIAnalysis> {
  const text = situation.toLowerCase();

  // Detect keywords to tailor the analysis
  const isProperty = /tenant|landlord|rental|ejari|lease|property|deposit/.test(text);
  const isFamily = /divorce|custody|family|marriage| Personal|personal status/.test(text);
  const isEmployment = /employment|job|termination|salary|worker|hr|unfair/.test(text);
  const isCriminal = /crime|police|criminal|arrest|fraud|defense/.test(text);
  const isBusiness = /business setup|company|trademark|incorporat|dific|adgm/.test(text);
  const isInjury = /injury|accident|medical|compensation|hurt/.test(text);

  let analysis: AIAnalysis;

  if (isFamily) {
    analysis = {
      situation_summary: 'Family law matter involving custody or personal status. These cases require sensitive handling under UAE Personal Status Law.',
      service_category: 'family',
      jurisdiction: 'Dubai',
      urgency: 'high',
      mandatory_requirements: [
        'Marriage/divorce certificates',
        'Children birth certificates',
        'Financial documentation',
        'Communication records with spouse'
      ],
      optional_requirements: [
        'School records of children',
        'Medical reports',
        'Witness statements'
      ],
      recommended_steps: [
        'File case at Personal Status Court',
        'Attend mandatory mediation session',
        'Present custody/visitation request',
        'Court evaluation of best interests of children'
      ],
      timeline: {
        best: '4-6 weeks',
        expected: '8-12 weeks',
        worst: '20+ weeks'
      },
      cost_range: {
        gov_fees: { min: 500, max: 1000, currency: 'AED' },
        service_provider: { min: 3000, max: 8000, currency: 'AED' },
        accelerator: { min: 1000, max: 2500, currency: 'AED' }
      },
      risk_complexity: {
        level: 'medium',
        reasoning: 'Family matters are emotionally complex but follow predictable legal patterns.'
      },
      recommended_action: 'Engage a family law specialist fluent in Arabic and English.'
    };
  } else if (isProperty) {
    analysis = {
      situation_summary: 'Property or tenancy dispute requiring RDC intervention. Most tenancy disputes resolve efficiently with proper documentation.',
      service_category: 'property',
      jurisdiction: 'Dubai',
      urgency: 'medium',
      mandatory_requirements: [
        'Tenancy contract',
        'Move-in condition report',
        'Move-out photos',
        'Communication with landlord'
      ],
      optional_requirements: [
        'Maintenance request records',
        'Ejari registration proof',
        'Deposit receipt'
      ],
      recommended_steps: [
        'Attempt written dispute resolution',
        'Send formal demand letter (7-day notice)',
        'If no response, file RDC case',
        'Attend conciliation then judgement'
      ],
      timeline: {
        best: '2-3 weeks',
        expected: '4-6 weeks',
        worst: '8-10 weeks'
      },
      cost_range: {
        gov_fees: { min: 500, max: 500, currency: 'AED' },
        service_provider: { min: 2000, max: 4000, currency: 'AED' },
        accelerator: { min: 500, max: 1000, currency: 'AED' }
      },
      risk_complexity: {
        level: 'medium',
        reasoning: 'Straightforward tenancy dispute with clear legal framework.'
      },
      recommended_action: 'Engage RDC-experienced practitioner in Dubai.'
    };
  } else if (isEmployment) {
    analysis = {
      situation_summary: 'Employment dispute. UAE labor law provides clear protections against arbitrary dismissal and unpaid benefits.',
      service_category: 'employment-issues',
      jurisdiction: 'Dubai',
      urgency: 'medium',
      mandatory_requirements: [
        'Employment contract',
        'Termination letter',
        'WPS records',
        'Communication with HR'
      ],
      optional_requirements: [
        'Performance reviews',
        'Warning letters',
        'Witness statements'
      ],
      recommended_steps: [
        'File MOHRE complaint',
        'Attend mandatory conciliation',
        'If no resolution, escalate to court',
        'Pursue judgment and execution'
      ],
      timeline: {
        best: '2-3 months',
        expected: '4-6 months',
        worst: '9+ months'
      },
      cost_range: {
        gov_fees: { min: 1000, max: 2000, currency: 'AED' },
        service_provider: { min: 3000, max: 6000, currency: 'AED' },
        accelerator: { min: 1000, max: 2000, currency: 'AED' }
      },
      risk_complexity: {
        level: 'medium',
        reasoning: 'Standard labor dispute with established legal framework.'
      },
      recommended_action: 'Engage MOHRE-experienced labor law specialist.'
    };
  } else if (isCriminal) {
    analysis = {
      situation_summary: 'Criminal matter requiring urgent legal representation. Right to counsel is fundamental in UAE criminal proceedings.',
      service_category: 'criminal',
      jurisdiction: 'Dubai',
      urgency: 'critical',
      mandatory_requirements: [
        'Summons/indictment documents',
        'All communications with police',
        'Alibi evidence if available',
        'Witness details'
      ],
      optional_requirements: [
        'Character references',
        'Prior record (if any)',
        'Expert reports required'
      ],
      recommended_steps: [
        'Retain counsel immediately',
        'Exercise right to silence',
        'Request postponement if needed',
        'Prepare comprehensive defense',
        'Attend all hearings with representation'
      ],
      timeline: {
        best: '2-4 weeks',
        expected: '2-4 months',
        worst: '6+ months'
      },
      cost_range: {
        gov_fees: { min: 2000, max: 5000, currency: 'AED' },
        service_provider: { min: 10000, max: 50000, currency: 'AED' },
        accelerator: { min: 3000, max: 10000, currency: 'AED' }
      },
      risk_complexity: {
        level: 'high',
        reasoning: 'Criminal matters carry serious consequences including detention and deportation risk.'
      },
      recommended_action: 'URGENT: Engage criminal defense specialist immediately. Do not attend any interrogation without counsel.'
    };
  } else if (isBusiness) {
    analysis = {
      situation_summary: 'Business setup or corporate advisory matter. Mainland vs free zone choice impacts licensing, ownership, and taxation.',
      service_category: 'business-setup',
      jurisdiction: 'Dubai',
      urgency: 'low',
      mandatory_requirements: [
        'Business activity description',
        'Shareholder details & passport copies',
        'Proposed trade name options',
        'Budget range'
      ],
      optional_requirements: [
        'Market research',
        'Visa requirements',
        'Office requirements',
        'Banking needs'
      ],
      recommended_steps: [
        'Choose jurisdiction (mainland/free zone)',
        'Reserve trade name',
        'Prepare license application',
        'Process visas & bank account',
        'Register for VAT if applicable'
      ],
      timeline: {
        best: '2-3 weeks',
        expected: '4-6 weeks',
        worst: '8+ weeks'
      },
      cost_range: {
        gov_fees: { min: 15000, max: 50000, currency: 'AED' },
        service_provider: { min: 5000, max: 15000, currency: 'AED' },
        accelerator: { min: 2000, max: 5000, currency: 'AED' }
      },
      risk_complexity: {
        level: 'low',
        reasoning: 'Standard business setup with predictable process.'
      },
      recommended_action: 'Engage jurisdiction-specific business setup advisor.'
    };
  } else if (isInjury) {
    analysis = {
      situation_summary: 'Personal injury claim requiring medical documentation and workplace investigation.',
      service_category: 'injury',
      jurisdiction: 'Dubai',
      urgency: 'high',
      mandatory_requirements: [
        'Medical reports',
        'Incident report',
        'Employment contract',
        'Hospital bills'
      ],
      optional_requirements: [
        'Site photos',
        'Witness statements',
        'Workplace safety records',
        'Prior incident reports at same workplace'
      ],
      recommended_steps: [
        'Document all medical treatment',
        'File MOHRE claim',
        'Preserve all evidence',
        'Calculate total damages',
        'Settle or litigate'
      ],
      timeline: {
        best: '2-3 months',
        expected: '4-6 months',
        worst: '12+ months'
      },
      cost_range: {
        gov_fees: { min: 1000, max: 2000, currency: 'AED' },
        service_provider: { min: 3000, max: 7000, currency: 'AED' },
        accelerator: { min: 1000, max: 2500, currency: 'AED' }
      },
      risk_complexity: {
        level: 'high',
        reasoning: 'Injury cases require proving employer negligence and calculating comprehensive damages.'
      },
      recommended_action: 'Engage workplace injury specialist immediately. Preserve all evidence.'
    };
  } else {
    // Generic fallback analysis
    analysis = {
      situation_summary: 'General legal matter requiring consultation with a qualified UAE legal professional.',
      service_category: 'corporate',
      jurisdiction: 'Dubai',
      urgency: 'medium',
      mandatory_requirements: [
        'Relevant documents',
        'Contract or correspondence',
        'Timeline of events'
      ],
      optional_requirements: [
        'Witness information',
        'Prior legal opinions',
        'Expert reports if any'
      ],
      recommended_steps: [
        'Gather all documentation',
        'Consult with qualified lawyer',
        'Explore dispute resolution options',
        'Pursue negotiated settlement if possible',
        'Litigate only if necessary'
      ],
      timeline: {
        best: '2-4 weeks',
        expected: '2-3 months',
        worst: '6+ months'
      },
      cost_range: {
        gov_fees: { min: 500, max: 2000, currency: 'AED' },
        service_provider: { min: 2000, max: 8000, currency: 'AED' },
        accelerator: { min: 500, max: 2000, currency: 'AED' }
      },
      risk_complexity: {
        level: 'medium',
        reasoning: 'Case complexity depends on documentation quality and opposing party cooperation.'
      },
      recommended_action: 'Engage a qualified lawyer specializing in the relevant practice area.'
    };
  }

  return analysis;
}
