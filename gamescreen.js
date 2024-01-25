let  backgroundImage
let body  
let backgroundImages={}


let bodyBackgroundColors = {
    level1:"#3F2330",
    level2:"#1d0a20",
    level3:"#19385e",
    level4:"#1c3d24"
}
const preloadImages=()=>{
    for(let i=1;i<=4;i++){
        let image = new Image()
        image.src=`./gameAssets/othertheme2/level${i}-background.png`
        backgroundImages[`level${i}`]=image
    }
}
preloadImages()
function UpdateBackground(level){
    
    if(!backgroundImage){
        backgroundImage = document.querySelector('#background-image')
    }
    if(!body){
        body = document.querySelector('body')
    }
    
    body.style.backgroundColor=bodyBackgroundColors['level'+level]
    backgroundImage.style.opacity=`0`    
   
    setTimeout(()=>{
        backgroundImage.setAttribute('src',backgroundImages[`level${level}`].src)
  
        backgroundImage.style.opacity=`1`    
        
    },200)
}
class gameScene extends Phaser.Scene{
    constructor(){
       super( ) 
       this.mainRectangles=[]
       this.backgroundRectangles=[]
       this.currentUser = {
        name:'علاء الرمضاني',
        diamonds:0
       }
       this.levels={
        level1:{
            menuContainer:{
                backgroundRectangle:[0x05050E,0x05050E,0x331919,0x331919],
                mainRectangle:{color:0x3F2330,opacity:1}


            },

            maxDiamond:1,
            minDiamond:5,
            shownCards:4,
            numberOfChoosenCards:1,
            stages:{
                
            unlocked:9,
            total:9 
            }
        },
        level2:{
            menuContainer:{
                backgroundRectangle:[0x1d0a20,0x1d0a20,0x1d0a20,0x1d0a20],
             
                mainRectangle:{color:0x1d0a20,opacity:0.82}


            },
            maxDiamond:2,
            minDiamond:2,
            shownCards:8,
            numberOfChoosenCards:1,
            
            stages:{
            unlocked:9,
            total:9 
            }
        },
        level3:{
            menuContainer:{
                backgroundRectangle:[0x0c4168,0x0c4168,0x0332a2,0x0332a2],
                mainRectangle:{color:0x19385e,opacity:1}


            },
            maxDiamond:3,
            minDiamond:3,
            shownCards:4,
            numberOfChoosenCards:2,
            stages:{
            unlocked:9,
            total:9 
            }
        },
        level4:{
            menuContainer:{
                backgroundRectangle:[0x11300b,0x11300b,0x253a1d,0x253a1d],
                mainRectangle:{color:0x1c3d24,opacity:1}


            },
            maxDiamond:4,
            minDiamond:4,
            shownCards:8,
            numberOfChoosenCards:2,
            stages:{
            unlocked:9,
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
        this.load.atlas('level1', './gameAssets/othertheme2/level1-images.png', './gameAssets/othertheme2/images.json')
        this.load.atlas('level2', './gameAssets/othertheme2/level2-images.png', './gameAssets/othertheme2/images.json')
        this.load.atlas('level3', './gameAssets/othertheme2/level3-images.png', './gameAssets/othertheme2/images.json')
        this.load.atlas('level4', './gameAssets/othertheme2/level4-images.png', './gameAssets/othertheme2/images.json')
        this.load.audio('backgroundMusic','./assets/sounds/background.webm')
        this.load.audioSprite('sfx', 'assets/sounds/soundSheet.json');  
        this.load.audio('correct','./assets/sounds/correcta.webm')
        this.load.audio('gameover','./assets/sounds/gameover.webm')
        this.load.audio('flipCard','./assets/sounds/girar2.webm')
        this.load.audio('win','./assets/sounds/win.webm')
        this.load.audio('wrong','./assets/sounds/worng.webm')
        this.load.audio('diamondEffect','./assets/sounds/6YMoS3pB03m_44100_48_0.mp3')
        this.load.video('vfx','./gameAssets/othertheme2/vfx gale flip card win and lose (1).webm',true)
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
       
       /* this.backgroundMusic.loop=true        
        
        this.backgroundMusic.play()*/
        this.btnClickMusic=this.sound.addAudioSprite('sfx')
    }
    createNormalRectangle(x,y,width,height,{color,opacity}){
        
         return this.add.graphics().fillStyle(color,opacity).fillRoundedRect(x,y,width,height)
    }
    createGradiantRectangle(x,y,width,height,colors){
        return this.add.graphics().fillGradientStyle(...colors,1).fillRect(x,y,width,height)
    }
    setGlobalBackground(){
         Object.keys(this.levels).map(l=>{
            let level = parseInt(l.replace('level',''))
             if(level===this.menu.currentLevel){
                 this.backgroundRectangles.push(this.createGradiantRectangle(0,0,1500,1052,this.levels[l].menuContainer.backgroundRectangle))
             }
             else{
                this.backgroundRectangles.push(this.createGradiantRectangle(0,0,1500,1052,this.levels[l].menuContainer.backgroundRectangle).setVisible(false))
             }
         })
         
         
    }
    initializeBackground(){
    
      //  this.backgroundRectangles.push(this.createGradiantRectangle(0,-20,1500,150,this.levels[l].menuContainer.backgroundRectangle))
     //   this.createGradiantRectangle(0,0,1500,1052,this.levels['level1'].menuContainer.backgroundRectangle)
      
        const graphics = this.add.graphics()
         
        graphics.fillStyle(0xffffff,0.4)
        graphics.fillRoundedRect(0,-20,1500,152)  
          Object.keys(this.levels).map(l=>{
             let level = parseInt(l.replace('level',''))
              if(level===this.menu.currentLevel){
                  this.mainRectangles.push(this.createNormalRectangle(0,-20,1500,150,this.levels[l].menuContainer.mainRectangle))
              }
              else{
                  this.mainRectangles.push(this.createNormalRectangle(0,-20,1500,150,this.levels[l].menuContainer.mainRectangle).setVisible(false))
              }
          })      
        this.nameText = this.add.text(1390, 30, this.currentUser.name , {
          fontSize: '40px',
          fontFamily: 'Asmaa',
          color: '#ffffff',
        }).setOrigin(0.5) 
        this.diamondSprite = this.add.sprite(1450,80,'level1','diamond').setScale(0.7)
        this.totalDiamond = this.add.text(1370, 80, this.currentUser.diamonds , {
          fontSize: '40px',
          fontFamily: 'Asmaa',
          color: '#ffffff',
        }).setOrigin(0.5) 
        
        this.levelText = this.add.text(730, 50, this.menu.currentLevel+' المستوى' , {
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
                let box = this.createLevelBox(x+(offsetX*250),(200*offsetY)+y,false)
                let text = this.add.text(x+(offsetX*250)-10, ((200*offsetY)+y)-35, i+1 , {
                   
                    fontSize: '60px',
                    fontFamily: 'Asmaa',
                    color: '#ffffff',
                })
                this.menu.stageBoxes['level'+level].push({box,text})
                box.on('pointerdown',()=>{
                    this.playingLevel=level
                    this.playingStage = i+1
                    this.destroyMenu()
                    this.setGame()
                })
                
            }
            else{
                this.menu.stageBoxes['level'+level].push({box:this.createLevelBox(x+(offsetX*250),(200*offsetY)+y,true)})
            }
            

            offsetX++
        }
        

    }
    updateScreenOnLevelChange(prev,next){
      //  console.log(prev,next)
      if(next){
        this.mainRectangles[prev-2].setVisible(false)
        this.backgroundRectangles[prev-2].setVisible(false)
      }
      else{
        this.mainRectangles[prev].setVisible(false)
        this.backgroundRectangles[prev].setVisible(false)
     
    } 
      this.mainRectangles[prev-1].setVisible(true) 
      this.backgroundRectangles[prev-1].setVisible(true) 
      UpdateBackground(prev)
   
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
    navigateAnimation(duration){
        if(!duration){
            duration=1000
        }
        const graphics  = this.add.graphics()
        graphics.fillStyle(0x171515,1) ;
        
        const rect = graphics.fillRect(0,130,1500,1052).setAlpha(0)
           
        let tween = this.tweens.add({
           targets: rect,
           props:{
               alpha:{ value:1, duration, yoyo: true },
                
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
          if(!arr.includes(`image${rand}-level-${this.playingLevel}`)){
            arr.push(`image${rand}-level-${this.playingLevel}`)
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
    
       this.levelText.setText(`ابحث عن`)
      this.gameConf.choosenCards.forEach((c,index)=>{
            
            this.gameConf.choosenCardsSprites.push(this.add.sprite((this.levelText.x-150)-(index*100),this.levelText.y,'level'+this.playingLevel,c).setScale(0.5))
       })       
    }
    setGamePart2(){
       if(!this.menuSprite){
        this.menuSprite = this.add.sprite(60,60,'level1','menu').setInteractive()
        
      
        this.menuSprite.on('pointerdown',()=>{
            this.stopGameScreen()
            this.backToMenu()
               
        })
       }
       else{
        this.menuSprite.setVisible(true)
       }
       if(!this.restartButton){
            this.restartButton = this.add.sprite(1370,250,'level1','restart').setInteractive()
            this.restartButton.on('pointerdown',()=>{
                this.stopGameScreen()
                this.restartLevel()
            })
       }
       else{
            this.restartButton.setVisible(true)
       }
       
        let {shownCards,numberOfChoosenCards} = this.levels['level'+this.playingLevel]
        let tweensNumber = 0
        for(let i=0;i<(16/(shownCards/numberOfChoosenCards));i++){
                for(let j=0;j<(shownCards/numberOfChoosenCards);j++){
                    this.gameArray.push(`image${i+1}-level-${this.playingLevel}`)
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
            box.sprite = this.add.sprite(350+((index%4)*260),250+(offsetY*220),'level'+this.playingLevel,'flipped-level-'+this.playingLevel).setScale(0)
            
            box.sprite.setInteractive()
            box.sprite.on('pointerdown',()=>{
               if(this.gameConf.gameStarted && box.clickable){
                    box.clickable=false  
                    this.manageCard(box,index)
                    this.flipCard(box).on(Phaser.Tweens.Events.TWEEN_COMPLETE,()=>{
                        
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

        this.rendredMessage =  this.add.text(730, 525, 'فوز رائع', {
                   
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
            let diamond = this.add.image(this.rendredMessage.x-200,this.rendredMessage.y,'level1','diamond').setAlpha(0)
            
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

                        const fx = winDiamonds[winDiamonds.length-1].preFX.addGlow(0xffffff,0,0,false,0,0,50);   
                        this.tweens.add({
                            targets: fx,
                            outerStrength: 5,
                            yoyo: true,
                            
                            ease: 'sine.inout'
                        }).on(Phaser.Tweens.Events.TWEEN_COMPLETE,()=>{
                            let {next,bigRect,smallRect} =  this.createNextLevelButton()
                            const  menu = this.add.sprite(60,60,'level1','menu').setInteractive()
        
      
                            menu.on('pointerdown',()=>{
                                bigRect.destroy()
                                smallRect.destroy()
                                next.destroy()
                                winDiamonds.forEach(wd=>{
                                    wd.destroy()
                                    this.rendredMessage.destroy()
                                })
                                menu.destroy()
                                this.navigateAnimation().on(Phaser.Tweens.Events.TWEEN_COMPLETE,()=>{
                                    this.menu.currentLevel=this.playingLevel
                                    this.startMenu()
                                })
                                   
                            })
                        next.on('pointerdown',()=>{
                            menu.destroy()
                            bigRect.destroy()
                            smallRect.destroy()
                            next.destroy()
                            console.log(this.playingStage)
                            winDiamonds.forEach(wd=>{
                                wd.destroy()
                                this.rendredMessage.destroy()
                                
                            })
                            this.passToNextLevel()
                            
                        })
 
                        });
                    }  
                })
            })      
         })
    }
    passToNextLevel(){
        this.menu.currentLevel=this.playingLevel
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
                
                this.updateScreenOnLevelChange(this.playingLevel,true)
                this.playingStage=1
                this.setGame()
            }
        }
    }
    winEffect(){
        this.vfx=this.add.video(750,500,'vfx').setPaused(true)
       
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
        
            let winTween =this.destroyGameAnimation() 
            let exploaded = false
            let played = false    
            winTween.on(Phaser.Tweens.Events.TWEEN_UPDATE,()=>{
                if(winTween.progress>=0.2&&!exploaded ){
                    this.vfx.setPaused(false)
                       exploaded=true
                }
                if(winTween.progress>=0.4&&!played ){
                    this.soundWin.play()   
                    played=true
                }
                
            })
            winTween.on(Phaser.Tweens.Events.TWEEN_COMPLETE,()=>{
                
                this.gameArray.forEach(c=>{
                    c.sprite.destroy()
                })
                this.tweens.add({
                   targets:this.vfx,
                   props:
                   {
                    alpha:{value:0,duration:200},
                    
                   } 
                }).on(Phaser.Tweens.Events.TWEEN_COMPLETE,()=>{
                    this.vfx.destroy()
                    
                    this.winTextEffect()
               
                })
                
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
           this.gameConf.gameStarted=false
            this.soundWrong.play() 
            this.soundgameover.play()
            this.add.sprite(card.sprite.x, card.sprite.y).setScale(4).play('explode');
            card.sprite.destroy()
            
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
      
        this.rendredMessage =  this.add.text(730, 525, 'ربما في مرة أخرى', {
                   
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

            let restartButton = this.add.sprite(this.rendredMessage.x,this.rendredMessage.y+150,'level1','restart').setAlpha(0).setInteractive()
            let menuButton = this.add.sprite(60,60,'level1','menu').setAlpha(0).setInteractive()
            
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
                this.menu.currentLevel=this.playingLevel
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
            this.menuSprite.setVisible(false)
            //   this.menuSprite.destroy()          
           // this.menuSprite=undefined
            this.restartButton.setVisible(false)
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
        this.menuSprite.setVisible(false)   
        this.restartButton.setVisible(false)
        //this.menuSprite.destroy()          
           
         //  this.menuSprite=undefined
           this.levelText.setText('')
           

    }
    backToMenu(){
    
        let tween = this.navigateAnimation()
        this.destroyGame()
        let back = false
        tween.on(Phaser.Tweens.Events.TWEEN_UPDATE,()=>{
            if(tween.progress>0.6 && !back){
                back=true
                this.menu.currentLevel = this.playingLevel
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
       let bigRect =  graphics.fillRoundedRect(600,600,250,80,40)
        graphics.fillStyle(0x9A2A2A)
        let smallRect = graphics.fillRoundedRect(602,602,246,76,40)
        let next = this.add.text(730, 630, 'المستوى القادم', {
                   
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
        this.updateScreenOnLevelChange(this.menu.currentLevel,true)
        this.movingMenuCircle.setX(this.movingMenuCircle.x+this.offsetMenuCircle)
        
        Object.keys(this.menu.stageBoxes).forEach(level=>{
            
            this.menu.stageBoxes[level].forEach(sprite=>{
             sprite.box.x-=1500
             if(sprite.text){
                sprite.text.x-=1500
             }
        }) 
        })
        
        
    
    }
    setPrevious(){
        this.menu.currentLevel--
        this.updateScreenOnLevelChange(this.menu.currentLevel,false)
        this.movingMenuCircle.setX(this.movingMenuCircle.x-this.offsetMenuCircle)
    
        Object.keys(this.menu.stageBoxes).forEach(level=>{
            this.menu.stageBoxes[level].forEach(sprite=>{
                sprite.box.x+=1500
                if(sprite.text){
                    sprite.text.x+=1500
                 }
             })

        })
    }
    
    startMenu(){
        for(let i=1;i<=this.menu.numberOfLevels;i++){
            if(i<this.menu.currentLevel){
                this.setLevelBoxes(500 - ((this.menu.currentLevel -i)*1500),350,i)
            }
            else{
                this.setLevelBoxes(500 + ((i -this.menu.currentLevel)*1500),350,i)
            }
        } 
        if(this.beforeButton===undefined){
            this.beforeButton =  this.add.sprite(360,900,'level1','before').setInteractive().setScale(1.2)  
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
            this.afterButton =  this.add.sprite(1130,900,'level1','before').setInteractive().setScale(1.2)
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
           this.levelText = this.add.text(720, 200, this.menu.currentLevel+' '+ 'المستوى' , {
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
        this.setGlobalBackground()
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
                card.sprite.setFrame('flipped-level-'+this.playingLevel)
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
    width: 1500,
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

