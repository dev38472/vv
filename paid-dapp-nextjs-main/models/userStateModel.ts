import UserModel from './userModel'

interface UserStateModel {
  user: UserModel
  loading: boolean
  error: string
}

export default UserStateModel
