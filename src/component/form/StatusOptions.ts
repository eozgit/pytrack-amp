export const StatusMap: { [value: number]: string; } = {
    0: 'New',
    1: 'Develop',
    2: 'Test',
    3: 'Done'
}

export default Object.entries(StatusMap).map(([value, label]) => ({ value: +value, label }))