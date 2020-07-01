import React from 'react';

import Button from '@atlaskit/button';
import TextField from '@atlaskit/textfield';
import TextArea from '@atlaskit/textarea';

import Form, { Field, FormFooter, } from '@atlaskit/form';
import { useDispatch } from 'react-redux';
import { createProject } from './projectsSlice';
import Project from './Project';

export default (props: any) => {

    const dispatch = useDispatch()

    return (
        <div
            style={{
                display: 'flex',
                width: '400px',
                maxWidth: '100%',
                margin: '0 auto',
                flexDirection: 'column',
            }}
        >
            <Form onSubmit={(project: Project) => {
                dispatch(createProject(project))
                project.name = ''
                project.description = ''
            }}>
                {({ formProps }) => (
                    <form {...formProps} name="submit-form">
                        <Field name="name" defaultValue="" label="Name" isRequired>
                            {({ fieldProps }) => <TextField {...fieldProps} />}
                        </Field>

                        <Field<string, HTMLTextAreaElement>
                            name="description"
                            defaultValue=""
                            label="Description"
                        >
                            {({ fieldProps }) => <TextArea minimumRows={4} {...fieldProps} />}
                        </Field>

                        <FormFooter>
                            <Button type="submit" appearance="primary">Create</Button>
                        </FormFooter>
                    </form>
                )}
            </Form>
        </div>
    )
};
