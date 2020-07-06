import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from './store'
import Project from '../model/Project'
import { getProjects, postProject, deleteProject, patchProject, getIssues } from '../api/client'
import Issue from '../model/Issue'
import { DraggableLocation } from 'react-beautiful-dnd'
import setIndices from './setIndices'

interface StateShape {
    list: Project[],
    idToDelete: number,
    idToEdit: number,
    idForBoard: number,
    issues: Issue[]
}

const initialState: StateShape = { list: [], idToDelete: -1, idToEdit: -1, idForBoard: -1, issues: [] }

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
        },
        setIssues(state, action: PayloadAction<Issue[]>) {
            state.issues = action.payload
        },
        setIssueIndices(state, action: PayloadAction<[DraggableLocation, DraggableLocation | undefined]>) {
            const [source, destination] = action.payload
            if (!destination) return
            setIndices(state.issues, source, destination)
        }
    }
})

export const { setProjects, setIdToDelete, setIdToEdit, setIdForBoard, setIssues, setIssueIndices } = projectsSlice.actions

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

export const loadIssues = (id: number): AppThunk => async dispatch => {
    let issues: Issue[] = []
    try {
        const response = await getIssues(id)
        issues = await response.json()
    } catch (err) {
        console.error(err)
    }
    dispatch(setIssues(issues))
}