import ProfileModel from './profileModel'
import UserModel from './userModel'

interface ProfileStateModel {
  user: UserModel
  profile: ProfileModel
  loading: boolean
  error: string
}

export default ProfileStateModel
