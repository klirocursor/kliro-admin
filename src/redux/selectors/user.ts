import { RootState } from '@/redux/store'

export const getUserState = (state: RootState) => state.user

export const getMe = (state: RootState) => state.user.user

export const getIsAuthenticated = (state: RootState) => state.user.isAuthed

export const getUserRoles = (state: RootState) => state.user.userRoles

// Loading state selectors
export const getUpdateContactLoading = (state: RootState) => state.user.updateContactLoading
export const getConfirmUpdateContactLoading = (state: RootState) => state.user.confirmUpdateContactLoading
export const getChangePasswordLoading = (state: RootState) => state.user.changePasswordLoading
export const getChangeRegionLoading = (state: RootState) => state.user.changeRegionLoading
export const getAddContactLoading = (state: RootState) => state.user.addContactLoading
