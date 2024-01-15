class gameScene extends Phaser.Scene{
    constructor(){
       super( ) 
       this.currentUser = {
        name:'علاء الرمضاني',
        diamonds:0
       }
       this.levels={
        level1:{
            

            maxDiamond:1,
            minDiamond:5,
            shownCards:4,
            numberOfChoosenCards:1,
            stages:{
                
            unlocked:1,
            total:9 
            }
        },
        level2:{
            maxDiamond:2,
            minDiamond:2,
            shownCards:8,
            numberOfChoosenCards:1,
            
            stages:{
            unlocked:0,
            total:9 
            }
        },
        level3:{
            maxDiamond:3,
            minDiamond:3,
            shownCards:4,
            numberOfChoosenCards:2,
            stages:{
            unlocked:0,
            total:9 
            }
        },
        level4:{
            maxDiamond:4,
            minDiamond:4,
            shownCards:8,
            numberOfChoosenCards:2,
            stages:{
            unlocked:0,
            total:9 
            }
        }
        
    }
    this.menu={
        currentLevel:1,
        numberOfLevels:4,
        stageBoxes:{
            level1:[],
            level2:[],
            level3:[],
            level4:[]
        }
    }    
    }
    preload(){
        this.load.atlas('menu', './assets/othertheme/Asset 61.png', 'assets/menu.json')
        this.load.image('diamond', './assets/othertheme/diamond.png')
        this.load.image('flipped', './assets/othertheme/flipped.png')
        for(let i=1;i<=8;i++){
            this.load.image(`image${i}`,`./assets/othertheme/image${i}.png`)
        }
        this.load.audio('backgroundMusic','./assets/sounds/background.webm')
        this.load.audioSprite('sfx', 'assets/sounds/soundSheet.json');  
        this.load.audio('correct','./assets/sounds/correcta.webm')
        this.load.audio('gameover','./assets/sounds/gameover.webm')
        this.load.audio('flipCard','./assets/sounds/girar2.webm')
        this.load.audio('win','./assets/sounds/win.webm')
        this.load.audio('wrong','./assets/sounds/worng.webm')
        this.load.audio('diamondEffect','./assets/sounds/6YMoS3pB03m_44100_48_0.mp3')
        
        this.load.atlas('flares', 'assets/flares.png', 'assets/flares.json');
        this.load.spritesheet('boom', 'assets/othertheme/explosion.png', { frameWidth: 64, frameHeight: 64, endFrame: 23 });
    
 
        
    }
    initializeSound(){
        this.soundgameover = this.sound.add('gameover')
        this.soundCorrect = this.sound.add('correct')
        this.soundWin = this.sound.add('win')
        this.soundWrong = this.sound.add('wrong')
        this.soundFlipCard = this.sound.add('flipCard')
        this.backgroundMusic = this.sound.add('backgroundMusic')
        this.soundDiamond = this.sound.add('diamondEffect')
       
        this.backgroundMusic.loop=true        
        
        this.backgroundMusic.play()
        this.btnClickMusic=this.sound.addAudioSprite('sfx')
    }
    initializeBackground(){
        
      const graphics = this.add.graphics()
      graphics.fillGradientStyle(0x05050E,0x05050E,0x331919,0x331919,1)
      let rectangle = graphics.fillRect(0,0,1152,1152)
      graphics.fillStyle(0xffffff,0.4)
      let menuRectangle = graphics.fillRoundedRect(118,18,909,124)  
      graphics.fillStyle(0x3F2330,1)
        
      let menuRectangle2 = graphics.fillRoundedRect(120,20,905,120)  
      graphics.fillStyle(0xffffff,0.4)
      let menuRectangle3 = graphics.fillRoundedRect(118,158,909,905)  
      graphics.fillStyle(0x3F2330,1)
       
      let menuRectangle4 = graphics.fillRoundedRect(120,160,905,900)  
      this.menuSprite = this.add.sprite(178,75,'menu','leave')
      this.nameText = this.add.text(900, 50, this.currentUser.name , {
        fontSize: '40px',
        fontFamily: 'Asmaa',
        color: '#ffffff',
      }).setOrigin(0.5) 
      this.diamondSprite = this.add.sprite(950,110,'diamond').setScale(0.7)
      this.totalDiamond = this.add.text(870, 110, this.currentUser.diamonds , {
        fontSize: '40px',
        fontFamily: 'Asmaa',
        color: '#ffffff',
      }).setOrigin(0.5) 
      
      this.levelText = this.add.text(600, 200, this.menu.currentLevel+' المستوى' , {
        fontSize: '50px',
        fontFamily: 'Asmaa',
        color: '#ffffff',
      }).setOrigin(0.5) 
      this.anims.create({
        key: 'explode',
        frames: 'boom',
        frameRate: 40,
        showOnStart: true,
        hideOnComplete: true
     });
      
    }
    setLevelBoxes(x,y,level){
        let offsetY=-1
        let offsetX=0
          
        for(let i=0;i<this.levels['level'+level].stages.total;i++){
            if(offsetX%3==0){
                offsetX=0
                offsetY++
            } 
           
            if(this.levels['level'+level].stages.unlocked>=i+1){
                let box = this.createLevelBox(x+(offsetX*200),(200*offsetY)+y,false)
                let text = this.add.text(x+(offsetX*200)-10, ((200*offsetY)+y)-35, i+1 , {
                   
                    fontSize: '60px',
                    fontFamily: 'Asmaa',
                    color: '#ffffff',
                })
                this.menu.stageBoxes['level'+level].push({box,text})
                box.on('pointerdown',()=>{
                    this.playingLevel=level
                    this.playingStage = i+1
                    this.destroyMenu()
                    document.querySelector('body').requestFullscreen().then(()=>{ console.log('ala')}).catch(e=>{alert('full screen not supported') })
                    this.setGame()
                })
                
            }
            else{
                this.menu.stageBoxes['level'+level].push({box:this.createLevelBox(x+(offsetX*200),(200*offsetY)+y,true)})
            }
            

            offsetX++
        }
        

    }
    createLevelBox(x,y,isLocked){
        let box
        if(isLocked){
            box =  this.add.image(x,y,'menu','locked')  
        }
        else{
            box =  this.add.image(x,y,'menu','unlocked')  
            

        
        }
        box.setInteractive()
        
        return box

                                        
    }
    navigateAnimation(){
        const graphics  = this.add.graphics()
        graphics.fillStyle(0x171515,1) ;
        
        const rect = graphics.fillRoundedRect(118,158,909,905).setAlpha(0)
           
        let tween = this.tweens.add({
           targets: rect,
           props:{
               alpha:{ value:1, duration: 1000, yoyo: true },
                
            },
           yoyo: true,
        });
        return tween
       
    }
    destroyMenu(){
        Object.keys(this.menu.stageBoxes).forEach(level=>{
            this.menu.stageBoxes[level].forEach(sprite=>{
                 sprite.box.destroy()
                 if(sprite.text){
                    sprite.text.destroy()
                 }
            }) 
        })
        this.menuCircles.forEach(c=>{
            c.destroy()
        })
        this.menuCircles.length=0
        
        this.movingMenuCircle.destroy()
        this.movingMenuCircle=undefined
       

        this.afterButton.visible=false
        this.beforeButton.visible=false
    }
    
    setGame(){
           
        let tween = this.navigateAnimation()
        
        
        let partOneStarted = false
        tween.on(Phaser.Tweens.Events.TWEEN_UPDATE,()=>{
            if(tween.progress>=0.6 && !partOneStarted){
                this.setGamePart1()
                partOneStarted=true
             }
        })
        tween.on(Phaser.Tweens.Events.TWEEN_COMPLETE,()=>{
            
            this.setGamePart2()
        })
        

    }
    getRundomNumbers(num,max){
        let arr = []
        do{
          let rand = Math.floor(Math.random()*max)
          if(!rand){
            rand++
          }
          if(!arr.includes(`image${rand}`)){
            arr.push(`image${rand}`)
          }  
        }while(arr.length<num)
        return arr
    }
    setGamePart1(){
        
       
        
        this.gameArray=[]
        this.gameConf = {
            gameStarted:false,
            flippedCardNumber:0,
            choosenCards:[],
            choosenCardsSprites:[],
            currentTweens:[]
            
        }
       
        let {shownCards,numberOfChoosenCards} = this.levels['level'+this.playingLevel]
        this.gameConf.choosenCards = this.getRundomNumbers(numberOfChoosenCards,(16/(shownCards/numberOfChoosenCards)))
    
       this.levelText.setText(`نحن نبحث عن`)
      this.gameConf.choosenCards.forEach((c,index)=>{
            this.gameConf.choosenCardsSprites.push(this.add.sprite((this.levelText.x-150)-(index*100),this.levelText.y,c).setScale(0.5))
       })       
    }
    setGamePart2(){
        this.menuSprite = this.add.sprite(170,230,'menu','menu').setInteractive()
        this.restartSprite = this.add.sprite(970,230,'menu','restart').setInteractive()
        
      
        this.menuSprite.on('pointerdown',()=>{
            this.stopGameScreen()
            this.backToMenu()
               
        })
       this.restartSprite.on('pointerdown',()=>{

             
               this.stopGameScreen()
               this.restartLevel()
          
       })
        let {shownCards,numberOfChoosenCards} = this.levels['level'+this.playingLevel]
        let tweensNumber = 0
        for(let i=0;i<(16/(shownCards/numberOfChoosenCards));i++){
                for(let j=0;j<(shownCards/numberOfChoosenCards);j++){
                    this.gameArray.push(`image${i+1}`)
                }              
        }
        
        let offsetY = 0
        this.gameArray.map(i=>{
            return {image:i,sort:Math.random()} 
        }).sort((a,b)=>{
            return a.sort-b.sort
        }).map(i=>{return {texture:i.image,clickable:true,isFlipped:true}}).forEach((box,index)=>{
            
            if(index%4==0 && index!=0){
                offsetY++
            }
            box.sprite = this.add.sprite(350+((index%4)*150),350+(offsetY*180),'flipped').setScale(0)
            
            box.sprite.setInteractive()
            box.sprite.on('pointerdown',()=>{
               if(this.gameConf.gameStarted && box.clickable){
                    box.clickable=false  
                    this.flipCard(box).on(Phaser.Tweens.Events.TWEEN_COMPLETE,()=>{
                        this.manageCard(box,index)
                    })
               }
            })
            this.gameArray[index] = box
            let cartTween =  this.tweens.add({
                targets: box.sprite,
                props:{
                    scaleX:{ value:1, duration: 200},
                    scaleY:{ value:1, duration: 200}
                     
                 },
                 delay:index*200
                 
             })
             
             cartTween.on(Phaser.Tweens.Events.TWEEN_COMPLETE,()=>{
                tweensNumber++
                if(tweensNumber>=16){
                    
                    this.setGamePart3()
                }
             })
             this.gameConf.currentTweens.push(cartTween)



         })
    }
    winTextEffect(){

        this.rendredMessage =  this.add.text(600, 525, 'فوز رائع', {
                   
            fontSize: '100px',
            fontFamily: 'Asmaa',
            color: '#ffffff',
        }).setOrigin(0.5).setScale(0.1)
        let tween = this.tweens.add({
            targets: this.rendredMessage,
            props:{
                scale:{value:1,duration:200}
            }

        })
        tween.on(Phaser.Tweens.Events.TWEEN_COMPLETE,()=>{
          
            setTimeout(()=>{
                //this.levels['level1'].stages.total
                
                this.diamondEffect()
                
            },1000)
        })
        

    }
    diamondEffect(){
       let winDiamonds = []
        let diamondNumber
        
        if(this.playingStage>=5){
            diamondNumber = this.levels['level'+this.playingLevel].maxDiamond    
        } 
        else{
            diamondNumber = this.levels['level'+this.playingLevel].minDiamond    
            
        }
        for(let i= 0;i<diamondNumber;i++){
            let diamond = this.add.image(this.rendredMessage.x-200,this.rendredMessage.y,'diamond').setAlpha(0)
            
            winDiamonds.push(diamond)
            
            
        }
        let diamondTween = this.tweens.add({
            targets:winDiamonds,
            props:{
                alpha:{value:1,duration:1000}
            }
        })
        diamondTween.on(Phaser.Tweens.Events.TWEEN_COMPLETE,()=>{
            winDiamonds.forEach((d,i)=>{
                let tween = this.tweens.add({
                    targets:d,
                    props:{
                        x:{ value:this.diamondSprite.x, duration: 200},
                        y:{ value:this.diamondSprite.y, duration: 200},
                         
                    },
                    delay:100+(i*200)
                })
                tween.on(Phaser.Tweens.Events.TWEEN_COMPLETE,()=>{
                    this.soundDiamond.play()
                    this.currentUser.diamonds++
                    this.totalDiamond.setText(this.currentUser.diamonds) 
                    if(i===winDiamonds.length-1){
                       let {next,bigRect,smallRect} =  this.createNextLevelButton()
                        next.on('pointerdown',()=>{
                            bigRect.destroy()
                            smallRect.destroy()
                            next.destroy()
                            winDiamonds.forEach(wd=>{
                                wd.destroy()
                                this.rendredMessage.destroy()
                                
                            })
                            this.passToNextLevel()
                            
                        })
                    }  
                })
            })      
         })
    }
    passToNextLevel(){
        if(this.playingStage<this.levels['level'+this.playingLevel].stages.total){
            this.playingStage++
          
            this.setGame()
        }
        else{
            if(this.playingLevel>=this.menu.numberOfLevels){
                this.backToMenu()
            }
            else{
                this.playingLevel++;
                this.playingStage=1
                this.setGame()
            }
        }
    }
    winEffect(){
        if(this.levels[`level${this.playingLevel}`].stages.unlocked===this.playingStage){
            if(this.levels[`level${this.playingLevel}`].stages.unlocked===this.levels[`level${this.playingLevel}`].stages.total){
               if(this.levels[`level${this.playingLevel+1}`] && this.levels[`level${this.playingLevel+1}`].stages.unlocked===0){
                this.levels[`level${this.playingLevel+1}`].stages.unlocked++
               }
            }
            else{
                this.levels[`level${this.playingLevel}`].stages.unlocked++    
            }

        }
        
            this.WinEmitter = this.add.particles(600, 525, 'flares', {
                frame: [ 'red', 'yellow', 'green' ],
                lifespan: 1000,
                speed: { min: 150, max: 250 },
                scale: { start: 0.8, end: 0 },
                gravityY: 150,
                blendMode: 'ADD',
                emitting: false
            });
            let winTween =this.destroyGameAnimation() 
            let exploaded = false
            winTween.on(Phaser.Tweens.Events.TWEEN_UPDATE,()=>{
                if(winTween.progress>=0.4 ){
                    this.WinEmitter.explode(16)
                    if(!exploaded){
                        this.soundWin.play()
                        exploaded=true
                    }    
                }
                
            })
            winTween.on(Phaser.Tweens.Events.TWEEN_COMPLETE,()=>{
                this.gameArray.forEach(c=>{
                    c.sprite.destroy()
                })
                this.winTextEffect()
                
            })
           
           
       
        
        


        
    }
    manageCard(card,index){
        
        if(this.gameConf.choosenCards.includes(card.texture)){
            this.gameConf.flippedCardNumber++
            this.soundCorrect.play()
            if(this.gameConf.flippedCardNumber>=this.levels['level'+this.playingLevel].shownCards){
                this.gameConf.gameStarted=false
                //this.soundWin.play()
                
              
                this.winEffect()
                
            }    
        }

        else{

            this.soundWrong.play() 
            this.soundgameover.play()
            this.add.sprite(card.sprite.x, card.sprite.y).setScale(4).play('explode');
            card.sprite.destroy()
            this.gameConf.gameStarted=false
            this.destroyGameAnimation().on(Phaser.Tweens.Events.TWEEN_COMPLETE,()=>{
                this.gameArray.forEach(c=>{
                    c.sprite.destroy()
                })
               
               this.loseTextEffect()

            })    
          //  this.backToMenu()
        }
        

    }
    
    loseTextEffect(){
      
        this.rendredMessage =  this.add.text(600, 525, 'ربما في مرة أخرى', {
                   
            fontSize: '100px',
            fontFamily: 'Asmaa',
            color: '#ffffff',
        }).setOrigin(0.5).setScale(0.1)
        let tween = this.tweens.add({
            targets: this.rendredMessage,
            props:{
                scale:{value:1,duration:200}
            }

        })
        tween.on(Phaser.Tweens.Events.TWEEN_COMPLETE,()=>{

                let restartButton = this.add.sprite(this.rendredMessage.x+40,this.rendredMessage.y+100,'menu','restart').setAlpha(0).setInteractive()
            let menuButton = this.add.sprite(this.rendredMessage.x-40,this.rendredMessage.y+100,'menu','menu').setAlpha(0).setInteractive()
            
            let tween= this.tweens.add({
                targets:[restartButton,menuButton],
                props:{
                    alpha:{value:1,duration:1000}
                },
                delay:1000
            })
            restartButton.on('pointerdown',()=>{
                tween.stop()
                restartButton.destroy()
                menuButton.destroy()
                this.rendredMessage.destroy()

                this.setGame()
                
            })
            menuButton.on('pointerdown',()=>{
                tween.stop()
                restartButton.destroy()
                menuButton.destroy()
                this.rendredMessage.destroy()
                this.startMenu()
                
            })


        })

       
    }
    
    destroyGameAnimation(){
            this.gameConf.choosenCardsSprites.forEach(s=>{
                    
                s.destroy()
            })
            this.gameConf.gameStarted=false
            this.gameConf.choosenCardsSprites.length=0
            this.menuSprite.destroy()          
            this.restartSprite.destroy()
            this.menuSprite=undefined
            this.restartSprite=undefined
            this.levelText.setText('')
           
            let tween  = this.tweens.add({
                targets:this.gameArray.map(i=>i.sprite),
                props:{
                    alpha:{ value:0, duration: 1000 },
                }
            })
            return tween
    }
    destroyGame(){
        this.gameConf.gameStarted=false
        this.gameArray.forEach(i=>{
            i.sprite.destroy()
            }) 
           
            this.gameConf.choosenCardsSprites.forEach(s=>{
                s.destroy()
                })
        this.gameConf.choosenCardsSprites.length=0
           this.menuSprite.destroy()          
           this.restartSprite.destroy()
           this.menuSprite=undefined
           this.restartSprite=undefined
           this.levelText.setText('')
           

    }
    backToMenu(){
    
        let tween = this.navigateAnimation()
        this.destroyGame()
        let back = false
        tween.on(Phaser.Tweens.Events.TWEEN_UPDATE,()=>{
            if(tween.progress>0.6 && !back){
                back=true
                this.startMenu() 
            }    
        })
          
    }
    restartLevel(){
        
           this.destroyGame()
           this.setGame()
    }
    createNextLevelButton(){
        const graphics = this.add.graphics()
        graphics.fillStyle(0xffffff)
       let bigRect =  graphics.fillRoundedRect(470,600,250,80,40)
        graphics.fillStyle(0x9A2A2A)
        let smallRect = graphics.fillRoundedRect(472,602,246,76,40)
        let next = this.add.text(600, 625, 'المستوى القادم', {
                   
            fontSize: '40px',
            fontFamily: 'Asmaa',
            color: '#ffffff',
        }).setOrigin(0.5).setInteractive()
        return {next,bigRect,smallRect}

    }
    setGamePart3(){
        
        
        
        setTimeout(()=>{
          this.hint()
        },1000)
    }
    hint(){
        
        let completedTeweensNumber =0
        let cardsToShow
        if(this.playingStage<5){
            cardsToShow = this.gameArray.filter(g=>this.gameConf.choosenCards.includes(g.texture))
        }
        else{
            cardsToShow = this.gameArray
         }
         cardsToShow.forEach(i=>{
            this.gameConf.currentTweens.push(this.flipCard(i))
            
            setTimeout(()=>{
                completedTeweensNumber++
                let tween = this.flipBackCard(i)
                this.gameConf.currentTweens.push(tween)
                
                tween.on(Phaser.Tweens.Events.TWEEN_COMPLETE,()=>{
                    if(completedTeweensNumber>=cardsToShow.length){
                        this.gameConf.gameStarted=true
                    }
                })
                
            },1000)
        })
       
       
      



       
    }
    setLevelsCircles(){
        this.levelCircles = []
        this.menuCircles = []
        this.offsetMenuCircle = (this.afterButton.x-(this.beforeButton.x+200))/5
    //    graphics.fillStyle()
        for(let i=1;i<=4;i++){
            if(this.menu.currentLevel===i){
                this.movingMenuCircle =this.add.circle(100+this.beforeButton.x+(this.offsetMenuCircle*i),this.beforeButton.y,25,0xffffff)   
            }
            this.menuCircles.push(this.add.circle(100+this.beforeButton.x+(this.offsetMenuCircle*i),this.beforeButton.y,20,0xc23b22))     
            
        }
    
    }
    setNext(){
        this.menu.currentLevel++
        
        this.movingMenuCircle.setX(this.movingMenuCircle.x+this.offsetMenuCircle)
        Object.keys(this.menu.stageBoxes).forEach(level=>{
            this.menu.stageBoxes[level].forEach(sprite=>{
                 sprite.box.x-=1000
                 if(sprite.text){
                    sprite.text.x-=1000
                 }
            }) 
        })
    
    }
    setPrevious(){
        this.menu.currentLevel--

        this.movingMenuCircle.setX(this.movingMenuCircle.x-this.offsetMenuCircle)
    
        Object.keys(this.menu.stageBoxes).forEach(level=>{
            this.menu.stageBoxes[level].forEach(sprite=>{
                sprite.box.x+=1000
                if(sprite.text){
                    sprite.text.x+=1000
                 }
             })

        })
    }
    
    startMenu(){
        for(let i=1;i<=this.menu.numberOfLevels;i++){
            if(i<this.menu.currentLevel){
                this.setLevelBoxes(400 - ((this.menu.currentLevel -i)*1000),350,i)
            }
            else{
                this.setLevelBoxes(400 + ((i -this.menu.currentLevel)*1000),350,i)
            }
        } 
        if(this.beforeButton===undefined){
            this.beforeButton =  this.add.sprite(260,900,'menu','after').setInteractive().setScale(1.2)  
            this.beforeButton.on('pointerdown',()=>{
            
                if(this.menu.currentLevel>1){
                    this.btnClickMusic.play('btnclick')
                    this.setPrevious()
                    this.levelText.setText(this.menu.currentLevel+' '+ 'المستوى')
                }
            })
        }
        else{
            this.beforeButton.visible=true    
        }
        if(this.afterButton===undefined){
            this.afterButton =  this.add.sprite(930,900,'menu','after').setInteractive().setScale(1.2)
            this.afterButton.flipX=true  
            this.afterButton.on('pointerdown',()=>{
            
                if(this.menu.currentLevel<this.menu.numberOfLevels){
                    this.btnClickMusic.play('btnclick')
                    this.setNext()
                    this.levelText.setText(this.menu.currentLevel+' '+ 'المستوى')
                    
                }
                
            })
        }
        else{
            this.afterButton.visible=true    
        }

        this.setLevelsCircles()
      
        
        if(!this.levelText){
           this.levelText = this.add.text(600, 200, this.menu.currentLevel+' '+ 'المستوى' , {
               fontSize: '50px',
               fontFamily: 'Asmaa',
               color: '#ffffff',
             }).setOrigin(0.5) 
            
        }
        else{
            this.levelText.setText(this.menu.currentLevel+' '+ 'المستوى' )
        }
        
        
      
  
        
    }
    create(){
       // document.querySelector('body').requestFullscreen()
            this.initializeBackground()
            this.initializeSound()
            
            this.startMenu()
            //this.setGame()
            
        
    }
    flipCard(card){
        this.soundFlipCard.play()
        let tween = this.tweens.add({
            targets:card.sprite,
            props: {
                scaleY: { value: 0, duration: 200, yoyo: true },
                
            },
            ease: 'Linear'
        }) 
        tween.on('yoyo',()=>{
           if(card.sprite.active){
            card.sprite.setTexture(card.texture)
         
           }
           
        })
        
        return tween
        
    }
    flipBackCard(card){
        this.soundFlipCard.play()
       
        let tween =    this.tweens.add({
            targets:card.sprite,
            props: {
                scaleY: { value: 0, duration: 200, yoyo: true },
            },
            ease: 'Linear'
        })
        tween.on('yoyo',()=>{
            if(card.sprite.active){
                card.sprite.setTexture('flipped')
            }
            
        })
        return tween
    }
    stopGameScreen(){
        this.gameConf.currentTweens.forEach(c=>{
            if(c.progress<1){
                c.stop()
                c.remove()
            }
        })
    }
    

}
const config = {
    type: Phaser.AUTO,
    width: 1152,
    height: 1052,
    scale: {
        mode: Phaser.Scale.FIT ,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
     
    backgroundColor: '#171515',
    parent: 'phaser-example',
    scene: gameScene
};

const game = new Phaser.Game(config);

