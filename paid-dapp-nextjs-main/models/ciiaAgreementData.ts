import Invention from "./intentionModel";

interface CiiaAgreementData {
  customTitle: string;
  partyName: string; // Company name
  partyEmail: string; // company data
  partyAddress: string; // company data
  partyWallet: string; // company data
  date: string;
  counterPartyName: string; // Consultant name
  counterPartyEmail: string; // consultant data
  counterPartyAddress: string; // consultant data
  counterPartyWallet: string; // consultant data
  effectiveDate: string;
  companyState: string;
  stateConsultant: string;
  typeOfCompanyConsultant: string;
  title: string;
  datea: string;
  inventions: []
  stateCompany: string;
  typeOfComapny: string;
  listCompAgreements: string;
}

export default CiiaAgreementData;
