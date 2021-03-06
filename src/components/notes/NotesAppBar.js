import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNotes, startUploading } from '../actions/notes';

export const NotesAppBar = () => {
    const dispatch = useDispatch();
    const { active } = useSelector(state => state.notes);

    const handleSave = () => {
        dispatch(startSaveNotes(active));
    };

    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            dispatch(startUploading(file));
        }
    };

    return (
        <div className="notes__appbar">
            <span>28 de agosto 2020</span>
            <input
                id="fileSelector"
                name="file"
                type="file"
                style={{display:'none'}}
                onChange={handleFileChange}
            />
            <div>
                <button
                    name="btnPicture"
                    className="btn"
                    onClick={handlePictureClick}
                >
                    Picture
                </button>
                <button
                    name="btnSave"
                    className="btn"
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </div>
    );
};
