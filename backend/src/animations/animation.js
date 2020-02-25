export default class Animation {

    start(run, interval) {
        this.id = setInterval(run, interval)
    }

    kill() {
        clearInterval(this.id)
    }
}