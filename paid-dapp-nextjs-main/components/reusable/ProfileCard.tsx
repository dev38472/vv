import React, { FC } from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import ProfileModel from '../../models/profileModel';
import styles from './ProfileCard.module.scss'

type ProfileCardProps = {
  /** profile information */
  profile: ProfileModel;
  selected: boolean;
  open: boolean;
  onClick(event: any): void
};

const ProfileCard: FC<ProfileCardProps> = ({
  profile,
  selected,
  open,
  onClick,
}) => {
  const isOpen = useSelector((state: any) => state.menuReducer.isOpen);

  const getProfileInitials = () => {
    let initials = '';
    initials += profile !== null && profile.firstName ? profile.firstName.charAt(0) : '';
    initials += profile !== null && profile.lastName ? profile.lastName.charAt(0) : '';
    return initials;
  };

  return (
    <div className={`profile-container ${selected ? 'selected' : ''} ${isOpen ? '' : 'collapsed'}`}>
      <div className={`profile-component ${selected ? 'selected' : ''} ${isOpen ? '' : 'collapsed'}`} onClick={(event) => { onClick(event) }}>
        <div className={`profile-image ${selected ? 'selected' : ''}`}>
          <span>{getProfileInitials()}</span>
        </div>
        <div className="info">
          {isOpen && (
            <span className="name d-block">
              {profile ? `${profile?.firstName} ${profile?.lastName}` : 'No data yet' }
            </span>
          )}
          <button type="button" className={`btn-details  ${open ? styles.selected : ''}`}>
            <img src={`/assets/icon/${open ? 'profileArrowUp_selected.svg' : 'profileArrowUp.svg'}`} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

ProfileCard.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.string,
  }),
};

ProfileCard.defaultProps = {
  profile: null,
};

export default ProfileCard;
