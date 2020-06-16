import React, { useState, useEffect } from 'react';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import Project from './Project';
import getRequestInit from './getRequestInit';

export default (props: any) => {

    const [projects, setProjects] = useState<Project[]>([]);

    const loadProjects = async () => {
        const options = getRequestInit();

        const response = await fetch('/pytrack-stage/api/projects', options);

        const data = await response.json();

        setProjects(data);
    }

    useEffect(() => {
        loadProjects();
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
                            {projects.map(project => (
                                <tr>
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
