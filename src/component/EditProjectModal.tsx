import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { updateProject, setIdToEdit, projectToEditSelector } from '../state/projectsSlice'
import EditModalFooter from './EditModalFooter';
import { ModalTransition, ModalDialog, Form, Field, TextField, ErrorMessage, TextArea } from './atlas';

export default (props: any) => {

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

    return (<ModalTransition>
        {projectToEdit && (
            <ModalDialog
                heading="Edit project"
                onClose={cancelEdit}
                components={{
                    Container: ({ children, className }) => (
                        <Form onSubmit={onFormSubmit}>
                            {({ formProps }) => (
                                <form {...formProps} className={className}>
                                    {children}
                                </form>
                            )}
                        </Form>
                    ),
                    Footer: () => <EditModalFooter submitText='Update' onCancel={cancelEdit}></EditModalFooter>,
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