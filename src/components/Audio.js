import React from 'react'
import ReactAudioPlayer from 'react-audio-player'

export default function audio(props) {
    return (
            <div>
                <ReactAudioPlayer className="react-audio-player"
                        src={props.path}
                        autoPlay = {false}
                        controls
                />
            </div>
            
        )
}