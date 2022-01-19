import React from 'react';
import moment from 'moment';
import 'moment/locale/es';

export const JournalEntry = ({ id, date, title, body, url }) => {
    const noteDate = moment(date).locale('es');

    return (
        <div className="journal__entry">
            <div
                className="jouranl__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url(${url})`
                }}
            >
            </div>
            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    {title}
                </p>
                <p className="journal__entry-content">
                    {body}
                </p>
            </div>
            <div className="journal__entry-date-box">
                <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('d')}</h4>
            </div>
        </div>
    )
}
