import React from 'react';

export const JournalEntry = () => {
    return (
        <div className="journal__entry">
            <div
                className="jouranl__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://th.bing.com/th/id/R.99cb7a88cc3e20e78e18ba7aa6c6ad7b?rik=SZQbCF3eH9aLPA&pid=ImgRaw&r=0)'
                }}
            >
            </div>
            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    Un nuevo dia
                </p>
                <p className="journal__entry-content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
            </div>
            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>28</h4>
            </div>
        </div>
    )
}
