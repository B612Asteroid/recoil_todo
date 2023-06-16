import {Droppable, DroppableProvided, DroppableStateSnapshot} from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import React, {useRef} from "react";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import {ITodo, toDoState} from "../atoms";
import {useSetRecoilState} from "recoil";


const Wrapper = styled.div`
  width: 300px;
  padding-top: 10px 0px;
  border-radius: 5px;
  background-color: ${props => props.theme.boardColor};
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

interface IAreaProps {
    idDraggingOver: boolean;
    isDraggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${props => props.idDraggingOver ? "#dfe6e9" : props.isDraggingFromThis ? "#b2bec3" : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

interface IBoardProps {
    toDos: ITodo[];
    boardId: string;
}

interface IForm {
    toDo: string;
}
function Board({toDos, boardId}: IBoardProps) {
    const {register, setValue, handleSubmit} = useForm<IForm>();
    const setTodoState = useSetRecoilState(toDoState);

    const onValid = ({toDo}: IForm) => {
        const newTodo = {
            id: Date.now(),
            text: toDo,
        }

        setTodoState(allBoards => {
            return {
                ...allBoards,
                [boardId]: [
                    ...allBoards[boardId], newTodo
                ]
            }
        })
        setValue("toDo", "");
    }
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Form onSubmit={handleSubmit(onValid)}>
                <input {...register("toDo", {required: true})} type="text" placeholder={`Add task on ${boardId}`}/>
            </Form>
            <Droppable droppableId={boardId}>
                {(provided: DroppableProvided, snapshot: DroppableStateSnapshot)  =>
                    <Area
                        idDraggingOver={snapshot.isDraggingOver}
                        isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                            {toDos.map((toDo, index) => <DraggableCard toDoId={toDo.id} index={index} toDoText={toDo.text}/>)}
                            {provided.placeholder}
                    </Area>
                }
            </Droppable>
        </Wrapper>
    )
}

export default Board;
