import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit';
import ModalDialog, { ModalFooter, ModalTransition } from '@atlaskit/modal-dialog';
import Form, { Field, ErrorMessage } from '@atlaskit/form';
import Button, { ButtonGroup } from '@atlaskit/button';
import TextField from '@atlaskit/textfield';
import TextArea from '@atlaskit/textarea';
import { RootState } from '../state/rootReducer'
import { updateProject, setIdToEdit } from '../state/projectsSlice'

export default (props: any) => {

    const projectsSelector = (state: RootState) => state.projects.list
    const idToEditSelector = (state: RootState) => state.projects.idToEdit
    const projectToEditSelector = createSelector([projectsSelector, idToEditSelector], (projects, id) => projects.find(p => p.id === id))

    const projectToEdit = useSelector(projectToEditSelector)

    const dispatch = useDispatch()

    const cancelEdit = () => dispatch(setIdToEdit(-1))

    const onFormSubmit = (data: any) => {
        if (projectToEdit) {
            dispatch(updateProject(projectToEdit.id, data))
        }
    }

    const validateName = (value?: string) => {
        if (!value) return 'REQUIRED'

        if (value.length > 50) return 'TOO_LONG'
    }

    const validateDescription = (value?: string) => {
        if (!value) return

        if (value.length > 100) return 'TOO_LONG'
    }

    const footer = (props: any) => (
        <ModalFooter>
            <span></span>
            <ButtonGroup>
                <Button appearance="primary" type="submit">Update</Button>
                <Button onClick={cancelEdit}>Cancel</Button>
            </ButtonGroup>
        </ModalFooter>
    );

    interface ContainerProps {
        children: React.ReactNode;
        className?: string;
    }

    return (<ModalTransition>
        {projectToEdit && (
            <ModalDialog
                heading="Update project"
                onClose={cancelEdit}
                components={{
                    Container: ({ children, className }: ContainerProps) => (
                        <Form onSubmit={onFormSubmit}>
                            {({ formProps }) => (
                                <form {...formProps} className={className}>
                                    {children}
                                </form>
                            )}
                        </Form>
                    ),
                    Footer: footer,
                }}
            >
                <Field name="name" defaultValue={projectToEdit.name} label="Name" isRequired validate={validateName}>
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
                    defaultValue={projectToEdit.description}
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
            </ModalDialog>
        )}
    </ModalTransition>)
}