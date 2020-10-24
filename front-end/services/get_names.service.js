export default function GET_NAMES(callback){
    fetch("http://localhost:8080/get_names").then(prom => prom.json()).then(data => (callback(data)))
}