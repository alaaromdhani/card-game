const gameWidth = 1052
const gameHeigth = 1052
class gameScene extends Phaser.Scene{
    constructor(){
       super( ) 
       this.screenRatio = 5
       this.levels={
        level1:{
            

            shownCards:4,
            numberOfChoosenCards:1,
            stages:{
            unlocked:0,
            total:9 
            }
        },
        level2:{
            shownCards:8,
            numberOfChoosenCards:1,
            
            stages:{
            unlocked:0,
            total:9 
            }
        },
        level3:{

            shownCards:4,
            numberOfChoosenCards:2,
            stages:{
            unlocked:0,
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
    preload(){
        this.load.atlas('level1', './gameAssets/othertheme2/lvl 1 (2).png', './gameAssets/othertheme2/images.json')
       
        
    }
    initializeBackground(){
        const graphics = this.add.graphics()
        graphics.fillGradientStyle(0x05050E,0x05050E,0x331919,0x331919,1)
        let rectangle = graphics.fillRect(0,0,1500,1052)
        graphics.fillStyle(0xffffff,0.4)
        let menuRectangle = graphics.fillRoundedRect(0,-20,1500,152)  
        graphics.fillStyle(0x3F2330,1)
          
        let menuRectangle2 = graphics.fillRoundedRect(0,-20,1500,150)  
        graphics.fillStyle(0xffffff,0.4)
        let test = this.add.sprite(400,300,'level1','image8-level-1')
        //this.diamondSprite = this.add.sprite(1460,80,'diamond').setScale(0.7)
        /*this.totalDiamond = this.add.text(1225, 110, this.currentUser.diamonds , {
          fontSize: '40px',
          fontFamily: 'Asmaa',
          color: '#ffffff',
        }).setOrigin(0.5) */
        
        /*this.levelText = this.add.text(730, 200, this.menu.currentLevel+' المستوى' , {
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
       }); */
    }
    resizeFunction(){
            

        this.menu.stageBoxes.level1.forEach(x=>{
            x.box.displayHeight = 150
            x.box.displayWidth = 150
            let heightOnResize
            let widthOnResize
            if(screen.width<=1000){
                widthOnResize =  ((screen.width)/1052)*x.box.displayWidth
                heightOnResize =  ((screen.height)/1052)*x.box.displayHeight
            }
            else{
                widthOnResize =  ((window.innerWidth)/1052)*x.box.displayWidth
                heightOnResize =  ((window.innerWidth)/1052)*x.box.displayHeight
            }
            if(widthOnResize>heightOnResize){
                x.box.scaleX = heightOnResize/widthOnResize
            }
            else if(heightOnResize>widthOnResize){
                console.log('scaling y on ',(widthOnResize/heightOnResize))
              
                x.box.scaleY = widthOnResize/heightOnResize
            }
            

        })
    }
    setLevelBoxes(x,y,level){
        let offsetY=-1
        let offsetX=0
          
        for(let i=0;i<this.levels['level'+level].stages.total;i++){
            if(offsetX%3==0){
                offsetX=0
                offsetY++
            } 
            this.menu.stageBoxes['level'+level].push({box:this.createLevelBox(x+(offsetX*200),(200*offsetY)+y,true)})
            

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
            box.setScale(0.085)    

        
        }
        box.setInteractive()
        
        return box

                                        
    }
    startMenu(){
        // console.log()
       
     
     }
    create(){
            
            this.initializeBackground()
            
            
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

