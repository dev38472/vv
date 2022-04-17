export interface Profile {
  firstName: string
  lastName: string
  streetAddress: string
  profileName: string
}

export interface CreateProfileInput extends Profile {}
