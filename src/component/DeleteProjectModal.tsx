import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { removeProject, setIdToDelete, projectToDeleteSelector } from '../state/projectsSlice'
import { ModalTransition, ModalDialog } from './atlas';

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
            <ModalDialog
                actions={actions}
                appearance="danger"
                onClose={cancelDelete}
                heading="Delete project"
            >
                <h4>{projectToDelete.name}</h4>
            will be deleted.
            </ModalDialog>
        )}
    </ModalTransition>)
}
