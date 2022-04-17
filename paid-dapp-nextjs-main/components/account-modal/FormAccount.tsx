import React, { FC, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import classNames from 'classnames';
import StackedInput from '../reusable/StackedInput';
import ProfileModel from '../../models/profileModel';
import { useSelector } from 'react-redux';

interface FormAccountProps {
  setProfile: any;
}

const FormAccount: FC<FormAccountProps> = ({
  setProfile
}: FormAccountProps) => {
  const {
    register, errors, handleSubmit, watch,
  } = useForm();

  const profileReducer = useSelector(
    (state: any) => state.profileReducer,
  );

  const readOnly = true

  const onSubmit = (values: ProfileModel) => {
    setProfile(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <StackedInput
          label="First Name"
          name="firstName"
          type="text"
          groupClassNames={classNames('col-sm-12 col-md-6')}
          placeholder="Enter your first name"
          inputClassNames={classNames({ 'is-invalid': errors.firstName })}
          innerRef={register({
            required: 'First name is required',
          })}
          errorComponent={(
            <ErrorMessage
              className="error-message"
              name="name"
              as="div"
              errors={errors}
            />
          )}
        />
        <StackedInput
          label="Last Name"
          name="lastName"
          type="text"
          groupClassNames={classNames('col-sm-12 col-md-6')}
          placeholder="Enter your last name"
          inputClassNames={classNames({ 'is-invalid': errors.lastName })}
          innerRef={register({
            required: 'Last name is required',
          })}
          errorComponent={(
            <ErrorMessage
              className="error-message"
              name="lastName"
              as="div"
              errors={errors}
            />
          )}
        />
      </div>
      <StackedInput
        label="Email"
        name="email"
        type="text"
        placeholder="Enter your Email"
        readOnly={readOnly}
        value={profileReducer.user ? profileReducer.user.email : ''}
        inputClassNames={classNames({ 'is-invalid': errors.email })}
        innerRef={register({
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email',
          },
        })}
        errorComponent={(
          <ErrorMessage
            className="error-message"
            name="email"
            as="div"
            errors={errors}
          />
        )}
      />

      <StackedInput
        label="Address"
        name="streetAddress"
        type="text"
        placeholder="Enter your address"
        inputClassNames={classNames({ 'is-invalid': errors.streetAddress })}
        innerRef={register({
          required: 'Address is required',
        })}
        errorComponent={(
          <ErrorMessage
            className="error-message"
            name="streetAddress"
            as="div"
            errors={errors}
          />
        )}
      />
      <div className="pt-3 text-center">
        <button className="btn btn-danger w-100" type="submit">
          Save and Continue
        </button>
      </div>
    </form>
  );
};

export default FormAccount;
