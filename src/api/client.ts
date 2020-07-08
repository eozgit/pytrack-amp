import Project from '../model/Project';
import { IssueWithPosition, IssueWithProperties } from '../model/Issue';

const root = process.env.NODE_ENV === 'development' ? ' http://localhost:5000' : '/pytrack-stage/api'

const getRequestInit = (): RequestInit => {
    const key = Object.keys(window.localStorage).find(key =>
        key.startsWith('CognitoIdentityServiceProvider.') &&
        key.endsWith('.idToken')) || '';

    const token = window.localStorage[key];

    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    };
}

export const getProjects = () => fetch(`${root}/projects`, getRequestInit())

export const postProject = (project: Project) => fetch(`${root}/projects`, { ...getRequestInit(), method: 'POST', body: JSON.stringify(project) })

export const deleteProject = (id: number) => fetch(`${root}/projects/${id}`, { ...getRequestInit(), method: 'DELETE' })

export const patchProject = (id: number, project: Project) => fetch(`${root}/projects/${id}`, { ...getRequestInit(), method: 'PATCH', body: JSON.stringify(project) })

export const getIssues = (id: number) => fetch(`${root}/projects/${id}/issues`, getRequestInit())

export const patchIssue = (projectId: number, issueId: number, issue: IssueWithPosition | IssueWithProperties) => fetch(`${root}/projects/${projectId}/issues/${issueId}`, { ...getRequestInit(), method: 'PATCH', body: JSON.stringify(issue) })

export const deleteIssue = (projectId: number, issueId: number) => fetch(`${root}/projects/${projectId}/issues/${issueId}`, { ...getRequestInit(), method: 'DELETE' })
