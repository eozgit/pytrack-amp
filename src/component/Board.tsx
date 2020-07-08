import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import Badge from '@atlaskit/badge';
import Button from '@atlaskit/button';
import Task16Icon from '@atlaskit/icon-object/glyph/task/16';
import Bug16Icon from '@atlaskit/icon-object/glyph/bug/16';
import Story16Icon from '@atlaskit/icon-object/glyph/story/16';
import PriorityLowestIcon from '@atlaskit/icon-priority/glyph/priority-lowest';
import PriorityLowIcon from '@atlaskit/icon-priority/glyph/priority-low';
import PriorityMediumIcon from '@atlaskit/icon-priority/glyph/priority-medium';
import PriorityHighIcon from '@atlaskit/icon-priority/glyph/priority-high';
import PriorityHighestIcon from '@atlaskit/icon-priority/glyph/priority-highest';
import { RootState } from '../state/rootReducer';
import { moveIssue, setIdForBoard, setIssues, setIssueToEdit, setCreateIssue } from '../state/projectsSlice';
import Issue, { IssueWithPosition } from '../model/Issue';
import Page from '@atlaskit/page';
import EditIssueModal from './EditIssueModal';
import DeleteIssueModal from './DeleteIssueModal';
import CreateIssueModal from './CreateIssueModal';


const idForBoardSelector = (state: RootState) => state.projects.idForBoard
const projectsSelector = (state: RootState) => state.projects.list
const issuesSelector = (state: RootState) => state.projects.issues
const projectSelector = createSelector([projectsSelector, idForBoardSelector], (projects, id) => projects.find(p => p.id === id))

export default (props: any) => {

    const projectId = useSelector(idForBoardSelector)
    const project = useSelector(projectSelector)
    const issues = useSelector(issuesSelector)

    const dispatch = useDispatch()

    const backToProjects = () => {
        dispatch(setIdForBoard(-1))
        dispatch(setIssues([]))
    }

    const createIssue = () => {
        dispatch(setCreateIssue(true))
    }

    const issueDoubleClick = (issue: Issue) => {
        dispatch(setIssueToEdit(issue))
    }

    const dragEnd = (result: DropResult) => {
        const { draggableId, source, destination } = result
        if (destination) {
            dispatch(moveIssue(projectId, +draggableId, source, destination))
        }
    }

    const issueComparer = (issueA: IssueWithPosition, issueB: IssueWithPosition) => {
        const { index: indexA } = issueA
        const { index: indexB } = issueB
        if (indexA > indexB) {
            return 1
        } else if (indexA < indexB) {
            return -1
        } else {
            return 0
        }
    }

    const columns = ['New', 'Develop', 'Test', 'Done']
    return (
        <Page>
            <div className='padding-15'>
                <h1 style={{ textAlign: 'center' }}>{project?.name}</h1>
                <h5 style={{ textAlign: 'center' }}>{project?.description}</h5>
                <div>
                    <Button appearance='link' onClick={backToProjects}>Back to projects</Button>
                </div>
                <div>
                    <Button appearance='link' onClick={createIssue}>Create issue</Button>
                </div>
                <DragDropContext onDragEnd={dragEnd}>

                    <div className='board-pane'>
                        {columns.map((column, columnIndex) => {

                            const columnIssues = issues.filter(issue => issue.status === columnIndex)
                            columnIssues.sort(issueComparer)

                            return (<Droppable droppableId={columnIndex.toString()} key={columnIndex}>
                                {(provided, snapshot) => <div className='board-column'
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}>
                                    <div className='board-column-heading'><strong>{column.toUpperCase()}</strong> {columnIssues.length}</div>
                                    {

                                        columnIssues.map((issue, issueIndex) =>
                                            <Draggable key={issue.id} draggableId={issue.id.toString()} index={issue.index}>
                                                {(provided, snapshot) => <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className='board-item'
                                                    onDoubleClick={() => issueDoubleClick(issue)}>
                                                    <h6>{issue.title}</h6>
                                                    <p className='board-item-description'>{issue.description}</p>
                                                    <div className='board-item-footer'>
                                                        <div className='board-item-footer-element'>
                                                            {issue.type === 0 && <Task16Icon label='Task' />}
                                                            {issue.type === 1 && <Bug16Icon label='Bug' />}
                                                            {issue.type === 2 && <Story16Icon label='Story' />}
                                                        </div>
                                                        <div className='board-item-footer-element'>
                                                            {issue.priority === 0 && <PriorityLowestIcon label='Lowest' />}
                                                            {issue.priority === 1 && <PriorityLowIcon label='Low' />}
                                                            {issue.priority === 2 && <PriorityMediumIcon label='Medium' />}
                                                            {issue.priority === 3 && <PriorityHighIcon label='High' />}
                                                            {issue.priority === 4 && <PriorityHighestIcon label='Highest' />}
                                                        </div>
                                                        <div className='board-item-footer-element'>
                                                            <Badge>{issue.storypoints}</Badge>
                                                        </div>
                                                    </div>
                                                </div>}
                                            </Draggable>
                                        )

                                    }</div>}
                            </Droppable>)
                        }
                        )
                        }
                    </div>

                </DragDropContext>
            </div>
            <EditIssueModal></EditIssueModal>
            <DeleteIssueModal></DeleteIssueModal>
            <CreateIssueModal></CreateIssueModal>
        </Page>
    )
}