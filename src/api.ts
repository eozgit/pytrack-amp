import getRequestInit from './getRequestInit'
import Project from './Project';

const root = process.env.NODE_ENV === 'development' ? ' http://localhost:5000' : '/pytrack-stage/api'

const options = getRequestInit();

export const getProjects = () => fetch(`${root}/projects`, options)

export const postProject = (project: Project) => fetch(`${root}/projects`, { ...options, method: 'POST', body: JSON.stringify(project) })

export const deleteProject = (id: number) => fetch(`${root}/projects/${id}`, { ...options, method: 'DELETE' })

export const patchProject = (id: number, project: Project) => fetch(`${root}/projects/${id}`, { ...options, method: 'PATCH', body: JSON.stringify(project) })