import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';
import { RootState } from '../state/rootReducer'
import { setIssueToDelete, removeIssue } from '../state/projectsSlice'

const projectIdSelector = (state: RootState) => state.projects.idForBoard
const issueToDeleteSelector = (state: RootState) => state.projects.issueToDelete

export default (props: any) => {


    const projectId = useSelector(projectIdSelector)
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
            <Modal
                actions={actions}
                appearance="danger"
                onClose={cancelDelete}
                heading="Delete project"
            >
                <h4>{issueToDelete.title}</h4>
            will be deleted.
            </Modal>
        )}
    </ModalTransition>)
}