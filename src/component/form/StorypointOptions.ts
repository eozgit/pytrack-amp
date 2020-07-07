export const Storypoints: number[] = [
    1, 2, 3, 5, 8, 13, 21
]

export default Storypoints.map(value => ({ value, label: value.toString() }))