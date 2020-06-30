import getRequestInit from './getRequestInit'

const root = 'http://localhost:5000'

const options = getRequestInit();

export const loadProjects = fetch(`${root}/projects`, options)