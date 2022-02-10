import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { activeNote, startDeleting } from '../actions/notes';
import { NotesAppBar } from './NotesAppBar'

export const NotePage = () => {
    const dispatch = useDispatch();
    const { active: note } = useSelector(state => state.notes);
    const [formValues, handleInputChange, reset] = useForm(note);
    const { body, title, id } = formValues;

    const activeId = useRef(note.id);

    useEffect(() => {
        if (note.id !== activeId.current) {
            reset(note);
            activeId.current = note.id;
        }
    }, [note, reset]);


    useEffect(() => {
        dispatch(activeNote(formValues.id, { ...formValues }));
    }, [formValues, dispatch]);

    const handleDelete = () => {
        dispatch(startDeleting(id));
    }


    return (
        <div className="notes__main-content">
            <NotesAppBar />
            <div className="notes__content">
                <input
                    name="title"
                    type="text"
                    placeholder="Some awsome title"
                    className="notes__title-input"
                    value={title}
                    onChange={handleInputChange}
                />
                <br />
                <textarea
                    name="body"
                    placeholder="What happend"
                    className="notes__textarea"
                    value={body}
                    onChange={handleInputChange}
                ></textarea>
                {
                    (note.url) && (
                        <div className="notes__image">
                            <img
                                // src="https://th.bing.com/th/id/R.b836c049d4e38e424d11b32df1ef328c?rik=Z%2bxAyKZ92kvu5A&riu=http%3a%2f%2fwallpapercave.com%2fwp%2f55sqB69.jpg&ehk=Cup2kUgS8Ieml1rev%2bWRIJeObLtg8IugzXqdggpYa9k%3d&risl=&pid=ImgRaw&r=0"
                                src={note.url}
                                alt="Image"
                            />
                        </div>
                    )
                }
            </div>
            <button
                className="btn btn-danger"
                onClick={handleDelete}
            >
                Delete
            </button>
        </div>
    );
}
