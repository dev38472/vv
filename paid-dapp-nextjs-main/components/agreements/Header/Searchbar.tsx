import Image from 'next/image';
import React, { ChangeEvent } from 'react';
import styles from './Searchbar.module.scss';
import searchIcon from './search.svg';

export interface SearchbarProps {
  onSearch(event: ChangeEvent<HTMLInputElement>): void;
}

export function Searchbar(props: SearchbarProps) {
  const { onSearch } = props;

  return (
    <section className={`form-group has-search ${styles.container}`}>
      <div className="search-icon">
        <Image src={searchIcon} width={24} height={24} />
      </div>

      <input
        type="text"
        className="form-control input-white search-input"
        placeholder="Search"
        onChange={onSearch}
      />
    </section>
  );
}
