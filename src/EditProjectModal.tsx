import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit';
import ModalDialog, { ModalFooter, ModalTransition } from '@atlaskit/modal-dialog';
import Form, { Field } from '@atlaskit/form';
import Button, { ButtonGroup } from '@atlaskit/button';
import TextField from '@atlaskit/textfield';
import TextArea from '@atlaskit/textarea';
import { RootState } from './rootReducer'
import { updateProject, setIdToEdit } from './projectsSlice'

export default (props: any) => {

    const projectsSelector = (state: RootState) => state.projects.list
    const idToEditSelector = (state: RootState) => state.projects.idToEdit
    const projectToEditSelector = createSelector([projectsSelector, idToEditSelector], (projects, id) => projects.find(p => p.id === id))

    const projectToEdit = useSelector(projectToEditSelector)

    const dispatch = useDispatch()

    const cancelEdit = () => dispatch(setIdToEdit(-1))

    const onFormSubmit = (data: any) => {
        console.log(JSON.stringify(data));
        if (projectToEdit) {
            dispatch(updateProject(projectToEdit.id, data))
        }
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
                <Field name="name" defaultValue={projectToEdit.name} label="Name" isRequired>
                    {({ fieldProps }) => <TextField {...fieldProps} />}
                </Field>

                <Field<string, HTMLTextAreaElement>
                    name="description"
                    defaultValue={projectToEdit.description}
                    label="Description"
                >
                    {({ fieldProps }) => <TextArea minimumRows={4} {...fieldProps} />}
                </Field>
            </ModalDialog>
        )}
    </ModalTransition>)
}