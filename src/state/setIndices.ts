import { DraggableLocation } from "react-beautiful-dnd"
import Issue from "../model/Issue"

export default (issues: Issue[], source: DraggableLocation, destination: DraggableLocation) => {
    if (!destination) return
    if (source.droppableId === destination.droppableId) {
        if (source.index === destination.index) return

        let low = Math.min(source.index, destination.index)
        let high = Math.max(source.index, destination.index)
        const up = source.index > destination.index
        const issue = issues.find(issue => issue.status.toString() === source.droppableId && issue.index === (up ? source.index : source.index))
        if (up) {
            high--
        } else {
            low++
        }
        const issuesToSort = issues.filter(
            issue => issue.status.toString() === source.droppableId &&
                issue.index >= low &&
                issue.index <= high)
        for (let issue of issuesToSort) {
            issue.index += up ? 1 : -1
        }

        if (issue) {
            issue.index = destination.index
        }
    } else {
        const issue = issues.find(issue => issue.status.toString() === source.droppableId && issue.index === source.index)
        const sc_issues = issues.filter(
            issue => issue.status.toString() === source.droppableId && issue.index > source.index)
        for (let issue of sc_issues) {
            issue.index--
        }

        const dc_issues = issues.filter(
            issue => issue.status.toString() === destination.droppableId && issue.index >= destination.index)
        for (let issue of dc_issues) {
            issue.index++
        }

        if (issue) {
            issue.status = parseInt(destination.droppableId, 10)
            issue.index = destination.index
        }
    }
}