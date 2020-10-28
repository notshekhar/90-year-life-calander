const DOB = "23 March, 2000"

let myDay = new Date(DOB)
let _90Years = new Date(DOB)
_90Years.setYear(_90Years.getFullYear() + 90)

const progress_bar = document.querySelector(".progress_bar .completed")
const canvas_container = document.querySelector(".canvas")
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

function setCanvasHeightAndWidth() {
    let { height, width } = canvas_container.getBoundingClientRect()
    canvas.width = width
    canvas.height = height
}
function calculateWeeksBetween(date1, date2) {
    var ONE_WEEK = 1000 * 60 * 60 * 24 * 7
    var date1_ms = date1.getTime()
    var date2_ms = date2.getTime()
    var difference_ms = Math.abs(date1_ms - date2_ms)
    return Math.floor(difference_ms / ONE_WEEK)
}
setCanvasHeightAndWidth()
window.onresize = () => setCanvasHeightAndWidth()

let total_life = _90Years.getTime() - myDay.getTime()
let no_of_weeks = calculateWeeksBetween(myDay, _90Years)
let cols = 50
let grid = calculateGrid()
let rows = grid.length
function calculateGrid() {
    let g = []
    let counter = 0
    let completed_life = Date.now() - myDay.getTime()
    let oneWeek = 7 * 24 * 60 * 60 * 1000
    for (let i = 0; i < no_of_weeks; i += 10) {
        let a = []
        for (let j = 0; j < cols; j++) {
            if (counter <= no_of_weeks) {
                if (completed_life > oneWeek) completed_life -= oneWeek
                else completed_life = 0
                a.push({
                    per_c:
                        ((completed_life > oneWeek ? oneWeek : completed_life) /
                            oneWeek) *
                        100,
                })
                counter++
            }
        }
        if (a.length > 0) g.push(a)
    }
    return g
}

function draw() {
    let life_remaining = _90Years.getTime() - Date.now()
    let life_completed = total_life - life_remaining
    let life_completed_percentage = (life_completed / total_life) * 100
    progress_bar.style.width = `${life_completed_percentage}%`
    progress_bar.innerText = `${life_completed_percentage.toFixed(8)}%`
    //draw grid
    //clear canvas
    let width = canvas.width / grid[0].length
    let height = canvas.height / grid.length
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // console.log(width, height)
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            ctx.beginPath()
            ctx.fillStyle = "rgb(122, 122, 122)"
            ctx.rect(
                j * width,
                i * height,
                (width * grid[i][j].per_c) / 100 - 1,
                height - 2
            )
            ctx.fill()
        }
    }
    grid = calculateGrid()
}

setInterval(() => draw(), 1)
