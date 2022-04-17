import React from 'react';
import ProfileModel from '@/models/profileModel';
import { useSelector } from 'react-redux';
import { NewAgreementButton } from '@/components/agreements/NewAgreementButton';
import { Searchbar } from './Searchbar';
import styles from './Header.module.scss';

export interface HeaderProps {
  showNewAgreementButton: boolean;
  onSearch(e: any): void;
  onNewAgreementClick(): void;
}

export function Header({
  onNewAgreementClick,
  onSearch,
  showNewAgreementButton,
}: HeaderProps) {
  const profile: ProfileModel = useSelector(
    (state: any) => state.profileReducer.profile,
  );

  const name = profile?.firstName || profile?.profileName || '';

  return (
    <div className={styles.container}>
      <header>
        <div className={styles.subtitle}>Welcome,</div>
        <div className={styles.title}>{name}</div>
      </header>

      {showNewAgreementButton && (
        <div className={styles.button}>
          <NewAgreementButton onNewAgreementClick={onNewAgreementClick} />
        </div>
      )}

      <div className={styles.search}>
        <Searchbar onSearch={onSearch} />
      </div>
    </div>
  );
}
