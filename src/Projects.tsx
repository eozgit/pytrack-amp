import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Page, { Grid, GridColumn } from '@atlaskit/page';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';
import TrashIcon from '@atlaskit/icon/glyph/trash';
import { removeProject, refreshPage, setIdToDelete } from './projectsSlice'
import { RootState } from './rootReducer'
import CreateProject from './CreateProject';
import { createSelector } from '@reduxjs/toolkit';

export default (props: any) => {

    const projectsSelector = (state: RootState) => state.projects.list
    const idToDeleteSelector = (state: RootState) => state.projects.idToDelete
    const projectToDeleteSelector = createSelector([projectsSelector, idToDeleteSelector], (projects, id) => projects.find(p => p.id === id))

    const projects = useSelector(projectsSelector)
    const projectToDelete = useSelector(projectToDeleteSelector)

    const dispatch = useDispatch()

    useEffect(() => {
        (async () => dispatch(refreshPage()))()
    }, []);

    const remove = (id: number) => {
        dispatch(removeProject(id))
    }

    const cancelDelete = () => dispatch(setIdToDelete(-1))

    const actions = [
        {
            text: 'Delete',
            onClick: () => {
                if (projectToDelete) {
                    remove(projectToDelete.id)
                }
            }
        },
        {
            text: 'Cancel',
            onClick: cancelDelete,
            autoFocus: true,
        }
    ];

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

            <ModalTransition>
                {projectToDelete && (
                    <Modal
                        actions={actions}
                        appearance="danger"
                        onClose={cancelDelete}
                        heading="Delete project"
                    >
                        <h4>{projectToDelete.name}</h4>
                        will be deleted.
                    </Modal>
                )}
            </ModalTransition>

        </Page>
    );
}
