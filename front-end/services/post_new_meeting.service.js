export default async function post_new_meeting(meeting_info) {
    const config = {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: "meeting= " + encodeURIComponent(JSON.stringify(meeting_info)),
    }
    fetch("http://localhost:8080/post_new_meeting", config)
}