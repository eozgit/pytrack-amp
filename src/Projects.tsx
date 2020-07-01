import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Page, { Grid, GridColumn } from '@atlaskit/page';
import TrashIcon from '@atlaskit/icon/glyph/trash';
import EditFilledIcon from '@atlaskit/icon/glyph/edit-filled';
import { resetPage, setIdToDelete, setIdToEdit } from './projectsSlice'
import { RootState } from './rootReducer'
import CreateProject from './CreateProject';
import DeleteProjectModal from './DeleteProjectModal';
import EditProjectModal from './EditProjectModal';

export default (props: any) => {

    const projectsSelector = (state: RootState) => state.projects.list

    const projects = useSelector(projectsSelector)

    const dispatch = useDispatch()

    useEffect(() => {
        (async () => dispatch(resetPage()))()
    }, []);

    return (
        <Page>
            <Grid>
                <GridColumn>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Delete</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map(project => (
                                <tr key={project.id} className='projects-table'>
                                    <td>{project.name}</td>
                                    <td>{project.description}</td>
                                    <td>
                                        <div className='opacity-10' onClick={e => dispatch(setIdToDelete(project.id))}>
                                            <TrashIcon size='medium' label='' />
                                        </div>
                                    </td>
                                    <td>
                                        <div className='opacity-10' onClick={e => dispatch(setIdToEdit(project.id))}>
                                            <EditFilledIcon size='medium' label='' />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </GridColumn>
            </Grid>
            <CreateProject></CreateProject>
            <DeleteProjectModal></DeleteProjectModal>
            <EditProjectModal></EditProjectModal>
        </Page>
    );
}
