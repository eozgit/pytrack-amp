import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Page, { Grid, GridColumn } from '@atlaskit/page';
import TrashIcon from '@atlaskit/icon/glyph/trash';
import { resetPage, setIdToDelete } from './projectsSlice'
import { RootState } from './rootReducer'
import CreateProject from './CreateProject';
import DeleteProjectModal from './DeleteProjectModal';

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
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map(project => (
                                <tr key={project.id} className='projects-table'>
                                    <td>{project.name}</td>
                                    <td>{project.description}</td>
                                    <td>
                                        <div className='delete-project' onClick={e => dispatch(setIdToDelete(project.id))}>
                                            <TrashIcon size='medium' label='' />
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
        </Page>
    );
}
