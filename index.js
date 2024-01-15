
class Example extends Phaser.Scene
{   
    constructor(){
        super()
        this.levelSeparatingCarousel=1000
        this.comparing=false
        this.gameCardsNumber=8 //number between 5 and 10
        this.pickedCard=undefined
        this.musicPaused = false
        this.levelText = null
        this.levels={
            level1:{
                

                shownCards:4,
                numberOfChoosenCards:1,
                stages:{
                unlocked:9,
                total:9 
                }
            },
            level2:{
                shownCards:8,
                numberOfChoosenCards:1,
                
                stages:{
                unlocked:9,
                total:9 
                }
            },
            level3:{

                shownCards:4,
                numberOfChoosenCards:2,
                stages:{
                unlocked:9,
                total:9 
                }
            },
            level4:{

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
    preload ()
    {
        this.load.atlas('menu', './assets/menu buttons/fin.png', 'assets/menu.json')
        this.load.atlas('images', './assets/Asset 5.png', 'assets/menu.json')
        this.load.image('bg','./assets/bg.png')
        this.load.image('blackScreen','./assets/black.png')
        
        this.load.audio('backgroundMusic','./assets/sounds/background.webm')
        this.load.audioSprite('sfx', 'assets/sounds/soundSheet.json');  
        this.load.audio('correct','./assets/sounds/correcta.webm')
        this.load.audio('gameover','./assets/sounds/gameover.webm')
        this.load.audio('flipCard','./assets/sounds/girar2.webm')
        this.load.audio('win','./assets/sounds/win.webm')
        this.load.audio('wrong','./assets/sounds/worng.webm')
    } 
    initiateBackground(){
        
       let bg =  this.add.sprite(400,300,'bg')
        bg.scaleX=0.9
        bg.scaleY=0.75
        this.soundgameover = this.sound.add('gameover')
        this.soundCorrect = this.sound.add('correct')
        this.soundWin = this.sound.add('win')
        this.soundWrong = this.sound.add('wrong')
        this.soundFlipCard = this.sound.add('flipCard')
        this.backgroundMusic = this.sound.add('backgroundMusic')
        this.backgroundMusic.loop=true        
        
        this.backgroundMusic.play()
        this.btnClickMusic=this.sound.addAudioSprite('sfx')


        
       
    }
    createLevelBox(x,y,isLocked){
        let box
        if(isLocked){
            box =  this.add.image(x,y,'menu','locked')  
            box.setScale(0.1)    
        
        }
        else{
            box =  this.add.image(x,y,'menu','unlocked')  
            box.setScale(0.085)    

        
        }
        box.setInteractive()
      
        return box

                                        
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
                let box = this.createLevelBox(x+(offsetX*100),(100*offsetY)+y,false)
                let text = this.add.text(x+(offsetX*100)-10, ((100*offsetY)+y)-35, i+1 , {
                   
                    fontSize: '60px',
                    fontFamily: 'Asmaa',
                    color: '#ffffff',
                })
                this.menu.stageBoxes['level'+level].push({box,text})
                box.on('pointerdown',()=>{
                    this.playingLevel=level
                    this.playingStage = i+1
                    this.setGame()
                })
                
            }
            else{
                this.menu.stageBoxes['level'+level].push({box:this.createLevelBox(x+(offsetX*100),(100*offsetY)+y,true)})
            }
            

            offsetX++
        }

    }
    setNext(){
        this.menu.currentLevel++
        
        Object.keys(this.menu.stageBoxes).forEach(level=>{
            this.menu.stageBoxes[level].forEach(sprite=>{
                 sprite.box.x-=1000
                 if(sprite.text){
                    sprite.text.x-=1000
                 }
            }) 
        })
    
    }
    setGame(){
           
        let tween = this.navigateAnimation()
        this.destroyMenu()
        
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
            this.gameConf.choosenCardsSprites.push(this.add.sprite((this.levelText.x-50)-(index*50),this.levelText.y+20,'images',c).setScale(0.1))
       })       
    }
    setGamePart2(){
        if(this.restartSprite!=undefined){
            this.menuSprite.visible=true
            
        }
        else{
           
       
            this.menuSprite = this.add.sprite(130,130,'menu','menu').setScale(0.2).setInteractive()
        }
        if(this.restartSprite!=undefined){  
            this.restartSprite.setInteractive()
            this.restartSprite.visible=true
        }
        else{

            this.restartSprite = this.add.sprite(670,130,'menu','restart').setScale(0.2).setInteractive()
        }
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
            box.sprite = this.add.sprite(250+((index%4)*100),210+(offsetY*100),'menu','enigma').setScale(0)
            
            box.sprite.setInteractive()
            box.sprite.on('pointerdown',()=>{
               if(this.gameConf.gameStarted && box.clickable){
                    this.flipCard(box).on(Phaser.Tweens.Events.TWEEN_COMPLETE,()=>{
                        this.manageCard(box,index)
                    })
               }
            })
            this.gameArray[index] = box
            let cartTween =  this.tweens.add({
                targets: box.sprite,
                props:{
                    scaleX:{ value:0.1, duration: 200},
                    scaleY:{ value:0.1, duration: 200}
                     
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
    stopGameScreen(){
        this.gameConf.currentTweens.forEach(c=>{
            if(c.progress<1){
                c.stop()
                c.remove()
            }
        })
    }
    setGamePart3(){
        
        
        
        setTimeout(()=>{
          this.hint()
        },1000)
    }

    navigateAnimation(){
        const graphics   = this.add.graphics()
        graphics.fillStyle(0x171515,1) ;
        
        const rect = graphics.fillRoundedRect(90,95,620,455,30).setAlpha(0)
           
        let tween = this.tweens.add({
           targets: rect,
           props:{
               alpha:{ value:1, duration: 1000, yoyo: true },
                
            },
           yoyo: true,
        });
        return tween
       
    }
    setPrevious(){
        this.menu.currentLevel--
        
        Object.keys(this.menu.stageBoxes).forEach(level=>{
            this.menu.stageBoxes[level].forEach(sprite=>{
                sprite.box.x+=1000
                if(sprite.text){
                    sprite.text.x+=1000
                 }
             })

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
                if(completedTeweensNumber>=cardsToShow.length){
                    this.gameConf.gameStarted=true
                }
                this.gameConf.currentTweens.push(this.flipBackCard(i))
            },1000)
        })
       
       
      



       
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
        this.afterButton.visible=false
        this.beforeButton.visible=false
    }
    
    startMenu(){
       // console.log()
        for(let i=1;i<=this.menu.numberOfLevels;i++){
            if(i<this.menu.currentLevel){
                this.setLevelBoxes(300 - ((this.menu.currentLevel -i)*1000),225,i)
            }
            else{
                this.setLevelBoxes(300 + ((i -this.menu.currentLevel)*1000),225,i)
            }
        } 
        if(this.afterButton===undefined){
            this.afterButton =  this.add.sprite(600,320,'menu','after').setInteractive().setScale(0.2)  
        }
        else{
            this.afterButton.visible=true    
        }
        if(this.beforeButton===undefined){
            this.beforeButton =  this.add.sprite(200,320,'menu','before').setInteractive().setScale(0.2)  
        }
        else{
            this.beforeButton.visible=true    
        }

        
      
        
        if(!this.levelText){
            this.levelText = this.add.text(320, 100, this.menu.currentLevel+' '+ 'المستوى' , {
                fontSize: '48px',
                fontFamily: 'Asmaa',
                color: '#ffffff',
            })
        }
        else{
            this.levelText.setText(this.menu.currentLevel+' '+ 'المستوى' )
        }
        
        this.afterButton.on('pointerdown',()=>{
            
            if(this.menu.currentLevel<this.menu.numberOfLevels){
                this.btnClickMusic.play('btnclick')
                this.setNext()
                this.levelText.setText(this.menu.currentLevel+' '+ 'المستوى')
                
            }
            
        })
        
        this.beforeButton.on('pointerdown',()=>{
            
            if(this.menu.currentLevel>1){
                this.btnClickMusic.play('btnclick')
                this.setPrevious()
                this.levelText.setText(this.menu.currentLevel+' '+ 'المستوى')
            }
        })
        this.musicButton =  this.add.sprite(670,505,'menu','sound').setInteractive().setScale(0.2)  
        this.musicButton.on('pointerdown',()=>{
            this.pauseMusic()
        })
        const graphics = this.add.graphics();
        graphics.fillStyle(0xffffff)
       this.pauseMusicRect =  graphics.fillRect(808,-115,60,5).setAngle(45)
       this.pauseMusicRect.visible = this.musicPaused
    
    }
    create ()
    {    
        this.initiateBackground()
        
        this.startMenu()
       
      // console.log(this.pauseMusicRect.scaleX)
        
    }
    pauseMusic(){
       
        if(this.musicPaused){
            this.backgroundMusic.resume()
        }
        else{
            this.backgroundMusic.pause()
        }
        this.pauseMusicRect.visible =!this.pauseMusicRect.visible 
        this.musicPaused = !this.musicPaused

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

    }
    restartLevel(){
      
           this.destroyGame()
           this.setGame()
    }
    manageCard(card,index){
        this.gameArray[index].clickable=false
        
        if(this.gameConf.choosenCards.includes(card.texture)){
            this.gameConf.flippedCardNumber++
            this.soundCorrect.play()
            if(this.gameConf.flippedCardNumber>=this.levels['level'+this.playingLevel].shownCards){
                this.gameConf.gameStarted=false
                this.soundWin.play()
                this.soundWin.play()
              
                this.winEffect()
                
            }    
        }

        else{

            this.soundWrong.play() 
            this.soundgameover.play()
            this.gameConf.gameStarted=false
                
            this.backToMenu()
        }
        

    }
    winTextEffect(){
        this.rendredMessage =  this.add.text(320, 300, 'فوز جميل' , {
                   
            fontSize: '60px',
            fontFamily: 'Asmaa',
            color: '#ffffff',
        })

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
        
        setTimeout(()=>{
            this.destroyGame()
            this.winTextEffect()
            setTimeout(()=>{
                let naviationTween = this.navigateAnimation()
                let back = false
                naviationTween.on(Phaser.Tweens.Events.TWEEN_UPDATE,()=>{
                        this.rendredMessage.setText('')
                        if(naviationTween.progress>=0.6 && !back  ){
                            back=true
                            this.startMenu()
                        }
               })
            })    
        },2000)
        
        


        
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
            card.sprite.setTexture('images')
            card.sprite.setFrame(card.texture)
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
                card.sprite.setTexture('menu')
                card.sprite.setFrame('enigma')
            }
            
        })
        return tween
    }
}

const config = {
    type: Phaser.WEBGL,
    autoCenter:Phaser.Scale.Center.CENTER,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT ,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#0081C9',
    parent: 'phaser-example',
    scene: Example
};

const game = new Phaser.Game(config);
    


