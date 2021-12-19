import React from 'react';
import { NotesAppBar } from './NotesAppBar'

export const NotePage = () => {
    return (
        <div className="notes__main-content">
            <NotesAppBar />
            <div className="notes__content">
                <input
                    type="text"
                    placeholder="Some awsome title"
                    className="notes__title-input"
                />
                <br/>
                <textarea
                    placeholder="What happend"
                    className="notes__textarea"
                ></textarea>
                <div className="notes__image">
                    <img
                        src="https://th.bing.com/th/id/R.b836c049d4e38e424d11b32df1ef328c?rik=Z%2bxAyKZ92kvu5A&riu=http%3a%2f%2fwallpapercave.com%2fwp%2f55sqB69.jpg&ehk=Cup2kUgS8Ieml1rev%2bWRIJeObLtg8IugzXqdggpYa9k%3d&risl=&pid=ImgRaw&r=0"
                        alt="School Rumble"
                    />
                </div>
            </div>
        </div>
    );
}
