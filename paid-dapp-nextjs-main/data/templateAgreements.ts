import TemplateAgreementModel from '../models/templateAgreementModel';

const templateAgreements: TemplateAgreementModel[] = [
  {
    code: '001',
    name: 'Mutual NDA',
    description:
      'The Mutual NDA agreement requires both parties that sign the agreement to not disclose any information protected by the agreement. It essentially creates a confidential relationship between the two parties, and they are linked by the information that they share and the information listed in the agreement. It is often used to keep information, such as trade secrets or proprietary information, secret and confidential.',
  },
  {
    code: '003',
    name: 'Consulting',
    description:
      'A consulting agreement is a contractual document that describes a working relationship between a business and a consultant providing that company with their services',
  },
  {
    code: '004',
    name: 'Referral',
    description:
      'A referral agreement is a formal contract between a seller and a referrer to capture the terms and conditions of how referral sales are measured, paid, and coordinated.',
  },
  {
    code: '005',
    name: 'SAFT',
    description:
      'A simple agreement for future tokens, commonly referred to as the SAFT, it is a contractual investment agreement that involves the agreement of the authorized investors to finance the crypto developers’ projects in exchange for discounted crypto tokens at a future date.',
  },
  {
    code: '006',
    name: 'Advisor Agreement',
    description:
      'An advisory agreement is between a company and its advisor. The agreement sets forth the expectation of the relationship - like work to be performed on behalf of the advisor and compensation. The agreement also sets forth certain key terms like confidentiality and assignment of work.',
  },
  {
    code: '002',
    name: 'CIIA Agreement',
    description:
      'A confidentiality and invention assignment agreement is typically signed by all founders and employees of company. The agreement creates a confidential relationship between the parties to protect any type of confidential and proprietary information and assigns all relevant work product to the company during the signors employment with the company.',
  },
  /* {
    code: '006',
    name: 'Loan agreement',
    description: 'A loan agreement is a binding contract between a borrower and a lender that formalizes the loan process and details the terms and schedule associated with repayment.',
  },
  {
    code: '007',
    name: 'Bet agreement',
    description: 'A bet agreement is a contract by which two or more parties agree that a certain sum of money, or other thing, shall be paid or delivered to one of them, on the happening or not happening of an uncertain event',
  }, */
];

export default templateAgreements;
