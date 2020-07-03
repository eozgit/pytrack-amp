import React, { useEffect } from 'react';
import { RootState } from '../state/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { loadIssues } from '../state/projectsSlice';

export default (props: any) => {

    const idForBoardSelector = (state: RootState) => state.projects.idForBoard
    const issuesSelector = (state: RootState) => state.projects.issues

    const idForBoard = useSelector(idForBoardSelector)
    const issues = useSelector(issuesSelector)

    const dispatch = useDispatch()

    useEffect(() => {
        (async () => dispatch(loadIssues(idForBoard)))()
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Assignee</th>
                    <th>Storypoints</th>
                    <th>Status</th>
                    <th>Priority</th>
                </tr>
            </thead>
            <tbody>
                {issues.map(issue => <tr>
                    <td>{issue.title}</td>
                    <td>{issue.description}</td>
                    <td>{issue.type}</td>
                    <td>{issue.assignee}</td>
                    <td>{issue.storypoints}</td>
                    <td>{issue.status}</td>
                    <td>{issue.priority}</td>
                </tr>)}
            </tbody>
        </table>
    )
}