export default function GET_USERNAMES(callback){
    fetch("http://localhost:8080/get_usernames").then(prom => prom.json()).then(data => (callback(data)))
}