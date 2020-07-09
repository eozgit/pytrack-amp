import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { DraggableLocation } from 'react-beautiful-dnd'
import { AppThunk } from './store'
import Project from '../model/Project'
import { getProjects, postProject, deleteProject, patchProject, getIssues, patchIssue, deleteIssue, postIssue } from '../api/client'
import Issue, { IssueWithProperties } from '../model/Issue'
import setIndices from './setIndices'
import { RootState } from './rootReducer'

interface StateShape {
    list: Project[],
    idToDelete: number,
    idToEdit: number,
    idForBoard: number,
    issues: Issue[],
    issue: Issue | null,
    issueToDelete: Issue | null,
    createIssue: boolean
}

const initialState: StateShape = {
    list: [], idToDelete: -1, idToEdit: -1, idForBoard: -1,
    issues: [], issue: null, issueToDelete: null, createIssue: false
}

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
        },
        setIssueToEdit(state, action: PayloadAction<Issue | null>) {
            state.issue = action.payload
        },
        setIssueToDelete(state, action: PayloadAction<Issue | null>) {
            state.issueToDelete = action.payload
        },
        setCreateIssue(state, action: PayloadAction<boolean>) {
            state.createIssue = action.payload
        }
    }
})

export const { setProjects, setIdToDelete, setIdToEdit, setIdForBoard,
    setIssues, setIssueIndices, setIssueToEdit, setIssueToDelete, setCreateIssue } = projectsSlice.actions

export default projectsSlice.reducer


export const projectsSelector = (state: RootState) => state.projects.list

export const activeProjectIdSelector = (state: RootState) => state.projects.idForBoard

const projectToEditIdSelector = (state: RootState) => state.projects.idToEdit

export const projectToEditSelector = createSelector([projectsSelector, projectToEditIdSelector], (projects, id) => projects.find(p => p.id === id))

const projectToDeleteIdSelector = (state: RootState) => state.projects.idToDelete

export const projectToDeleteSelector = createSelector([projectsSelector, projectToDeleteIdSelector], (projects, id) => projects.find(p => p.id === id))

export const projectSelector = createSelector([projectsSelector, activeProjectIdSelector], (projects, id) => projects.find(p => p.id === id))

export const issuesSelector = (state: RootState) => state.projects.issues

export const createIssueModalOpenSelector = (state: RootState) => state.projects.createIssue

export const issueToEditSelector = (state: RootState) => state.projects.issue

export const issueToDeleteSelector = (state: RootState) => state.projects.issueToDelete


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

export const refreshBoard = (projectId: number): AppThunk => async dispatch => {
    dispatch(loadIssues(projectId))
    dispatch(setIssueToEdit(null))
    dispatch(setIssueToDelete(null))
    dispatch(setCreateIssue(false))
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
    dispatch(setIdForBoard(id))
}

export const moveIssue = (projectId: number, issueId: number,
    source: DraggableLocation, destination: DraggableLocation): AppThunk => async dispatch => {
        dispatch(setIssueIndices([source, destination]))
        try {
            await patchIssue(projectId, issueId, { status: +destination.droppableId, index: destination.index, id: -1 })
        } catch (err) {
            console.error(err)
        }
        dispatch(refreshBoard(projectId))
    }

export const updateIssue = (projectId: number, issueId: number,
    patch: IssueWithProperties): AppThunk => async dispatch => {
        try {
            await patchIssue(projectId, issueId, patch)
        } catch (err) {
            console.error(err)
        }
        dispatch(refreshBoard(projectId))
    }

export const removeIssue = (projectId: number, issueId: number): AppThunk => async dispatch => {
    try {
        await deleteIssue(projectId, issueId)
    } catch (err) {
        console.error(err)
    }
    dispatch(refreshBoard(projectId))
}

export const createIssue = (projectId: number, issue: IssueWithProperties): AppThunk => async dispatch => {
    try {
        await postIssue(projectId, issue)
    } catch (err) {
        console.error(err)
    }
    dispatch(refreshBoard(projectId))
}
