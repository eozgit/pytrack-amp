import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Page, { Grid, GridColumn } from '@atlaskit/page';
import { fetchProjects } from './projectsSlice'
import { RootState } from './rootReducer'

export default (props: any) => {

    const projects = useSelector(
        (state: RootState) => state.projects
    )

    const dispatch = useDispatch()

    useEffect(() => {
        (async () => dispatch(fetchProjects()))()
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
                            </tr>
                        </thead>
                        <tbody>
                            {projects.list.map(project => (
                                <tr key={`${project.name}-${project.description}`}>
                                    <td>{project.name}</td>
                                    <td>{project.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </GridColumn>
            </Grid>
        </Page>
    );
}
