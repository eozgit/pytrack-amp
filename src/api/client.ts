import Project from '../model/Project';

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

const options = getRequestInit();

export const getProjects = () => fetch(`${root}/projects`, options)

export const postProject = (project: Project) => fetch(`${root}/projects`, { ...options, method: 'POST', body: JSON.stringify(project) })

export const deleteProject = (id: number) => fetch(`${root}/projects/${id}`, { ...options, method: 'DELETE' })

export const patchProject = (id: number, project: Project) => fetch(`${root}/projects/${id}`, { ...options, method: 'PATCH', body: JSON.stringify(project) })