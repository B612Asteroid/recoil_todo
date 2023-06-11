import React from "react";
import {
    DragDropContext,
    Draggable,
    DraggableProvided,
    Droppable,
    DroppableProvided,
    DropResult
} from "react-beautiful-dnd";
import styled from "styled-components";
import {useRecoilState, useRecoilValue} from "recoil";
import {toDoState} from "./atoms";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
`;

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  border-radius: 5px;
  background-color: ${props => props.theme.boardColor};
  min-height: 200px;
`;

const Card = styled.div`
  border-radius: 5px;
  padding: 5px 10px;
  background-color: ${props => props.theme.cardColor};
  margin-bottom: 5px;
`;

function App() {
    const [toDos, setToDos]= useRecoilState(toDoState);
    const onDragEnd = ({draggableId, destination, source}: DropResult) => {
        if (!destination) {
            return;
        }
        setToDos((currentVal) => {
            const newToDos = [...currentVal];
            // #. Delete index
            newToDos.splice(source.index, 1);
            // #. put back to draggable
            newToDos.splice(destination.index, 0, draggableId);
            return newToDos;
        })
    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Wrapper>
                <Boards>
                    <Droppable droppableId="one">
                        {(provided: DroppableProvided)  =>
                            <Board ref={provided.innerRef} {...provided.droppableProps}>
                                {toDos.map((toDo, index) => (
                                    <Draggable key={toDo} draggableId={toDo} index={index}>
                                        {(provided: DraggableProvided) => (
                                            <Card
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                {toDo}
                                            </Card>)}
                                    </Draggable>))}
                                {provided.placeholder}
                            </Board>
                        }
                    </Droppable>
                </Boards>
            </Wrapper>
        </DragDropContext>
    )
}

export default App;
