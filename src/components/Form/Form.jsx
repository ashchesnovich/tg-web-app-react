import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import "./Form.css";
import { useTelegram } from "../../hooks/useTelegram";

const Form = () => {

    const [country, setCountry] = useState('')
    const [street, setStreet] = useState('')
    const [subject, setSubject] = useState('')
    const {tg} = useTelegram()

    const onSendData = useCallback(()=>{
        const data = {
            country,
            street,
            subject
        }
        console.log('data', data)
        tg.sendData(JSON.stringify(data));
    }, [tg, country, street, subject])

    useEffect(()=>{
        tg.onEvent('mainButtonClicked', onSendData)
        return()=>{
            tg.offEvent('mainButtonClicked', onSendData)
        }
    },[tg, onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [tg])

    useEffect(() => {
        if (!country || !street) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
    },[tg, country, street])

    const onChangeCountry = (e) => {
        setCountry(e.target.value)
    }
    const onChangeStreet = (e) => {
        setStreet(e.target.value)
    }
    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }


    return (
        <div className={"form"}>
            <h3>Введите ваши данные</h3>
            <input className={"input"} type="text" placeholder={"Страна"} value={country} onChange={onChangeCountry}/>
            <input className={"input"} type="text" placeholder={"Улица"} value={street} onChange={onChangeStreet}/>
            <select className={"select"} value={subject} onChange={onChangeSubject}>
                <option value={'physical'}>Физю лицо</option>
                <option value={'legal'}>Юр. лицо</option>
            </select>
        </div>
    );
}

export default Form;