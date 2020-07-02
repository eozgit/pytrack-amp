import React, { Fragment } from 'react';

import Button from '@atlaskit/button';
import TextField from '@atlaskit/textfield';
import TextArea from '@atlaskit/textarea';

import Form, { Field, FormFooter, ErrorMessage } from '@atlaskit/form';
import { useDispatch } from 'react-redux';
import { createProject } from './projectsSlice';
import Project from './Project';

export default (props: any) => {

    const dispatch = useDispatch()

    const validateName = (value?: string) => {
        if (!value) return 'REQUIRED'

        if (value.length > 50) return 'TOO_LONG'
    }

    const validateDescription = (value?: string) => {
        if (!value) return

        if (value.length > 100) return 'TOO_LONG'
    }

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
                        <Field name="name" defaultValue="" label="Name" isRequired validate={validateName}>
                            {({ fieldProps, error }) => <Fragment>
                                <TextField {...fieldProps} />
                                {error === 'TOO_LONG' && (
                                    <ErrorMessage>
                                        Project name needs to be less than 50 characters
                                    </ErrorMessage>
                                )}
                            </Fragment>}
                        </Field>

                        <Field<string, HTMLTextAreaElement>
                            name="description"
                            defaultValue=""
                            label="Description"
                            validate={validateDescription}
                        >
                            {({ fieldProps, error }) => <Fragment>
                                <TextArea minimumRows={4} {...fieldProps} />
                                {error === 'TOO_LONG' && (
                                    <ErrorMessage>
                                        Description needs to be less than 100 characters
                                    </ErrorMessage>
                                )}
                            </Fragment>}
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
