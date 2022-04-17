import Form, { AjvError, FormValidation, IChangeEvent, UiSchema } from '@rjsf/core';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { Progress } from 'reactstrap';
import { CustomFieldTemplate } from './CustomFieldTemplate';
import { NewInventionModal } from './newInventionModal';
import styles from './PdJsonSchemaForm.module.scss';

enum ErrorPropertyType {
  PARTY_EMAIL = '.partyEmail',
  COUNTER_PARTY_EMAIL = '.counterPartyEmail',
  PARTY_WALLET = '.partyWallet',
  COUNTER_PARTY_WALLET = '.counterPartyWallet',
}

interface pdJsonSchemaFormProps {
  type?: string;
  dataName: string;
  title: string;
  jsonSchemas: Array<Object>;
  uiSchema?: UiSchema;
  onChange(event: IChangeEvent<any>): void;
  activePageIndex: number,
  setActivePageIndex(newPage: number): void,
  onSubmit(): void;
}

export const PdJsonSchemaForm: FC<pdJsonSchemaFormProps> = ({
  dataName,
  title,
  jsonSchemas,
  uiSchema,
  onChange,
  activePageIndex,
  setActivePageIndex,
  onSubmit
}) => {
  const smartAgreementsState = useSelector(
    (state: { smartAgreementsReducer: any }) => state.smartAgreementsReducer,
  );

  const widgets = {};

  const goPrevPage = () => {
    setActivePageIndex(Math.max(activePageIndex - 1, 0));
  };

  const transformErrors = (errors: AjvError[]) => errors.map((error: AjvError) => {
    if ([ErrorPropertyType.PARTY_EMAIL, ErrorPropertyType.COUNTER_PARTY_EMAIL].some(errorProperty => errorProperty === error.property)) {
      error.message = 'Invalid email';
    }

    if ([ErrorPropertyType.PARTY_WALLET, ErrorPropertyType.COUNTER_PARTY_WALLET].some(errorProperty => errorProperty === error.property)) {
      error.message = 'Invalid Wallet Address';
    }

    return error;
  });

  const currentPageSchema = jsonSchemas[activePageIndex];
  const stepDescription = `Step ${activePageIndex + 1} of ${jsonSchemas.length}: ${currentPageSchema["title"]}`;
  const [openNewInventionModal, setOpenNewInventionModal] = useState(false);
  const [isEdit, setEdit] = useState(false)
  const [index, setIndex] = useState(0)
  const [inventions, setInventions] = smartAgreementsState[dataName].inventions ? useState(smartAgreementsState[dataName].inventions) : useState([]);
  const invention = { idNumberBriefDesc: '', titleService: '', dateEfectiveService: '' }
  const [errors, setErrors] = useState<string[]>([]);

  const onAddInvention = (data) => {
    smartAgreementsState[dataName].inventions.push(data.formData)
    setInventions(smartAgreementsState[dataName].inventions)
    onChange(smartAgreementsState[dataName])
  }

  const onSetEditInvention = (inventionIndex: number) => {
    setIndex(inventionIndex)
    setEdit(true)
    setOpenNewInventionModal(true)
  }

  const onEditInvention = (data) => {
    smartAgreementsState[dataName].inventions[index] = data.formData
    setInventions(smartAgreementsState[dataName].inventions)
    onChange(smartAgreementsState[dataName])
    onCloseInventionModal()
  }

  const onDeleteInvention = (index: number) => {
    smartAgreementsState[dataName].inventions.splice(index, 1)

    let tmpArray =  smartAgreementsState[dataName].inventions
    setInventions(tmpArray)
    onChange(smartAgreementsState[dataName])
  }

  const onInventionNext = () => {
    smartAgreementsState[dataName].inventions = inventions
    onSubmit()
  }

  const onCloseInventionModal = () => {
    setEdit(false)
    setOpenNewInventionModal(false)
  }

  const checkDate = (date: string): Boolean => {
    const dateComponents: string[] = date.split('-')
    const now = new Date();
    const minDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const dateToCheck = new Date(parseInt(dateComponents[0]), parseInt(dateComponents[1])-1, parseInt(dateComponents[2]));

    return dateToCheck.getTime() >= minDate.getTime();
  }

  const formValidation = (formData: any, errors: FormValidation) => {
    if (!checkDate(formData.date)) {
      errors.date.addError('Date must be today or a future date.')
    }

    return errors;
  }

  return (
    <div className={styles.container}>
      <header>{title}</header>

      <Progress
        value={activePageIndex + 1}
        max={jsonSchemas.length}
      />

      <article>{stepDescription}</article>

      <span className={styles.subTitle}>{jsonSchemas[activePageIndex]['subTitle']}</span>

      {(dataName === 'ciiaAgreementData' && activePageIndex === 3) ? inventions.map((item, i) => 
        <div className={styles.inventionRow} key={`${i}-container`}>
          <span className={styles.inventionTitle} key={`${i}-title`}>{item.titleService}</span>
          <img className={styles.edit} onClick={() => {onSetEditInvention(i)}} src="/assets/images/edit-icon.png" alt="" key={`${i}-edit`}/>
          <img className={styles.delete} onClick={() => {onDeleteInvention(i)}} src="/assets/images/delete-icon.png" alt="" key={`${i}-delete`}/>
        </div>  
      ) : ('')}

      {(dataName === 'ciiaAgreementData' && activePageIndex === 3) ? (
        <div className={styles.inventionsActionContainer}>
          <div className={styles.addInventionContainer}>
            <button className={`${styles.buttonAddNew}`} onClick={() => {setOpenNewInventionModal(true)}}>+ Add new</button>
          </div>

          <button className={`btn ${styles.btnNext} ${styles.addBtn}`} onClick={onInventionNext}>Next</button>

          <NewInventionModal 
            open={openNewInventionModal}
            currentPageSchema={currentPageSchema}
            uiSchema={uiSchema}
            widgets={widgets}
            transformErrors={transformErrors}
            fieldTemplate={CustomFieldTemplate}
            onCloseModal={() => { onCloseInventionModal() }}
            onSubmit={(formData) => { isEdit ? onEditInvention(formData) : onAddInvention(formData) }}
            formData={isEdit ? inventions[index] : invention}
            isEditing={isEdit}
          ></NewInventionModal>
        </div>
      ) : (
        <Form
          schema={currentPageSchema}
          uiSchema={uiSchema}
          widgets={widgets}
          formData={smartAgreementsState[dataName]}
          onSubmit={onSubmit}
          onChange={onChange}
          showErrorList={false}
          transformErrors={transformErrors}
          FieldTemplate={CustomFieldTemplate}
          validate={formValidation}
        >
          <button className={styles.buttonPrimary}>
            {activePageIndex < jsonSchemas.length - 1 ? 'Next' : 'Review'}
          </button>
        </Form>
      )}

      {activePageIndex > 0 && (
        <button
          className={styles.buttonSecondary}
          onClick={goPrevPage}
        >
          <span>Back</span>
        </button>
      )}
    </div>
  );
};
