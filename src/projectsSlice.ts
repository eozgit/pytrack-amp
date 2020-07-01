import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from './store'
import Project from './Project'
import { getProjects, postProject, deleteProject } from './api'

interface StateShape {
    list: Project[],
    idToDelete: number
}

const initialState: StateShape = { list: [], idToDelete: -1 }

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProjects(state, action: PayloadAction<Project[]>) {
            state.list = action.payload
        },
        setIdToDelete(state, action: PayloadAction<number>) {
            state.idToDelete = action.payload
        }
    }
})

export const { setProjects, setIdToDelete } = projectsSlice.actions

export default projectsSlice.reducer

export const resetPage = (): AppThunk => async dispatch => {
    dispatch(loadProjects())
    dispatch(setIdToDelete(-1))
}

export const loadProjects = (): AppThunk => async dispatch => {
    let projects: Project[] = []
    try {
        const response = await getProjects()
        projects = await response.json()
    } catch (err) {
        console.error(err)
    }
    dispatch(setProjects(projects))
}

export const createProject = (project: Project): AppThunk => async dispatch => {
    try {
        await postProject(project)
    } catch (err) {
        console.error(err)
    }
    dispatch(resetPage())
}

export const removeProject = (id: number): AppThunk => async dispatch => {
    try {
        await deleteProject(id)
    } catch (err) {
        console.error(err)
    }
    dispatch(resetPage())
}