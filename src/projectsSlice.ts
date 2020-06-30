import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from './store'
import Project from './Project'
import { loadProjects } from './api'

const initialState: { list: Project[] } = { list: [] }

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProjects(state, action: PayloadAction<Project[]>) {
            state.list = action.payload
        }
    }
})

export const { setProjects } = projectsSlice.actions

export default projectsSlice.reducer

export const fetchProjects = (): AppThunk => async dispatch => {
    let projects: Project[] = []
    try {
        const response = await loadProjects
        projects = await response.json()
    } catch (err) {
        console.error(err)
    }
    dispatch(setProjects(projects))
}