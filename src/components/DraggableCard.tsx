import {Draggable, DraggableProvided, DraggableStateSnapshot} from "react-beautiful-dnd";
import React from "react";
import styled from "styled-components";

const Card = styled.div<{isDragging: boolean}>`
  border-radius: 5px;
  padding: 5px 10px;
  background-color: ${props => props.isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${props => props.isDragging ? "2px 0px 5px rgba(0, 0, 0, 0.05)" : "none"};
  margin-bottom: 5px;
`;

interface IDragabbleCardProps {
    toDoId: number;
    toDoText: string;
    index: number;
}

function DraggableCard({toDoId, toDoText, index}: IDragabbleCardProps) {
    return (
        <Draggable key={toDoText} draggableId={toDoId + ""} index={index}>
            {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                <Card
                    isDragging={snapshot.isDragging}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {toDoText}
                </Card>)}
        </Draggable>)
}

export default React.memo(DraggableCard);