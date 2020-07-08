import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';
import { RootState } from '../state/rootReducer'
import { removeProject, setIdToDelete } from '../state/projectsSlice'

const projectsSelector = (state: RootState) => state.projects.list
const idToDeleteSelector = (state: RootState) => state.projects.idToDelete
const projectToDeleteSelector = createSelector([projectsSelector, idToDeleteSelector], (projects, id) => projects.find(p => p.id === id))

export default (props: any) => {

    const projectToDelete = useSelector(projectToDeleteSelector)

    const dispatch = useDispatch()

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

    return (<ModalTransition>
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
    </ModalTransition>)
}
