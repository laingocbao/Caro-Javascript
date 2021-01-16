'use strict'
// import { checkWin } from './CheckScript.js';

var player = 1;
var isWinGame = false
var lineColor = "#ddd";
const NUMBER_CHARACTER_WIN = 5

const DEEP_LEVEL = 2

var canvas = document.getElementById('tic-tac-toe-board');
var context = canvas.getContext('2d');

var canvasSize = 700;
var sectionSize = canvasSize / NUMBER_ROW;
canvas.width = canvasSize;
canvas.height = canvasSize;
context.translate(0.5, 0.5);

function addPlayingPiece (mouse, playerCharacter) {
  var xCordinate;
  var yCordinate;

  for (var x = 0;x < NUMBER_ROW;x++) {
    for (var y = 0;y < NUMBER_ROW;y++) {
      xCordinate = x * sectionSize;
      yCordinate = y * sectionSize;

      if (
          mouse.x >= xCordinate && mouse.x <= xCordinate + sectionSize &&
          mouse.y >= yCordinate && mouse.y <= yCordinate + sectionSize
        ) {
            if (board[y][x] === CHARACTER.EMPTY) {
                clearPlayingArea(xCordinate, yCordinate);

                if (playerCharacter === CHARACTER.COMPUTER) {
                    drawX(xCordinate, yCordinate);
                    board[y][x] = CHARACTER.COMPUTER
                    player = 1
                } else {
                    drawO(xCordinate, yCordinate);
                    board[y][x] = CHARACTER.HUMAN
                    player = 2
                }                            
            }        
      }
    }
  }
}

function clearPlayingArea (xCordinate, yCordinate) {
  context.fillStyle = "#fff";
  context.fillRect(
    xCordinate,
    yCordinate,
    sectionSize,
    sectionSize
  ); 
}

function drawO (xCordinate, yCordinate) {
  var halfSectionSize = (0.5 * sectionSize);
  var centerX = xCordinate + halfSectionSize;
  var centerY = yCordinate + halfSectionSize;
  var offset = sectionSize * 0.6
  var radius = (sectionSize - offset) / 2;
  var startAngle = 0 * Math.PI; 
  var endAngle = 2 * Math.PI;

  context.lineWidth = 10;
  context.strokeStyle = "#01bBC2";
  context.beginPath();
  context.arc(centerX, centerY, radius, startAngle, endAngle);
  context.stroke();
}

function drawX (xCordinate, yCordinate) {
  context.strokeStyle = "#f1be32";

  context.beginPath();
  
  var offset = sectionSize * 0.3;
  context.moveTo(xCordinate + offset, yCordinate + offset);
  context.lineTo(xCordinate + sectionSize - offset, yCordinate + sectionSize - offset);

  context.moveTo(xCordinate + offset, yCordinate + sectionSize - offset);
  context.lineTo(xCordinate + sectionSize - offset, yCordinate + offset);

  context.stroke();
}

function drawLines (lineWidth, strokeStyle) {
  var lineStart = 4;
  var lineLenght = canvasSize - 5;
  context.lineWidth = lineWidth;
  context.lineCap = 'round';
  context.strokeStyle = strokeStyle;
  context.beginPath();

  /*
   * Horizontal lines 
   */
  for (var y = 1;y <= NUMBER_ROW - 1;y++) {  
    context.moveTo(lineStart, y * sectionSize);
    context.lineTo(lineLenght, y * sectionSize);
  }

  /*
   * Vertical lines 
   */
  for (var x = 1;x <= NUMBER_ROW - 1;x++) {
    context.moveTo(x * sectionSize, lineStart);
    context.lineTo(x * sectionSize, lineLenght);
  }

  context.stroke();
}

function drawInit(board){
    var xCordinate;
    var yCordinate;

    for (var x = 0;x < NUMBER_ROW;x++) {
        for (var y = 0;y < NUMBER_ROW;y++) {
          xCordinate = x * sectionSize;
          yCordinate = y * sectionSize;

          if (board[y][x] === CHARACTER.COMPUTER) {
              drawX(xCordinate, yCordinate)
          }
          else if (board[y][x] === CHARACTER.HUMAN){
              drawO(xCordinate, yCordinate)
          }
        }
    }

}

function clearAllBoardGame(board) {
    var xCordinate;
    var yCordinate;

    for (var x = 0;x < NUMBER_ROW;x++) {
        for (var y = 0;y < NUMBER_ROW;y++) {
          xCordinate = x * sectionSize;
          yCordinate = y * sectionSize;

          clearPlayingArea(xCordinate, yCordinate)
        }
    }
    drawLines(10, lineColor);
}

drawLines(10, lineColor);
drawInit(board)

function getCanvasMousePosition (event) {
  var rect = canvas.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
}

canvas.addEventListener('mouseup', function (event) {
    if (isWinGame == true) {
        return
    }
    var canvasMousePosition = getCanvasMousePosition(event);
    if (player == 1) {
        addPlayingPiece(canvasMousePosition, CHARACTER.HUMAN);
    }
    else {
        addPlayingPiece(canvasMousePosition, CHARACTER.COMPUTER);
    }

    checkWinLoseAndShowAlert(board)
    drawLines(10, lineColor);
    if (isWinGame == true) {
        return
    }

    computerPlayGame()
});

function copyArray(board) {
    var newArray = board.map(function(arr) {
        return arr.slice();
    });

    return newArray;
}

function computerPlayGame() {
    if (player == 1 || checkBoardGameFull(board)) {
        return 
    }
    var boardClone = board
    var result = alphaBetaPruning(boardClone, CHARACTER.COMPUTER, DEEP_LEVEL, -Math.pow(2, 53), Math.pow(2, 53))
    var index = result[0]
    var row = Math.floor(index/NUMBER_ROW)
    var col = index%NUMBER_ROW
    board[row][col] = CHARACTER.COMPUTER
    drawX(col * sectionSize, row * sectionSize)
    drawLines(10, lineColor);
    checkWinLoseAndShowAlert(board)
    player = 1
}

function checkWinLoseAndShowAlert (board) {
    if (checkWin(board) == true && isWinGame == false) {
        var image = document.getElementById('result');
        if (player === 1) {
            image.src = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEA8QEhIQFRAVFRIXFRcVFQ8VEhUSFRUWFhUSFhUYHSggGBolHRUWITIhJSkrLi4uGB8zODMtNygtLisBCgoKDg0OFw8QFy0dHSUtLS0tLS0tLS0rKy0tLS0rLS0tLS0tLS0tKy4rLSsrLS0rKystLS0tLTUtKy0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAACAwADAQAAAAAAAAAAAAAAAQIDBAUGBwj/xAA9EAABAwIEAwYCCAQGAwAAAAABAAIRAyEEEjFBUWFxBQYTIpGhgbEHFDJCUsHR8FNiguEVFiMzcqIkkvH/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAQIDBAX/xAAnEQEAAwACAQMDBAMAAAAAAAAAAQIRAxIhIjFRMkFSBBMjsWFxof/aAAwDAQACEQMRAD8A9dAThSAThdNYRRCnlThNFcIVkJQmiEJQppQgikpwlCuiKaacIIwowrIShBBKFZCUJojCIUoRCCMIhSSQKEQmhBFJTQqmIwiFJChiMJKaEMQShWQowqYhCUKyEkRXCgWq2EiFUU5UKyEJqY3oQAnC5OpITSQNEICaCJCUKZShNEIShWJQrqK1IBShJNCISTShUJCcIhBFClCIQRRClCIQRhKFOEQghCIUoRCaIwiE0K6IoUkJoihSQmiKRCnCUIIQoqxIhExXCFOEImNQUkgmFhsoRClCaKjCITlEohQhOEQilCSlCIQxGFEhWJImIZUZVNJBHKkQplKE0QQpIhXURQnCITQklKEQqEhOEQgjCIThCBQlCkhBGE4QhAoShSQgilClCSCKFJCui4KQQhYVIISCaKUITQgSaEIBCEkDSKaEEUKSSBQkQpIQxCEQppQiYihSShAkJwiECQnCIQRQpQlCBQiE4RCaIwiFJCaIwkppK6iKUKcJEK6IQhSQgtThEJrLQQhCAQmhRSQhCAQhZO1qr2UKz6Ymo1ji3e4E6bpohjO1aVIhr3Qd4vl0jNGkytoK8Vo9pVqtdoa4veXAAaNkkAgtHWbr2ilTyta2SYAEnUwIlc6X7N3p1xNCELprBITShECEIQCEIVCQmhAkJrr/AH5e9uDeWF4Ew8scWuDHNc2eklvz2UmchYjZxz6F5r3U7WcKtJrXuyueA5pMiHEDTYr0pZpftC3p1nAlCaFtgoRCaEChKFJCCKSlCUIFCE0kFqaE1NaJCcIhQJCE0AiEJgIIwhSRCDzvvR2LTw9dtWmwNZUMggABtTUtEacQOsaLtnd7tXx6cO/3W2cOI2d+91s7W7PbXo1KLtHCx/C4Xa74Fed9k46pRrFp8tekS17ToYsRzBt7FcJ9Ft+0vRX+SufeHpqFm7NxzazA9vRwOrTwP6rUu7z+xITQgSE1x3anbeHw5YK1VjC9zWgE3l0gEgfZbY+YwBxQcghZcB2jSrAuo1GPAJBynQgxBGoWpAITSQCpxZaKby8A0w12YG4LYuCN7K5dd75Y2KQoNPmqQTyY0z7kR8CpM5GtVrs46/3SwTTiaRy2YC4DZoAt6OIXoQXWe5dG1apvLW+kk/MLsyxxRlW+adscJJoK6uRJQmhEKEQmhURQmiETCQhCCxCEFwWWjAQlmCcoBCRcjMgaEpQSgaEmpygF0n6RO77ntGNw8+NTH+oBq+mPvRu5vuOgXdcyrdU4LNoiYxqszE7Dyruv3nLamsPjzNOjhw/Qr1TB4ltRjXsMtPtyPArzPvx3Lc1zsZgxEAufTbci8udTaBdu5aNItwWPut244tBD4fa7Tr+oXCtp4/EvRNY5Y2Pd69CIXD9i9uCqMj/LU/6u6c+S5Y1BxXoiYnzDzTWYnJNxAEnQXPRfNneDtQ4nEVarnudNR5aTP2C45GgfdAEADZfQfbuMFPC4moGl2WlUOUWJAaZvFl8yvdBIvwv8k0z7uyd0e2zhcZSqB3+lma2pAiaZs63Aa/0gr6FC+WKDiXNaNSQPVfS3YeP8TC4eoW5S6m0xMjSxB3BF55pv2WY+7kkLP4h4qjE4xtNpc90N9yeAG5TWW5xi50HyXmfbnamarUrO0NmD+UWb+vxK5zt3vNNGoxjSA4EZnEZsu9hpbmup93WDGYunTAmnT8z50DWkfOQPjyXHkv2ysPTxU6xNrPR+7GENPC0w77bpe7q64HpC5WFKEQu0RkY88zs6QTShEKoCElJQNQcQgaFW+sNrqv6zzCaNCSzuxWttFFmM4i3JXUakKn62zj800FTHKfirL4ykHLn2hry0isg1eAVIKkmiWZAcoqJcmi8OUTXVJdxRCnZVnjHiUm1uqrQp2kxbnSlVgqSdpMSBXn3fjuv4bjj8MC2DNZjdNb1QOH4h/VxXf04UnJjJWszWdh4x3i7xkUqdKmSHOAc8gkEyYayRcCxJ6AbrkOw+/wBiaLYrHx2AXz5Q5sC7Q9ok/wBWaSCqfpE7lPpPdi8O2cN5S9gkvoxq4CP9v5dNOkUsRYzvf4AT8wF6OLr1xx5ptN+z3PA9+cDVY7PVFIizm1QQLy0gGIeJBHzXQ+8vc2kcdXbReylSy03NY0BwbLRIAmwtPxXSaTpcBIJJBuRlMZpbfja3Ja/rLqBp1KRLTrqCLgA2IvzsdQl+LYmYnFpy5aItGu593O5VNuJpgkVB94OaMsfetefLI+K9QrV6dJvmdTpsaBqWta1ugtsLQF4PT7VrVHtqms8PF2uYXtjY5Q2CLkDQb6rjalX7Re57nuBu4uc4xAYS46mMyU4ZiNtJyc0TPph7F2v9IGGptPhZ6z4MQC2nNvtOdeLnRp0K4TsjvMcY97KwDaoBLMs5C2JLWgnXedwDpC6BVrCDvMH4GZ9QHH+pXd3nVH4zDtpguqOcQBIE+XzSToA0m/NavSvWYZ4727RLudenUxFX6vSb5jNz9kNGrydmj+y733f7Ep4SlkpgF5jxHwA57vyaJMDbrJJ2L2Y2gwyQ6s6PEcBrGjW/yj9SuRzBeWlM8vTy8k28R7LqdeNVacQFjLkgF1cmoYjjCicVwCohV1CrCND8QVmdVHUqtzikriaszk8gplwVQKkSpIiYk8EtkniVEm10E8iaz+N1TTJGF+KIDDa8TNran0VjsdcCDe3S0ytWJ7PwdSC/ISGub9t4gOEOFjvCuyYUfeZ/7nhHFfGjh5Py/wCvbtfhmbiTrCnTxWpXG9n95MHWr+C1rh9s5ifLY/nC5rPhvxt9StRx8n5JtfhW3EqbaqYqYb8Q9SgVcPMBw01kx0Wopy/ex6fgnVoUH4vQK0VKB++LW+0qMPXw7mh0ubOzpDrHcJnL+R6PhccSFEYsbqQOHP3/AHUKb6Dp8xEGL2mNxy5q/wA3yno+EnYiNpRTxMkhSyUf4n/YKD6dEtjxSOYIn1hN5t90yiypXhVPx4aGzbMYHW/6KluKwlPyl/EknOb8SSr8uGdDiWkaj7UCQfMOcErU/uz7Whcof1vQnQiy8T+kTsqnQxzhShtKq0VIAsxxkOaBwkB0bZoGi9sHgWBeCBpra0LzL6WsA0ChXa5jvM5lmkOyloIDnE3Iyuiy6cE8sXiLTsMckVzw8/bTNyyDsY6CDB13WnxpYWlhbDiHbAB1gIIsBPHYLGwRcEiZg/dPI/srU3EVQHNyEgi/ldfgSND8l9OJeS0NOFxga1oLSQNgctxxI1vyHVZqtPMC6IAm0RrIHPcmT/8AK21ng2YQTyIJ+IGb0KhWNS+aQDtP5TJVm0YzFfLd2D2Y7FYinh2ON5JcRZjBdziJv+ZIG69s7vdj4fB0/Do0yCYzvOU1Hni535Cw4LzP6NKJbVxNXK4lrAwQAftkuLTJEf7bV2v/ABfH+f8A8WmPKQ0+KSc2zoy6civn81+Sb5XIiHqpWsRsu34zGBrC7TW/CBP5Ljj2y2nhRWqGbSZjTX5Lz1+E7UkCXZRaMzSIOtibq3tHszG1W06bmtfTaZIs3Nl+yCOC4zHL2ie0NRaueYdxq99MMKvhioPLmz8BYEQd7LhKff0AVqrnNIEFjRbykDy9dV0zFdy8XmJZTsdswn1Kr/yTjPwD1XX9vfe6do+HpTO/eGh7nOiCLanhZZK30jYVrnDzkQMpAnb9V59/kvF/g+fqke5eL/hj1hbiue9/6Zmf8O24z6UGhrRTouLi0Zi4gAP3EbhTxf0mMz4fwmOyZj42YXDNBl5/e+ELpf8AlDF70iPX8kj3TxX8P5/ounp+Udzxf0oMlmSm8gVHZpi9KLEcHE/Jaez/AKS6T6wY6m5lMtd5iW2eCSJ5FsfFdAPdfFfwiq3d3cQNaZTxn1I9FofShhiBmp1mmYIAa6GwfNM32Ec0n/SRgyT/AKdfXXKNI1jNxsvNz2JW/AUf4NViSGjkSZ66K9o+THfK/wBJjQ5wZSc5gJDXSBIBsYOiF0QdkVeA9Ule9flMerMbz91ORy9Vgp1G6Az6qZDpHA814nZvY5vL2UxVCxNzR92Nybq1pI1e34INYqdfRPxOqyeL/MfbRWNcDpMdUGjxBHD0U2vH7hZJjh8VIO/mb7po15xzSFUcPVZQ89VLxojQepVGkVByUvEGyxOfJNz8lOmSmmOKxfY1V9RzvHYGOdOXK6YmYlc9SqAADYAD0CpdzcJ6fmgPHKfVMxWoOHJdd7/0M+Be4XdTfTeOk5HezyuXkakrL2rQNXD16YN303gdcpy+8LVJyYlmY8PHGuAlpnKb2ieThP7Kkyk+JbcciPlsoPFhaNxzabqDXGbGOdwvfrhi0036EO9IHqpNytuD5hq7b/i0RM81U5xNi6epJTF4F4Fzx6oY9C+jRwGHryIJq+wY2APddw8SdD8l1XuAwDCG13VXk6fhaPyXYHQvBzT65d6fS1F8bj4pFx2grF9ZjWfjoo/WW6j2N1z1ptcSqzVWfxr2J6JfWDEwD6BNGk1uaXj8yspxAAuInl+YURWadzyQbRWPEpOrO4rA8zcPHSCokkbg9CUMbjXfx+SrNd/7Cwmu7lHNQdiiOHummNrsU/l6FVOxruA9FlGLdMC/xSOLMwWwfgQmymNP1w8B+/ghY/rB/lQmiVOsSREAEA3IEE6DmbIdXLbF7AOPLVcLVqElkuc5xJ5N1Fp9FCji3FwaKbCZJMxAA0uR0+JWsHPNrB0jPN9gRxJueQUqGKaCROmxJMfquEpYh5MF46NBJE6C1tCU6WKdLmhoJBAi5dMyfNv/AGTFc9T7SHARxDSRGmpV/wBZ081p34/JcIKlVxa0DKcpuRA2g26xHJaaOBdfMRGozXGmyg3PxfOb7D06qX1t1oDRxkG/ArGaoEy0l1soAPHX5+iufioy3ABg6eYCJUHJF0DzOj1CXjtG87b9dFxdftBrYBkyeB1nj8FA4lsMe4xJFht/yVHLOrA3BE9LpDGAmA4c9FxjagcBDoub8jy42UK5a0SCIi/ONPmg5U4y8AtOkqbHgmRF1xVJjMgc6AQONhy5yimJE5o3aL2aePug5XPmMWiR1Vr64ECVxNIwJLpdsBp+xISqVg1j3ZrwSZ+JIVR5xiaIDnhsy17wBAIyScvsYWI0uGvCDKuqVPMXG067n+5VjT99hhw1An1Gy+n1h5e0wx5DwKvp07a62tMnf0tvHsVc95ffMQecZefMdIUSDsQToCBr00I/fJWK4k3mXfO6DcuGABMuc508dBA5WXM+IYuCD0+a6x3bxU0vDBcSzU6AE6QN9CuUOJDvK4OzNOs2McF83njOSXq452sOQqm1jw291TVo2EGDqYGo2WOvVLRu4RaNVNmIMZSSTEkxHRcmyLSdc29xoodHOPrqg1nC3mmdoiJidbqmpiC5zgbRsJknjrbZQavFGkkSJN1NkEEFwPoD0XHU6zgQLEDc/JKviHFrbgGTNhpZVG11J2z2xz6eyrbWcLEDNoLmPQqhrrF2YEASQdZ/ZSOJsbw4Rfa+9kGmpiiLW31mIVT8WCNRpaDvf9Fm8Umwewu0M5htZVGnYmYgjmBIvt1VwXurtzQWidZ67g8VXVxTZiSDzOsewWd0j70g3HDncjRZsQ50Xym/8unEELURCORZXsJN+oQuJ8d34Qeef+6FeprVTxJJkgQJ01g8/wClTY0uM32cb6EwY9wfikhWUaBQdaXxcj4CP7rk8MaYYHgXGnOJiUIU1Wc9sNztOUEuHDQD9j0U63aBIJgQ1ogyZNy0+4TQpIYrkNLwLCIM3JMCPf2UWVw4OgkQ8g8RYWB9EITFRq3DyyZE5i7UEmBHolQrtJYxxMnQgbX90ISQq2JIO8OsDbcwClvcSMhsY1M3shCR7DQ2HN8zQRExpaT+i1swoMEW1vfbkmhWCWfK4S4kZdrcZAKzdpkto1nuPlcHgAamWxPJCEr9UJb2l0Jo2A6X9iroyw7LLTxiYKEL6cezxz74dSkWQ7QOkWkRyN/3HxU6OGcTJ258R+5QhbiPOMb41zPd0ltSG3z+U6AaEj5fNc5WrZCTYg3JgzMhCF4f1cR3j/T1fp/pUtxMvh2xgRIGm46gqNcFrjwvoTM6j4XTQvM7ytw2JzEtNgPlPLqs9WBJOoDiDuYNr7XKEKYK3CDLXWvJ3JBuOkhVVqhIDWgSSeAAjVCEhGZmeHCRfXl0+CjXqkQ0k7Axa1pM8/1QhahFWIGUnI4yLX1mZifVU08W8CM5iDaDc8D+9k0LcRsImcSS1oki8SLRGluH6KNRxsRFomLanXoZQhMFcP1AaAbxrrdCEKj/2Q==";
        }
        else {
            image.src = "https://mir-s3-cdn-cf.behance.net/project_modules/fs/9b411963222729.5aa984fd77713.jpg";
        }
        isWinGame = true
    }
}

// Kiểm tra tiềm năng của một ô
// Một ô được gọi là tiềm năng khi ít nhất 1 trong 8 ô xung quanh nó phải khác trống 
// Việc kiểm tra này sẽ giúp giảm số tổ hợp không cần thiết
function checkPotentialCell(board, row, col) { 
    if (row - 1 >= 0 && col - 1 >= 0 && board[row -1][col - 1] != CHARACTER.EMPTY) {
        return true
    }

    if (row - 1 >= 0 && board[row -1][col] != CHARACTER.EMPTY) {
        return true
    }

    if (row - 1 >= 0 && col + 1 < NUMBER_ROW && board[row -1][col + 1] != CHARACTER.EMPTY) {
        return true
    }

    if (col + 1 < NUMBER_ROW && board[row][col + 1] != CHARACTER.EMPTY) {
        return true
    }

    if (row + 1 < NUMBER_ROW && col + 1 < NUMBER_ROW && board[row + 1][col + 1] != CHARACTER.EMPTY) {
        return true
    }

    if (row + 1 < NUMBER_ROW && board[row + 1][col] != CHARACTER.EMPTY) {
        return true
    }

    if (row + 1 < NUMBER_ROW && col - 1 >= 0 && board[row + 1][col - 1] != CHARACTER.EMPTY) {
        return true
    }

    if (col - 1 >= 0 && board[row][col - 1] != CHARACTER.EMPTY) {
        return true
    }
    return false
}

function checkBoardGameFull(board) {
    for (let i = 0; i < NUMBER_ROW; i++) {
        for (let j = 0; j < NUMBER_ROW; j++) { 
            if (board[i][j] == CHARACTER.EMPTY) {
                return false
            }
        }
    }
    return true
}

function alphaBetaPruning(boardTem, characterWillCheck, deepLevel, alpha, beta) { 
    var index = -1
    loop1:
    for (let i = 0; i < NUMBER_ROW; i++) {
        loop2:
        for (let j = 0; j < NUMBER_ROW; j++) {            
           if (boardTem[i][j] == CHARACTER.EMPTY) {
                // Nếu cell có tiềm năng thì mới thực hiện bước tiếp theo 
                if (!checkPotentialCell(boardTem, i, j)) {
                    continue
                }

                boardTem[i][j] = characterWillCheck

                var result = checkWin(boardTem)
                var score = 0

                if (deepLevel == DEEP_LEVEL && i == 5 && j == 8) {
                    console.log(i, j, score)
                }

                if (result) {
                    if (characterWillCheck == CHARACTER.COMPUTER) {
                        score = deepLevel
                    }
                    else {
                        score = -deepLevel
                    }
                }  
                else {
                    if (deepLevel >= 1 && !checkBoardGameFull(boardTem)) {
                        score = alphaBetaPruning(boardTem, characterWillCheck == CHARACTER.HUMAN ? CHARACTER.COMPUTER : CHARACTER.HUMAN, deepLevel - 1, alpha, beta)[1]
                    }
                    else {
                        // Khi hết DeepLevel hoặc bàn game đã đầy, thì ghi nhận lại index cuối cùng này, và trạng thái này là hòa, score sẽ bằng 0
                        score = 0
                    }
                }   
                boardTem[i][j] = CHARACTER.EMPTY          
                
                if (characterWillCheck == CHARACTER.COMPUTER && score >= alpha) {
                    alpha = score
                    index = i * NUMBER_ROW + j
                }
                else if (characterWillCheck == CHARACTER.HUMAN && score <= beta) {
                    beta = score
                    index = i * NUMBER_ROW + j
                }   
                else {
                    break loop1
                } 

                // if (alpha >= beta){
                //     return [-1, 0]
                // }            
            }           
        }
    }
    if (index == -1 &&
            ((characterWillCheck == CHARACTER.COMPUTER && alpha == -Math.pow(2, 53))
            || (characterWillCheck == CHARACTER.HUMAN && beta == Math.pow(2, 53)))
       ) {
    // if (index == -1 && alpha == -Math.pow(2, 53) && beta == Math.pow(2, 53)) {
        return [index, 0]
    }
    else if (characterWillCheck == CHARACTER.COMPUTER) {
        return [index, alpha]
    }
    else if (characterWillCheck == CHARACTER.HUMAN) {
        return [index, beta]
    }
}

// player = 2
// computerPlayGame()
// board[5][8] = CHARACTER.COMPUTER
// board[13][13] = CHARACTER.HUMAN
// console.log(checkWin(board))
    var result = alphaBetaPruning(board, CHARACTER.COMPUTER, DEEP_LEVEL, -Math.pow(2, 53), Math.pow(2, 53))
    console.log(Math.floor(result[0] / NUMBER_ROW), result[0] % NUMBER_ROW, result[1])
// board[0][2] = CHARACTER.EMPTY

// board[0][3] = CHARACTER.COMPUTER
// console.log(alphaBetaPruning(board, CHARACTER.HUMAN, DEEP_LEVEL, -Math.pow(2, 53), Math.pow(2, 53)))

// board[0][2] = CHARACTER.COMPUTER
// console.log(alphaBetaPruning(board, CHARACTER.HUMAN, DEEP_LEVEL, -Math.pow(2, 53), Math.pow(2, 53)))
// board[0][2] = CHARACTER.EMPTY

// board[3][0] = CHARACTER.COMPUTER
// console.log(alphaBetaPruning(board, CHARACTER.HUMAN, DEEP_LEVEL, -Math.pow(2, 53), Math.pow(2, 53)))