import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ProfileModel from '@/models/profileModel';
import ProfileCard from '../reusable/ProfileCard';
import styles from './ProfileMenu.module.scss'

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(-2),
    minWidth: 217,
    color:
      theme.palette.mode === 'light' ? 'rgb(255, 255, 255)' : theme.palette.grey[300],
    background: '#34286C',
    boxShadow:
      '0px 20px 40px rgba(0, 0, 0, 0.25)',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      fontFamily: 'Circular Std',
      fontSize: 15,
      margin: theme.spacing(1),
      '&:active': {
        backgroundColor: 'rgba(255, 255, 255, .25)',
      },
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, .25)',
        borderRadius: 6
      },
    },
  },
}));

type ProfileMenuProps = {
  profile: ProfileModel;
  selected: boolean;
  onEditSelected(route: string): void,
  onLogout(): void
}

export default function ProfileMenu({
  profile,
  selected,
  onEditSelected,
  onLogout,
}: ProfileMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <ProfileCard profile={profile} selected={selected} open={open} onClick={ handleClick } />
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => {
          onEditSelected('/profile')
          handleClose
        }} disableRipple>
          <img src='/assets/icon/edit.png' />
          <span className={styles.menuText}>Edit Profile</span>
        </MenuItem>
        <MenuItem onClick={() => {
          onLogout()
          handleClose
        }} disableRipple>
          <img src='/assets/icon/logout.png' />
          <span className={styles.menuText}>Log out</span>
        </MenuItem>
      </StyledMenu>
    </div>
  );
}