import { combineReducers } from '@reduxjs/toolkit'
import projectsReducer from './projectsSlice'

const rootReducer = combineReducers({
    projects: projectsReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer