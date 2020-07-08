import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ModalDialog, { ModalTransition } from '@atlaskit/modal-dialog';
import Form, { Field, ErrorMessage } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';
import TextArea from '@atlaskit/textarea';
import Select, { ValueType, OptionType } from '@atlaskit/select';
import { RootState } from '../state/rootReducer';
import { createIssue, setCreateIssue } from '../state/projectsSlice';
import ContainerProps from '../shared/ContainerProps';
import EditModalFooter from './EditModalFooter';
import IssueTypeOptions from './form/IssueTypeOptions';
import StorypointOptions from './form/StorypointOptions';
import PriorityOptions from './form/PriorityOptions';
import { IssueWithProperties } from '../model/Issue';

const projectIdSelector = (state: RootState) => state.projects.idForBoard
const createIssueSelector = (state: RootState) => state.projects.createIssue

export default (props: any) => {

    const projectId = useSelector(projectIdSelector)
    const showCreateIssue = useSelector(createIssueSelector)

    const dispatch = useDispatch()

    const cancelCreate = () => dispatch(setCreateIssue(false))

    const validateTitle = (value?: string) => {
        if (!value) return 'REQUIRED'

        if (value.length > 50) return 'TOO_LONG'
    }

    const validateDescription = (value?: string) => {
        if (!value) return

        if (value.length > 100) return 'TOO_LONG'
    }

    const onFormSubmit = (data: any) => {
        const { title, description,
            type: { value: type },
            storypoints: { value: storypoints },
            priority: { value: priority }
        } = data
        const issue: IssueWithProperties = { title, description, type, storypoints, priority }
        dispatch(createIssue(projectId, issue))
    }

    return (<ModalTransition>
        {showCreateIssue && (
            <ModalDialog
                heading="Create issue"
                onClose={cancelCreate}
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
                    Footer: () => <EditModalFooter submitText='Create' onCancel={cancelCreate}></EditModalFooter>,
                }}
            >
                <Field name="title" defaultValue='' label="Title" isRequired validate={validateTitle}>
                    {({ fieldProps, error }) => <Fragment>
                        <TextField {...fieldProps} />
                        {error === 'TOO_LONG' && (
                            <ErrorMessage>
                                Issue title needs to be less than 50 characters
                            </ErrorMessage>
                        )}
                    </Fragment>}
                </Field>

                <Field<string, HTMLTextAreaElement>
                    name="description"
                    defaultValue=''
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

                <Field<ValueType<OptionType>>
                    name="type"
                    defaultValue={IssueTypeOptions[0]}
                    label="Type"
                >
                    {({ fieldProps: { id, ...rest }, error }) => <Fragment>
                        <Select<OptionType>
                            inputId={id}
                            className="single-select"
                            classNamePrefix="react-select"
                            {...rest}
                            options={IssueTypeOptions}
                        />
                    </Fragment>
                    }
                </Field>

                <Field<ValueType<OptionType>>
                    name="storypoints"
                    defaultValue={StorypointOptions[0]}
                    label="Storypoints"
                >
                    {({ fieldProps: { id, ...rest }, error }) => <Fragment>
                        <Select<OptionType>
                            inputId={id}
                            className="single-select"
                            classNamePrefix="react-select"
                            {...rest}
                            options={StorypointOptions}
                        />
                    </Fragment>
                    }
                </Field>

                <Field<ValueType<OptionType>>
                    name="priority"
                    defaultValue={PriorityOptions[2]}
                    label="Priority"
                >
                    {({ fieldProps: { id, ...rest }, error }) => <Fragment>
                        <Select<OptionType>
                            inputId={id}
                            className="single-select"
                            classNamePrefix="react-select"
                            {...rest}
                            options={PriorityOptions}
                        />
                    </Fragment>
                    }
                </Field>
            </ModalDialog>
        )}
    </ModalTransition>)
}