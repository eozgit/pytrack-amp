const PriorityMap: { [value: number]: string; } = {
    0: 'Lowest',
    1: 'Low',
    2: 'Medium',
    3: 'High',
    4: 'Highest'
}

export default Object.entries(PriorityMap).map(([value, label]) => ({ value: +value, label }))