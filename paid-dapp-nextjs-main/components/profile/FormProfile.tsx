import React, {
    FC, useEffect, useRef, useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import classNames from 'classnames';
import StackedInput from '../reusable/StackedInput';
import ProfileModel from '../../models/profileModel';
import PdAlert from '../reusable/pdAlert';
import ExportWalletModal from '../export-wallet/ExportWalletModal';
import { Button } from 'reactstrap';

interface FormProfileProps {
    profile: ProfileModel;
    emptyProfile: boolean;
    onSubmit: any;
}

const FormProfile: FC<FormProfileProps> = ({
    profile,
    emptyProfile,
    onSubmit,
}: FormProfileProps) => {
    const [openExportModal, setOpenExportModal] = useState(false);
    const [openEditAction, setEditAction] = useState(false);

    const onOpenExportModal = () => {
        setOpenExportModal(true);
    };

    const onCopy = (): void => {
    };

    const {
        register, errors, handleSubmit, watch, reset,
    } = useForm<ProfileModel>({
        defaultValues: {
            ...profile,
        },
    });

    useEffect(() => {
        reset({
            firstName: profile.firstName,
            email: profile.email,
            lastName: profile.lastName,
            streetAddress: profile.streetAddress,
        });
    }, [profile]);
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <StackedInput
                        label="Email:"
                        name="email"
                        type="text"
                        disabled={!openEditAction}
                        groupClassNames={classNames('col-sm-12 col-md-12')}
                        placeholder="Enter your Email"
                        inputClassNames={classNames({ 'is-invalid': errors.email })}
                        innerRef={register({
                            required: 'Email is required',
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
                </div>
                <div className="row">
                    <StackedInput
                        label="Name:"
                        name="firstName"
                        type="text"
                        disabled={!openEditAction}
                        groupClassNames={classNames('col-sm-12 col-md-6')}
                        placeholder="Enter Your Name"
                        inputClassNames={classNames({ 'is-invalid': errors.firstName })}
                        innerRef={register({
                            required: 'First name is required',
                        })}
                        errorComponent={(
                            <ErrorMessage
                                className="error-message"
                                name="firstName"
                                as="div"
                                errors={errors}
                            />
                        )}
                    />
                    <StackedInput
                        label="Last name:"
                        name="lastName"
                        type="text"
                        disabled={!openEditAction}
                        groupClassNames={classNames('col-sm-12 col-md-6')}
                        placeholder="Doe"
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
                <div className="row">
                    <StackedInput
                        label="Legal Address:"
                        name="streetAddress"
                        type="text"
                        disabled={!openEditAction}
                        groupClassNames={classNames('col-sm-12 col-md-12')}
                        placeholder="Enter you Legal Address"
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
                </div>
                {!emptyProfile && (
                    <>
                        <StackedInput
                            label="DID:"
                            readOnly
                            name="did"
                            type="text"
                            value={profile.did}
                        />
                        <StackedInput
                            readOnly
                            label="Created: "
                            name="createdAt"
                            type="text"
                            value={profile.createdAt}
                        />
                    </>
                )}

                {emptyProfile && (
                    <PdAlert
                        className="my-5"
                        color="danger"
                        message="For create your DID, We need to create a DID wallet for you, are you agree?"
                    />
                )}
                <div className="d-flex justify-content-end">

                    {!openEditAction ? (
                        <>
                            <Button className="btn-sm button-primary" onClick={() => setEditAction(true)}>
                                Edit Profile
                            </Button>
                        </>
                    ) : (
                        <>
                            <button className="btn-sm button-secondary" onClick={() => setEditAction(false)}>
                                Cancel
                            </button>

                            <button className="btn-sm button-primary" onSubmit={() => setEditAction(false)}>
                                Save
                            </button>
                        </>
                    )}

                </div>
            </form>
            <ExportWalletModal
                open={openExportModal}
                onCopy={onCopy}
                onClose={() => setOpenExportModal(false)}
            />
        </>
    );
};

export default FormProfile;
