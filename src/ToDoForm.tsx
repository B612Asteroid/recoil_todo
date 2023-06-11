import React, {useState} from "react";
import {useForm} from "react-hook-form";

interface IFormData {
    toDo: string;
    email: string;
    password: string;
    confirm: string;
    extraError?: string;
}

function ToDoForm() {
    const {register, handleSubmit, formState : {errors}, setError} = useForm<IFormData>({
        defaultValues: {
            email: "@naver.com"
        }
    });

    const onValid = (data: IFormData) => {
        if (data.password !== data.confirm) {
            setError("confirm",
                {message: "password is not same !!"},
                {shouldFocus: true}
            );
        }
    }
    return (<div>
        <form style={{display: "flex", flexDirection: "column"}} onSubmit={handleSubmit(onValid)}>
            <input placeholder="Write a to do" {...register("toDo", {
                required: "required TODO",
                minLength: {
                    value: 10,
                    message: "More then 10 word!!"
                },
                validate: {
                    noNico: (value) => value.includes("nico") ? "Not nico!" : true,
                    noNick: (value) => value.includes("nick") ? "Not nick!" : true,
                }
            })}/>
            <input {...register("email", {
                required: "email Required",
                pattern: {
                    value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                    message: "Only naver Email"
                }})}/>
            <input {...register("password", {
                required: "password Required",
                })}/>
            <input {...register("confirm", {
                required: "confirm Required",
                })}/>
            <button>add</button>
            <span>
                {errors?.email?.message}
            </span>
        </form>
    </div>);
}

export default ToDoForm;