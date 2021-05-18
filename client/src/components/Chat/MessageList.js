
function MessageList(props) {

    const messages = props.messages

    const messageItems = messages.map((message, index) => {

        if (message.userId == localStorage.getItem('userId')) {
            return (
                <div className="msg right-msg" key={index}>
                    <div className="msg-bubble">
                        <div className="msg-info">
                            <div className="msg-info-name">{message.username}</div>
                            <div className="msg-info-time">{message.time}</div>
                        </div>
                        <div className="msg-text">{message.body}</div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="msg left-msg" key={index}>
                    <div className="msg-bubble">
                        <div className="msg-info">
                            <div className="msg-info-name">{message.username}</div>
                            <div className="msg-info-time">{message.time}</div>
                        </div>
                        <div className="msg-text">{message.body}</div>
                    </div>
                </div>
            )
        }
    })

    return (
        <div>{messageItems}</div>
    )
}

export default MessageList