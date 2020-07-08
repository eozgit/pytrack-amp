import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ModalDialog, { ModalTransition } from '@atlaskit/modal-dialog';
import Form, { Field, ErrorMessage } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';
import TextArea from '@atlaskit/textarea';
import Select, { ValueType, OptionType } from '@atlaskit/select';
import { RootState } from '../state/rootReducer';
import { setIssueToEdit, updateIssue } from '../state/projectsSlice';
import ContainerProps from '../shared/ContainerProps';
import EditModalFooter from './EditModalFooter';
import IssueTypeOptions from './form/IssueTypeOptions';
import StorypointOptions from './form/StorypointOptions';
import PriorityOptions from './form/PriorityOptions';
import { IssueWithProperties } from '../model/Issue';

const projectIdSelector = (state: RootState) => state.projects.idForBoard
const issueSelector = (state: RootState) => state.projects.issue

export default (props: any) => {

    const projectId = useSelector(projectIdSelector)
    const issue = useSelector(issueSelector)

    const dispatch = useDispatch()

    const cancelEdit = () => dispatch(setIssueToEdit(null))

    const getIssueType = (type: number | undefined) => {
        if (!type) {
            type = 0
        }

        return IssueTypeOptions.find(o => o.value === type)
    }

    const getStorypoints = (points: number | undefined) => {
        if (!points) {
            points = 1
        }

        return StorypointOptions.find(o => o.value === points)
    }

    const getPriority = (priority: number | undefined) => {
        if (!priority) {
            priority = 0
        }

        return PriorityOptions.find(o => o.value === priority)
    }

    const validateTitle = (value?: string) => {
        if (!value) return 'REQUIRED'

        if (value.length > 50) return 'TOO_LONG'
    }

    const validateDescription = (value?: string) => {
        if (!value) return

        if (value.length > 100) return 'TOO_LONG'
    }

    const onFormSubmit = (data: any) => {
        if (issue) {
            const { title, description,
                type: { value: type },
                storypoints: { value: storypoints },
                priority: { value: priority }
            } = data
            const patch: IssueWithProperties = { title, description, type, storypoints, priority }
            dispatch(updateIssue(projectId, issue.id, patch))
        }
    }

    return (<ModalTransition>
        {issue && (
            <ModalDialog
                heading="Edit issue"
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
                    Footer: () => <EditModalFooter onCancel={cancelEdit}></EditModalFooter>,
                }}
            >
                <Field name="title" defaultValue={issue.title} label="Title" isRequired validate={validateTitle}>
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
                    defaultValue={issue.description}
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
                    defaultValue={getIssueType(issue.type)}
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
                    defaultValue={getStorypoints(issue.storypoints)}
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

                {/* <Field<ValueType<OptionType>>
                    name="status"
                    defaultValue={getStatus(issue.status)}
                    label="Status"
                >
                    {({ fieldProps: { id, ...rest }, error }) => <Fragment>
                        <Select<OptionType>
                            inputId={id}
                            className="single-select"
                            classNamePrefix="react-select"
                            {...rest}
                            options={StatusOptions}
                        />
                    </Fragment>
                    }
                </Field> */}

                <Field<ValueType<OptionType>>
                    name="priority"
                    defaultValue={getPriority(issue.priority)}
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