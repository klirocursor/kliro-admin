import { GetUserProfileType } from '@/types/userTypes'
import { createSlice } from '@reduxjs/toolkit'
import {
  getUserProfileThunk,
  updateContactThunk,
  confirmUpdateContactThunk,
  changePasswordThunk,
  changeRegionThunk,
  addContactThunk,
  logoutThunk
} from '@/redux/thunks/userThunk'
import { loginThunk } from '@/redux/thunks/loginThunk'
import { RoleType } from '@/types/authTypes'

export type UserState = {
  user: GetUserProfileType | null
  isAuthed: boolean
  userRoles: RoleType[]
  getMeLoading: boolean
  updateContactLoading: boolean
  confirmUpdateContactLoading: boolean
  changePasswordLoading: boolean
  changeRegionLoading: boolean
  addContactLoading: boolean
}

const initialState: UserState = {
  user: null,
  isAuthed: false,
  userRoles: [],
  getMeLoading: false,
  updateContactLoading: false,
  confirmUpdateContactLoading: false,
  changePasswordLoading: false,
  changeRegionLoading: false,
  addContactLoading: false
}

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      state.isAuthed = true
      state.userRoles = action.payload.roles
    }
  },
  extraReducers: (builder) => {
    // Get user profile
    builder.addCase(getUserProfileThunk.pending, (state) => {
      state.getMeLoading = true
    })
    builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
      state.user = action.payload.result
      state.isAuthed = true
      // Populate userRoles from profile role (backend returns a single role string)
      // Fallback to empty array if role is missing
      const roleFromProfile = action.payload.result?.role
      state.userRoles = roleFromProfile ? [roleFromProfile as RoleType] : []
      state.getMeLoading = false
    })
    builder.addCase(getUserProfileThunk.rejected, (state) => {
      state.getMeLoading = false
    })

    // Update contact
    builder.addCase(updateContactThunk.pending, (state) => {
      state.updateContactLoading = true
    })
    builder.addCase(updateContactThunk.fulfilled, (state) => {
      state.updateContactLoading = false
    })
    builder.addCase(updateContactThunk.rejected, (state) => {
      state.updateContactLoading = false
    })

    // Confirm update contact
    builder.addCase(confirmUpdateContactThunk.pending, (state) => {
      state.confirmUpdateContactLoading = true
    })
    builder.addCase(confirmUpdateContactThunk.fulfilled, (state) => {
      // Refresh user data after successful contact update
      state.confirmUpdateContactLoading = false
    })
    builder.addCase(confirmUpdateContactThunk.rejected, (state) => {
      state.confirmUpdateContactLoading = false
    })

    // Change password
    builder.addCase(changePasswordThunk.pending, (state) => {
      state.changePasswordLoading = true
    })
    builder.addCase(changePasswordThunk.fulfilled, (state) => {
      state.changePasswordLoading = false
    })
    builder.addCase(changePasswordThunk.rejected, (state) => {
      state.changePasswordLoading = false
    })

    // Change region
    builder.addCase(changeRegionThunk.pending, (state) => {
      state.changeRegionLoading = true
    })
    builder.addCase(changeRegionThunk.fulfilled, (state, action) => {
      if (state.user) {
        state.user.region_id = action.meta.arg.region_id
      }
      state.changeRegionLoading = false
    })
    builder.addCase(changeRegionThunk.rejected, (state) => {
      state.changeRegionLoading = false
    })

    // Add contact
    builder.addCase(addContactThunk.pending, (state) => {
      state.addContactLoading = true
    })
    builder.addCase(addContactThunk.fulfilled, (state) => {
      state.addContactLoading = false
    })
    builder.addCase(addContactThunk.rejected, (state) => {
      state.addContactLoading = false
    })

    builder.addCase(loginThunk.fulfilled, (state) => {
      state.isAuthed = true
    })

    // Logout
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.user = null
      state.isAuthed = false
    })
    builder.addCase(logoutThunk.rejected, (state) => {
      // Even if logout API call fails, we should still clear the local state
      state.user = null
      state.isAuthed = false
    })
  }
})

const { actions, reducer } = slice
export const { setUser } = actions
export default reducer
