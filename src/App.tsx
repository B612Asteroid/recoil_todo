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
import {RecoilLoadable, useRecoilState, useRecoilValue} from "recoil";
import {toDoState} from "./atoms";
import DraggableCard from "./components/DraggableCard";
import Board from "./components/Board";
import all = RecoilLoadable.all;

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 100%;
`;


function App() {
    const [toDos, setToDos]= useRecoilState(toDoState);
    const onDragEnd = (info: DropResult) => {
        console.log(info);
        const {destination, source, draggableId} = info;
        if (!destination) {
            return;
        }
        // source에서 출발 -> destination으로 간다.
        if (destination?.droppableId === source.droppableId) {
            // same board movement
            setToDos((allBoards) => {
                const boardCopy = [...allBoards[source.droppableId]];
                const taskObj = boardCopy[source.index];
                // #. Delete index
                boardCopy.splice(source.index, 1);
                // #. put back to draggable
                boardCopy.splice(destination.index, 0, taskObj);

                return {
                    ...allBoards,
                    [source.droppableId]: boardCopy
                };
            })
        }

        if (destination.droppableId !== source.droppableId) {
            setToDos((allBoards) => {
                const sourceBoard = [...allBoards[source.droppableId]];
                const targetBoard = [...allBoards[destination.droppableId]];

                const taskObj = sourceBoard[source.index];

                sourceBoard.splice(source.index, 1);
                targetBoard.splice(destination?.index, 0, taskObj);

                return {
                    ...allBoards,
                    [source.droppableId]: sourceBoard,
                    [destination.droppableId]: targetBoard
                }
            })
        }
    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Wrapper>
                <Boards>
                    {Object.keys(toDos).map(boardId => {
                        return (<Board key={boardId} toDos={toDos[boardId]} boardId={boardId} />)
                    })}
                </Boards>
            </Wrapper>
        </DragDropContext>
    )
}

export default App;
