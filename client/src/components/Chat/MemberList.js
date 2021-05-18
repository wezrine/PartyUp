
function MemberList (props) {

    const members = props.members

    const memberItems = members.map((member, index) => {
        return (
            <li key={index}>{member.username}</li>
        )
    })

    return(
        <ul>
            {memberItems}
        </ul>
    )
}

export default MemberList