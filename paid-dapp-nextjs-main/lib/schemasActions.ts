import { gql } from '@apollo/client'
import {
  AgreementAnchoredInput,
  AgreementSignedInput,
  CreateProfileInput,
  WalletAddressInput,
} from './dtos/index'

export type MutationsInputs =
  | AgreementAnchoredInput
  | AgreementSignedInput
  | CreateProfileInput
  | WalletAddressInput

const QUERY_GET_DATA_USER = gql`
  query GetDataUser {
    me {
      email
      did
      lastLoginAt
      profile {
        firstName
        lastName
        streetAddress
        profileName
      }
      walletAddresses {
        address
        network
      }
      createdAt
      updatedAt
    }
  }
`

const MUTATION_AGREEMENT_ANCHORED = gql`
  mutation AgreementAnchored($input: AgreementAnchoredInput!) {
    agreementAnchored(input: $input)
  }
`

const MUTATION_AGREEMENT_SIGNED = gql`
  mutation AgreementSigned($input: AgreementSignedInput!) {
    agreementSigned(input: $input)
  }
`

const MUTATION_PROFILE = gql`
  mutation CreateProfile($input: CreateProfileInput!) {
    createProfile(input: $input) {
      email
      did
      lastLoginAt
      profile {
        firstName
        lastName
        streetAddress
        profileName
      }
      walletAddresses {
        address
        network
      }
      createdAt
      updatedAt
    }
  }
`

const MUTATION_WALLET = gql`
  mutation RegisterWallet($input: WalletAddressInput!) {
    registerWallet(input: $input) {
      email
      did
      lastLoginAt
      profile {
        firstName
        lastName
        streetAddress
        profileName
      }
      walletAddresses {
        address
        network
      }
      createdAt
      updatedAt
    }
  }
`

export {
  MUTATION_AGREEMENT_ANCHORED,
  MUTATION_AGREEMENT_SIGNED,
  MUTATION_PROFILE,
  MUTATION_WALLET,
  QUERY_GET_DATA_USER,
}
