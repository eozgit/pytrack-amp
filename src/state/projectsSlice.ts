import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from './store'
import Project from '../model/Project'
import { getProjects, postProject, deleteProject, patchProject } from '../api/client'

interface StateShape {
    list: Project[],
    idToDelete: number,
    idToEdit: number,
    idForBoard: number
}

const initialState: StateShape = { list: [], idToDelete: -1, idToEdit: -1, idForBoard: -1 }

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProjects(state, action: PayloadAction<Project[]>) {
            state.list = action.payload
        },
        setIdToDelete(state, action: PayloadAction<number>) {
            state.idToDelete = action.payload
        },
        setIdToEdit(state, action: PayloadAction<number>) {
            state.idToEdit = action.payload
        },
        setIdForBoard(state, action: PayloadAction<number>) {
            state.idForBoard = action.payload
        }
    }
})

export const { setProjects, setIdToDelete, setIdToEdit, setIdForBoard } = projectsSlice.actions

export default projectsSlice.reducer

export const resetPage = (): AppThunk => async dispatch => {
    dispatch(loadProjects())
    dispatch(setIdToDelete(-1))
    dispatch(setIdToEdit(-1))
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

export const updateProject = (id: number, project: Project): AppThunk => async dispatch => {
    try {
        await patchProject(id, project)
    } catch (err) {
        console.error(err)
    }
    dispatch(resetPage())
}