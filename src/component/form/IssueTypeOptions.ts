export const IssueTypeMap: { [value: number]: string; } = {
    0: 'Task',
    1: 'Bug',
    2: 'Story'
}

export default Object.entries(IssueTypeMap).map(([value, label]) => ({ value: +value, label }))