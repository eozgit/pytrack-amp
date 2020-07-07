import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Page, { Grid, GridColumn } from '@atlaskit/page';
import TrashIcon from '@atlaskit/icon/glyph/trash';
import EditFilledIcon from '@atlaskit/icon/glyph/edit-filled';
import BoardIcon from '@atlaskit/icon/glyph/board';
import { resetPage, setIdToDelete, setIdToEdit, loadIssues } from '../state/projectsSlice'
import { RootState } from '../state/rootReducer'
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

    const goToBoard = (projectId: number) => {
        dispatch(loadIssues(projectId))
    }

    return (
        <Page>
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
            <DeleteProjectModal></DeleteProjectModal>
            <EditProjectModal></EditProjectModal>
        </Page>
    );
}
