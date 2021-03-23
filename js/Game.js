class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_img);
    players=[player1,player2];

        }
    
    play(){
        
        form.hide();

        

        Player.getPlayerInfo();
        image(back_img, 0, 0, 1000, 800);
        var x =100;
        var y=200;
        var index =0;
        drawSprites();

        

        for(var plr in allPlayers){
        
            index = index+1;
            x = 500-allPlayers[plr].distance;
            y=500;


            
            players[index -1].x = x;
            players[index - 1].y = y;

            // Differentiate the main player by printing
            if(index === player.index){
                fill("black");
                textSize(25);
                text(player.name,x-50,y+30);
            }
            // the name of the player on the basket. 
            if(player.index != null){
                for(var i = 0; i<fruitGroup.length; i++){
                    if(fruitGroup.get(i).isTouching(players[index -1])){
                        fruitGroup.get(i).destroy();
                        player.score++
                        player.update
                    }
                }
                for(var plr in allPlayers){
                    textSize(25);
                    fill("white");
                    text("Player 1:" , +allPlayers.player1.score,50,50);
                    text("Player 2:" , +allPlayers.player2.score,50,200);
                }
            }
            
        }

        

        // Give movements for the players using arrow keys

        if(keyDown(RIGHT_ARROW)&&player.index != null){
            player.distance-=10;
            player.update();
        }

        if(keyDown(LEFT_ARROW)&&player.index != null){
            player.distance+=10;
            player.update();
        }

        // Create and spawn fruits randomly

        if(frameCount%20 === 0){
            var fruit = createSprite(random(50,900),0,10,10);
            fruit.velocityY=6;
            var rand = Math.round(random(1,5));
            switch (rand){
                case 1:
                    fruit.addImage(fruit1_img);
                break;

                case 2:
                    fruit.addImage(fruit2_img);
                break;

                case 3:
                    fruit.addImage(fruit3_img);
                break;

                case 4:
                    fruit.addImage(fruit4_img);
                break;

                case 5:
                    fruit.addImage(fruit5_img);
                break;
            }
            fruitGroup.add(fruit);
        }
        
        
    }

    end(){
       console.log("Game Ended");
    }
}