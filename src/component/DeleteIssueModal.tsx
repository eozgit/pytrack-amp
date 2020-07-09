import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setIssueToDelete, removeIssue, issueToDeleteSelector, activeProjectIdSelector } from '../state/projectsSlice'
import { ModalTransition, ModalDialog } from './atlas';

export default (props: any) => {

    const projectId = useSelector(activeProjectIdSelector)
    const issueToDelete = useSelector(issueToDeleteSelector)

    const dispatch = useDispatch()

    const cancelDelete = () => dispatch(setIssueToDelete(null))

    const actions = [
        {
            text: 'Delete',
            onClick: () => {
                if (issueToDelete) {
                    dispatch(removeIssue(projectId, issueToDelete.id))
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
        {issueToDelete && (
            <ModalDialog
                actions={actions}
                appearance="danger"
                onClose={cancelDelete}
                heading="Delete project"
            >
                <h4>{issueToDelete.title}</h4>
            will be deleted.
            </ModalDialog>
        )}
    </ModalTransition>)
}