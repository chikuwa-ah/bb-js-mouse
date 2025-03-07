/** @type {HTMLCanvasElement}; */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let block_color = ['#fff', '#00f', '#0f9', '#ff0', '#f90', '#f00'];
let item_color = ['#0ff', '#0f0', '#00f', '#f0f', '#f00', '#ff0'];
let item_cmp = ['#f00', '#f0f', '#ff0', '#0f0', '#0ff', '#00f'];
let item__letter = ['S', 'W', 'N', 'B', 'F', 'O'];

let round_select = [];
let high_score = 0;

let level;
let PDx, PDy, PDw;
let lv_score = 0, score = 0, round = 1, life = 2;
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
    ctx.fillRect(80, 695, 100, 15);

    ctx.fillStyle = '#eee';
    ctx.font = 'bold 40px sans-serif';
    text = 'PRESS SPACE!!';
    textWidth = ctx.measureText(text).width;
    ctx.fillText(text, (canvas.width - textWidth) / 2, 450);

    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('HIGH SCORE : ' + high_score, 50, canvas.height - 5);

    game_flag = 0;
    lv_score = 0, score = 0, round = 1, level_up = [], life = 3;
    PDx = 80, PDy = 695, PDw = 100;
    for (let i = 0; i < temp.length; i++) {
        round_select[i] = 1;
    };
};


function start() {
    let x = 45, y = 120;
    level = 0, lv_score = 0;
    let block_length = 0;
    item_inBlock = [];
    let rest_round = 0;

    for (let i = 0; i < round_select.length; i++) {
        if (round_select[i] == 1) {
            rest_round++;
        }
    }

    if (rest_round == 0) {
        all_clear();
        return;
    }

    let stage = Math.floor(Math.random() * temp.length);
    while (round_select[stage] == 0) {
        stage = Math.floor(Math.random() * temp.length);
    }

    round_select[stage] = 0;

    for (let i = 0; i < temp[stage].length; i++) {
        for (let j = 0; j < temp[stage][i].length; j++) {
            let item = 0;
            if (Math.floor(Math.random() * 10) == 0 && temp[stage][i][j] >= 1) {
                item = Math.floor(Math.random() * 6) + 1;
            }
            blockAdd(x, y, temp[stage][i][j], item);
            x += 76;
            if (temp[stage][i][j] >= 1) {
                block_length += temp[stage][i][j];
            };
        };
        x = 45, y += 40;
    };

    PDx = 80, PDy = 695, PDw = 100;
    ballAdd(0, -2.6);
    let able = block_length;
    let ls = [];
    for (let i = 0; i < 6; i++) {
        able = block_length / 6;
        block_length -= able;
        ls.push(Math.floor(able));
    };
    let k = 0;
    for (let i = 0; i < ls.length; i++) {
        k += ls[5 - i];
        level_up[i] = k;
    };
    console.log(level_up, ls);
    main();

    console.log(round_select);
};



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
        if (block_state[i].state >= 1) {
            ctx.fillStyle = block_color[block_state[i].state - 1];
            ctx.fillRect(block_state[i].x, block_state[i].y, block_state[i].w, block_state[i].h);

            if (item_inBlock.length > 0) {
                for (let j = 0; j < item_inBlock.length; j++) {
                    res = collision(block_state[i].x, block_state[i].x + block_state[i].w, block_state[i].y, block_state[i].y + block_state[i].h, item_inBlock[j].x, item_inBlock[j].y, 12);
                    if (res != false) {
                        if (res == 1) {
                            item_inBlock[j].dy *= -1;
                        } else {
                            item_inBlock[j].dx *= -1;
                        };
                        break;
                    };
                }
            }
        };
    };


    if (item_inBlock.length > 0) {
        for (let i = 0; i < item_inBlock.length; i++) {
            item_inBlock[i].x += item_inBlock[i].dx;
            item_inBlock[i].y += item_inBlock[i].dy;

            ctx.fillStyle = item_color[item_inBlock[i].type - 1];
            ctx.beginPath();
            ctx.arc(item_inBlock[i].x, item_inBlock[i].y, 12, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = item_cmp[item_inBlock[i].type - 1];
            ctx.font = 'bold 18px sans-serif';
            let text = item__letter[item_inBlock[i].type - 1];
            let textWidth = ctx.measureText(text).width;
            ctx.fillText(text, ((24 - textWidth) / 2) + item_inBlock[i].x - 12, item_inBlock[i].y + 8);

            if (item_inBlock[i].y - 12 <= 35) {
                item_inBlock[i].y = 35 + 12;
                item_inBlock[i].dy *= -1;
            };
            if (item_inBlock[i].x + 12 >= canvas.width - 35 || item_inBlock[i].x - 12 <= 35) {
                item_inBlock[i].dx *= -1;
                if (item_inBlock[i].x + 12 >= canvas.width - 35) {
                    item_inBlock[i].x = canvas.width - 35 - 12;
                } else {
                    item_inBlock[i].x = 35 + 12;
                };
            };

            res = collision(PDx, PDx + PDw, PDy, PDy + 15, item_inBlock[i].x, item_inBlock[i].y, 12);
            if (res != false) {
                item_get(item_inBlock[i].type);
                item_inBlock.splice(i, 1);
            }

        }
    }


    ctx.fillStyle = '#fff';
    //PADDLE
    ctx.fillRect(PDx, PDy, PDw, 15);


    for (let i = 0; i < ball.length; i++) {

        ball[i].x += ball[i].dx;
        ball[i].y += ball[i].dy;

        ctx.beginPath();
        ctx.arc(ball[i].x, ball[i].y, 12, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();

        for (let j = 0; j < block_state.length; j++) {
            if (block_state[j].state >= 1) {
                res = collision(block_state[j].x, block_state[j].x + block_state[j].w, block_state[j].y, block_state[j].y + block_state[j].h, ball[i].x, ball[i].y, 12);
                if (res != false) {
                    block_state[j].state--;
                    if (res == 1) {
                        ball[i].dy *= -1;
                    } else {
                        ball[i].dx *= -1;
                    };
                    score += round;
                    lv_score++;
                    break;
                };
            } else {
                if (block_state[j].item >= 1) {
                    itemAdd(block_state[j].x, block_state[j].y, block_state[j].item);
                };
                block_state.splice(j, 1);
            };
        };

        //当たり判定たち(ブロック以外)
        if (ball[i].y - 12 <= 35) {
            ball[i].y = 35 + 12;
            ball[i].dy *= -1;
        };
        if (ball[i].x + 12 >= canvas.width - 35 || ball[i].x - 12 <= 35) {
            ball[i].dx *= -1;
            if (ball[i].x + 12 >= canvas.width - 35) {
                ball[i].x = canvas.width - 35 - 12;
            } else {
                ball[i].x = 35 + 12;
            };
        };

        if (ball[i].y + 12 - PDy > 3 && ball[i].y + 12 - PDy < 15 && ball[i].x + 12 >= PDx && ball[i].x - 12 <= PDx + PDw) {
            ball[i].dy = Math.abs(ball[i].dy) * -1;
            let half = PDw / 2;
            if (ball[i].x < PDx + half) {
                ball[i].dx = Math.abs(((half + 12) / 2) / (ball[i].x - (PDx - 12)) * ball[i].dy) * -1;
                if (ball[i].dx < ball[i].dy * 1.3) {
                    ball[i].dx = ball[i].dy * 1.3
                };
            } else {
                ball[i].dx = Math.abs((ball[i].x - (PDx + half)) / ((half + 12) / 2) * ball[i].dy);
                if (ball[i].dx > ball[i].dy * -1.3) {
                    ball[i].dx = ball[i].dy * -1.3
                };
            };
        };

        if (ball[i].y + 12 >= canvas.height) {
            ball.splice(i, 1);
        };
    };

    if (lv_score > level_up[level]) {
        for (let i = 0; i < ball.length; i++) {
            if (ball[i].dy > 0) {
                ball[i].dy += 0.8;
            } else {
                ball[i].dy -= 0.8;
            };
        };
        level++;
        console.log('level up');
    };


    ctx.font = 'bold 20px sans-serif';
    ctx.fillStyle = '#fff';
    ctx.fillText('SCORE : ' + score, 50, canvas.height - 5);
    ctx.fillText('ROUND : ' + round, 790, canvas.height - 5);

    ctx.beginPath();
    for (let i = 0; i < life; i++) {
        ctx.arc((i * 30) + 300, canvas.height - 12, 10, 0, 2 * Math.PI);
    }
    ctx.closePath();
    ctx.fill();

    if (block_state.length == 0) {
        window.cancelAnimationFrame(id);
        setTimeout(round_clear, 1500);
    };
    if (ball.length == 0) {
        window.cancelAnimationFrame(id);
        if (life == 0) {
            block_state = [];
            setTimeout(over, 1500);
        } else {
            life--;
            PDw = 100;
            item_inBlock = [];
            ballAdd(0, -2.6);

            level = 0, lv_score = 0;
            let block_length = block_state.length;
            let able = block_state.length;
            let ls = [];
            for (let i = 0; i < 6; i++) {
                able = block_length / 6;
                block_length -= able;
                ls.push(Math.floor(able));
            };
            let k = 0;
            for (let i = 0; i < ls.length; i++) {
                k += ls[5 - i];
                level_up[i] = k;
            };
            console.log(level_up, ls);
            setTimeout(main, 1000);
        }
    };
};

function item_get(type) {
    if (type == 1) {
        score += 1000;
        return;
    }
    if (type == 2) {
        PDw = 140;
        return;
    }
    if (type == 3) {
        PDw = 60;
        return;
    }
    if (type == 4) {
        let dy = ((Math.random() * 4) + 3) * -1;
        let dx = (Math.random() * (dy * 2)) - dy;
        ballAdd(dx, dy);
        return;
    }
    if (type == 5) {
        for (let i = 0; i < ball.length; i++) {
            if (ball[i].dy > 0) {
                ball[i].dy += 0.8;
            } else {
                ball[i].dy -= 0.8;
            };
        };
        return;
    }
    if (type == 6) {
        PDw = 100;
        return;
    }
}

function round_clear() {
    ball = [];
    item_inBlock = [];
    block_state = [];
    lv_score = 0;
    round++;
    start();
};

function collision(L, R, T, B, x, y, radius) {
    if (L - radius > x || R + radius < x || T - radius > y || B + radius < y) {
        //矩形に円の半径分を足した範囲 
        return false;
    };
    if (L > x && T > y && !((L - x) * (L - x) + (T - y) * (T - y) < radius * radius)) {
        //左上の当たり判定 
        return false;
    };
    if (R < x && T > y && !((R - x) * (R - x) + (T - y) * (T - y) < radius * radius)) {
        //右上の当たり判定 
        return false;
    };
    if (L > x && B < y && !((L - x) * (L - x) + (B - y) * (B - y) < radius * radius)) {
        //左下の当たり判定 
        return false;
    };
    if (R < x && B < y && !((R - x) * (R - x) + (B - y) * (B - y) < radius * radius)) {
        //右下の当たり判定 
        return false;
    };

    if (x + 6 > L && x - 6 < R) {
        return 1;
    } else {
        return 2;
    };
};

document.addEventListener('keydown', keyDownHandler, false);
function keyDownHandler(e) {
    if (e.keyCode == 32 && game_flag == 0) {
        start();
        game_flag = 2;
    };
    if (e.keyCode == 13 && game_flag == 1) {
        init();
    };

    if ((e.keyCode == 37 || e.keyCode == 65) && PDx >= 35) {
        PDx -= 20;
        if (PDx < 35) {
            PDx = 35;
        };
    };
    if ((e.keyCode == 39 || e.keyCode == 68) && PDx <= canvas.width - 35 - PDw) {
        PDx += 20;
        if (PDx > canvas.width - 35) {
            PDx = canvas.width - 35;
        };
    };
};

document.addEventListener('mousemove', mouseMove, false);
function mouseMove(e) {
    PDx = e.offsetX - (PDw / 2) + 8
    if (PDx < 35) {
        PDx = 35;
    };
    if (PDx > canvas.width - 35 - PDw) {
        PDx = canvas.width - 35 - PDw;
    };
    if (game_flag == false) {
        ctx.clearRect(35, 695, canvas.width - 75, 15);
        ctx.fillStyle = '#fff';
        ctx.fillRect(PDx, PDy, PDw, 15);
    };
};

function over() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#FFF';
    ctx.fillRect(20, 20, 15, canvas.height);
    ctx.fillRect(canvas.width - 40, 20, 15, canvas.height);
    ctx.fillRect(20, 20, canvas.width - 45, 15);
    ctx.fillRect(PDx, PDy, PDw, 15);
    let text, textWidth;
    if (score > high_score) {
        high_score = score;
        ctx.font = 'bold 50px sans-serif';
        text = 'HIGH SCORE!';
        textWidth = ctx.measureText(text).width;
        ctx.fillText(text, (canvas.width - textWidth) / 2, 180);
    }
    ctx.font = 'bold 80px sans-serif';
    text = 'GAME OVER';
    textWidth = ctx.measureText(text).width;
    ctx.fillText(text, (canvas.width - textWidth) / 2, 280);
    ctx.font = 'bold 50px sans-serif';
    text = 'SCORE : ' + score;
    textWidth = ctx.measureText(text).width;
    ctx.fillText(text, (canvas.width - textWidth) / 2, 380);
    text = 'ROUND : ' + round;
    textWidth = ctx.measureText(text).width;
    ctx.fillText(text, (canvas.width - textWidth) / 2, 450);
    ctx.font = 'bold 60px sans-serif';
    ctx.fillStyle = '#DDD';
    text = 'PRESS ENTER';
    textWidth = ctx.measureText(text).width;
    ctx.fillText(text, (canvas.width - textWidth) / 2, 550);
    game_flag = 1;

};

function all_clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#FFF';
    ctx.fillRect(20, 20, 15, canvas.height);
    ctx.fillRect(canvas.width - 40, 20, 15, canvas.height);
    ctx.fillRect(20, 20, canvas.width - 45, 15);
    ctx.fillRect(PDx, PDy, PDw, 15);
    ctx.font = 'bold 80px sans-serif';
    let text = 'ALL CLEAR!!!';
    let textWidth = ctx.measureText(text).width;
    ctx.fillText(text, (canvas.width - textWidth) / 2, 280);
    if (score > high_score) {
        high_score = score;
        ctx.font = 'bold 50px sans-serif';
        text = 'HIGH SCORE!!!';
        textWidth = ctx.measureText(text).width;
        ctx.fillText(text, (canvas.width - textWidth) / 2, 180);
    }
    ctx.font = 'bold 50px sans-serif';
    text = 'SCORE : ' + score;
    textWidth = ctx.measureText(text).width;
    ctx.fillText(text, (canvas.width - textWidth) / 2, 420);
    ctx.font = 'bold 60px sans-serif';
    ctx.fillStyle = '#DDD';
    text = 'PRESS ENTER';
    textWidth = ctx.measureText(text).width;
    ctx.fillText(text, (canvas.width - textWidth) / 2, 550);
    game_flag = 1;
};


//CLASSES

class Block {
    constructor(x, y, w, h, state, item) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.state = state;
        this.item = item;
    };
};

let block_state = [];
function blockAdd(fcx, fcy, fcstate, item) {
    let b_x = fcx;
    let b_y = fcy;
    let b_w = 66;
    let b_h = 30;
    let b_state = fcstate;
    let b_item = item;

    let b = new Block(b_x, b_y, b_w, b_h, b_state, b_item);
    block_state.push(b);
};

class Ball {
    constructor(x, y, dx, dy) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
    };
};

let ball = [];
function ballAdd(dx, dy) {
    let ball_x = 520;
    let ball_y = 700;
    let ball_dx = dx;
    let ball_dy = dy;

    let b = new Ball(ball_x, ball_y, ball_dx, ball_dy);
    ball.push(b);
};

class Item {
    constructor(x, y, dx, dy, type) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.type = type;
    };
};

let item_inBlock = [];
function itemAdd(x, y, type) {
    let item_x = x + 33;
    let item_y = y + 15;
    let item_dx = 0;
    if (Math.floor(Math.random() * 10) > 3) {
        item_dx = (Math.random() * 7) - 3;
    }
    let item_dy = 3;
    let item_type = type;

    let i = new Item(item_x, item_y, item_dx, item_dy, item_type);
    item_inBlock.push(i);
}

init();