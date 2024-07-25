/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let temp = [
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ], [
        [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0]
    ], [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ], [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

    ], [
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
    ], [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]

];
let lv_score = 0, score = 0, round = 1;
let game_flag = 0;
let level_up = [];

//****************************************************************************
//                          initialize
//****************************************************************************

function init() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 80px sans-serif';
    let text = 'BLOCK BREAK';
    let textWidth = ctx.measureText(text).width;
    ctx.fillText(text, (canvas.width - textWidth) / 2, 300);

    ctx.fillRect(20, 20, 15, canvas.height);
    ctx.fillRect(canvas.width - 40, 20, 15, canvas.height);
    ctx.fillRect(20, 20, canvas.width - 45, 15);
    ctx.fillRect(80, 695, 120, 15);

    ctx.fillStyle = '#eee';
    ctx.font = 'bold 40px sans-serif';
    text = 'PRESS SPACE!!';
    textWidth = ctx.measureText(text).width;
    ctx.fillText(text, (canvas.width - textWidth) / 2, 450);

    game_flag = 0;
    lv_score = 0, score = 0, round = 1, level_up = [];
}
init();



let level;
let PDx, PDy, PDw;


function start() {
    let x = 45, y = 120;
    level = 0, lv_score = 0;
    let block_length = 0;
    let stage = Math.floor(Math.random() * temp.length)
    for (let i = 0; i < temp[stage].length; i++) {
        for (let j = 0; j < temp[stage][i].length; j++) {
            blockAdd(x, y, temp[stage][i][j]);
            x += 76;
            if (temp[stage][i][j] == 1) {
                block_length++;
            }
        }
        x = 45, y += 40;
    }

    PDx = 80, PDy = 695, PDw = 120;
    let able = block_length;
    let ls = [];
    ballAdd();
    for (let i = 0; i < 6; i++) {
        able = block_length / 6;
        block_length -= able;
        ls.push(Math.floor(able));
    }
    let k = 0;
    for (let i = 0; i < ls.length; i++) {
        k += ls[5 - i];
        level_up.push(k);
    }
    console.log(level_up, ls);
    main();
}



//===========================================
//                MAIN LOOP
//===========================================


function main() {
    let id = window.requestAnimationFrame(main);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#fff';
    ctx.fillRect(20, 20, 15, canvas.height);
    ctx.fillRect(canvas.width - 40, 20, 15, canvas.height);
    ctx.fillRect(20, 20, canvas.width - 45, 15);

    for (let i = 0; i < block_state.length; i++) {
        if (block_state[i].state == 1) {
            ctx.fillRect(block_state[i].x, block_state[i].y, block_state[i].w, block_state[i].h);
        }
    }

    //PADDLE
    if (PDx < 35) {
        PDx = 35;
    }
    if (PDx > canvas.width - 35 - PDw) {
        PDx = canvas.width - 35 - PDw;
    }
    ctx.fillRect(PDx, PDy, PDw, 15);


    for (let i = 0; i < ball.length; i++) {

        ball[i].x += ball[i].dx;
        ball[i].y += ball[i].dy;

        ctx.beginPath();
        ctx.arc(ball[i].x, ball[i].y, 12, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();

        for (let j = 0; j < block_state.length; j++) {
            if (block_state[j].state == 1) {
                res = collision(block_state[j].x, block_state[j].x + block_state[j].w, block_state[j].y, block_state[j].y + block_state[j].h, ball[i].x, ball[i].y, 12);
                if (res != false) {
                    block_state[j].state = 0;
                    if (res == 1) {
                        ball[i].dy *= -1;
                    } else {
                        ball[i].dx *= -1;
                    }
                    score++;
                    lv_score++;
                    break;
                }
            } else {
                block_state.splice(j, 1);
            }
        }

        //当たり判定たち(ブロック以外)
        if (ball[i].y - 12 <= 35) {
            ball[i].y = 35 + 12;
            ball[i].dy *= -1;
        }
        if (ball[i].x + 12 >= canvas.width - 35 || ball[i].x - 12 <= 35) {
            ball[i].dx *= -1;
            if (ball[i].x + 12 >= canvas.width - 35) {
                ball[i].x = canvas.width - 35 - 12;
            } else {
                ball[i].x = 35 + 12;
            }
        }

        if (ball[i].y + 12 - PDy > 3 && ball[i].y + 12 - PDy < 15 && ball[i].x + 12 >= PDx && ball[i].x - 12 <= PDx + PDw) {
            ball[i].dy = Math.abs(ball[i].dy) * -1;
            let half = PDw / 2;
            if (ball[i].x < PDx + half) {
                ball[i].dx = Math.abs(((half + 12) / 2) / (ball[i].x - (PDx - 12)) * ball[i].dy) * -1;
                if (ball[i].dx < ball[i].dy * 1.3) {
                    ball[i].dx = ball[i].dy * 1.3
                }
            } else {
                ball[i].dx = Math.abs((ball[i].x - (PDx + half)) / ((half + 12) / 2) * ball[i].dy);
                if (ball[i].dx > ball[i].dy * -1.3) {
                    ball[i].dx = ball[i].dy * -1.3
                }
            }
        }

        if (ball[i].y + 12 >= canvas.height) {
            ball.splice(i, 1);
        }
    }

    if (lv_score > level_up[level]) {
        for (let i = 0; i < ball.length; i++) {
            if (ball[i].dy > 0) {
                ball[i].dy += 0.8;
            } else {
                ball[i].dy -= 0.8;
            }
        }
        level++;
        console.log('level up');
    }


    ctx.font = 'bold 20px sans-serif';
    ctx.fillStyle = '#fff';
    ctx.fillText('SCORE : ' + score, 50, canvas.height - 5)
    ctx.fillText('ROUND : ' + round, 790, canvas.height - 5);

    if (block_state.length == 0) {
        window.cancelAnimationFrame(id);
        setTimeout(round_clear, 1500);
    }
    if (ball.length == 0) {
        window.cancelAnimationFrame(id);
        block_state = [];
        setTimeout(over, 1500);
    }
}

function round_clear() {
    ball = [];
    level_up = [];
    lv_score = 0;
    round++;
    start();
}

function collision(L, R, T, B, x, y, radius) {
    if (L - radius > x || R + radius < x || T - radius > y || B + radius < y) {
        //矩形に円の半径分を足した範囲 
        return false;
    }
    if (L > x && T > y && !((L - x) * (L - x) + (T - y) * (T - y) < radius * radius)) {
        //左上の当たり判定 
        return false;
    }
    if (R < x && T > y && !((R - x) * (R - x) + (T - y) * (T - y) < radius * radius)) {
        //右上の当たり判定 
        return false;
    }
    if (L > x && B < y && !((L - x) * (L - x) + (B - y) * (B - y) < radius * radius)) {
        //左下の当たり判定 
        return false;
    }
    if (R < x && B < y && !((R - x) * (R - x) + (B - y) * (B - y) < radius * radius)) {
        //右下の当たり判定 
        return false;
    }

    if (x + 6 > L && x - 6 < R) {
        return 1;
    } else {
        return 2;
    }
}

document.addEventListener('keydown', keyDownHandler, false);
function keyDownHandler(e) {
    if (e.keyCode == 32 && game_flag == 0) {
        start();
        game_flag = 2;
    }
    if (e.keyCode == 13 && game_flag == 1) {
        init();
    }

    if ((e.keyCode == 37 || e.keyCode == 65) && PDx >= 35) {
        PDx -= 20;
        if (PDx < 35) {
            PDx = 35;
        }
    }
    if ((e.keyCode == 39 || e.keyCode == 68) && PDx <= canvas.width - 35 - PDw) {
        PDx += 20;
        if (PDx > canvas.width - 35) {
            PDx = canvas.width - 35;
        }
    }
}

document.addEventListener('mousemove', mouseMove, false);
function mouseMove(e) {
    PDx = e.offsetX - (PDw / 2) + 8
}

function over() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#FFF';
    ctx.fillRect(20, 20, 15, canvas.height);
    ctx.fillRect(canvas.width - 40, 20, 15, canvas.height);
    ctx.fillRect(20, 20, canvas.width - 45, 15);
    ctx.fillRect(PDx, PDy, PDw, 15);
    ctx.font = 'bold 80px sans-serif';
    let text = 'GAME OVER';
    let textWidth = ctx.measureText(text).width;
    ctx.fillText(text, (canvas.width - textWidth) / 2, 350);
    ctx.font = 'bold 50px sans-serif';
    text = 'SCORE : ' + score;
    textWidth = ctx.measureText(text).width;
    ctx.fillText(text, (canvas.width - textWidth) / 2, 450);
    game_flag = 1;
}


//CLASSES

class Block {
    constructor(x, y, w, h, state) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.state = state;
    }
}

let block_state = [];
function blockAdd(fcx, fcy, fcstate) {
    let b_x = fcx;
    let b_y = fcy;
    let b_w = 66;
    let b_h = 30;
    let b_state = fcstate;

    let b = new Block(b_x, b_y, b_w, b_h, b_state);
    block_state.push(b);
}

class Ball {
    constructor(x, y, dx, dy) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
    }
}

let ball = [];
function ballAdd() {
    let ball_x = 520;
    let ball_y = 700;
    let ball_dx = 0;
    let ball_dy = -2;

    let b = new Ball(ball_x, ball_y, ball_dx, ball_dy);
    ball.push(b);
}