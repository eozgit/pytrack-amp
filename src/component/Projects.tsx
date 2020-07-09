import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { resetPage, setIdToDelete, setIdToEdit, loadIssues, projectsSelector } from '../state/projectsSlice'
import CreateProject from './CreateProject';
import DeleteProjectModal from './DeleteProjectModal';
import EditProjectModal from './EditProjectModal';
import { Page, Grid, Spinner, GridColumn, TrashIcon, EditFilledIcon, BoardIcon } from './atlas';

export default (props: any) => {

    const projects = useSelector(projectsSelector)

    const dispatch = useDispatch()

    useEffect(() => {
        (async () => dispatch(resetPage()))()
    }, []);

    const goToBoard = (projectId: number) => {
        dispatch(loadIssues(projectId))
    }

    return (
        <Page>
            {!projects.length && <div className='center-container'>
                <div className='center-element'><Spinner size='xlarge' /></div>
            </div>}
            {projects.length && <div>
                <Grid>
                    <GridColumn>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th className='icon-column'>Delete</th>
                                    <th className='icon-column'>Edit</th>
                                    <th className='icon-column'>Board</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map(project => (
                                    <tr key={project.id} className='projects-table'>
                                        <td>{project.name}</td>
                                        <td>{project.description}</td>
                                        <td className='icon-column'>
                                            <div className='opacity-10' onClick={e => dispatch(setIdToDelete(project.id))}>
                                                <TrashIcon size='medium' label='' />
                                            </div>
                                        </td>
                                        <td className='icon-column'>
                                            <div className='opacity-10' onClick={e => dispatch(setIdToEdit(project.id))}>
                                                <EditFilledIcon size='medium' label='' />
                                            </div>
                                        </td>
                                        <td className='icon-column'>
                                            <div className='opacity-10' onClick={e => goToBoard(project.id)}>
                                                <BoardIcon size='medium' label='' />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </GridColumn>
                </Grid>
                <CreateProject></CreateProject>
            </div>}
            <DeleteProjectModal></DeleteProjectModal>
            <EditProjectModal></EditProjectModal>
        </Page>
    );
}
