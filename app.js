document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird')
    const ground = document.querySelector('.ground')
    const gameDisplay = document.querySelector('.game-container')

    let birdLeft = 220
    let birdBottom = 200
    let gravity = 2
    let isGameOver = false
    let gap = 440

    function startGame() {

        birdBottom -= gravity

        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }

    function jump() {
        if (birdBottom < 520) {
            birdBottom += 50
        }
        bird.style.bottom = birdBottom + 'px'
    }
    document.addEventListener('click', jump)
    let timerId = setInterval(startGame, 20)

    function generateObstacle() {
        let obstacleLeft = 500
        let randomHeight = Math.random() * 150
        console.log(randomHeight)
        let obstacleBottom = randomHeight
        const obstacle = document.createElement('div')
        const topObstacle = document.createElement('div')
        if (!isGameOver) {
            topObstacle.classList.add('topObstacle')
            obstacle.classList.add('obstacle')
        }
        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(topObstacle)
        topObstacle.style.left = obstacleLeft + 'px'
        obstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'
        topObstacle.style.bottom = obstacleBottom + gap + 'px'

        function moveObstacle() {
            let speed = 2
            obstacleLeft -= speed
            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'

            if (obstacleLeft === -60) {
                clearInterval(speedId)
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
            }
            if (
                obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 && (birdBottom < obstacleBottom + 151 || birdBottom > obstacleBottom + gap -220) ||
                birdBottom === 0
            ) {
                gameOver()
                clearInterval(speedId)
            }
        }
        let speedId = setInterval(moveObstacle, 20)
        setTimeout(generateObstacle, 3000)
    }
    generateObstacle()

    function gameOver() {
        console.log('gameover')
        clearInterval(timerId)
        isGameOver = true
        document.removeEventListener('click', jump)
    }
})