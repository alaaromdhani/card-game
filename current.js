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
        this.load.atlas('menu', './assets/othertheme/Asset 61.png', 'assets/menu.json')
        this.load.image('diamond', './assets/othertheme/diamond.png')
     
        //  this.load.atlas('images', './assets/Asset 5.png', 'assets/menu.json')
        
    }
    initializeBackground(){
      const graphics = this.add.graphics()
      graphics.fillGradientStyle(0x05050E,0x05050E,0x331919,0x331919,1)
      let rectangle = graphics.fillRect(0,0,1052,1052)
      graphics.fillStyle(0xffffff,0.4)
      let menuRectangle = graphics.fillRoundedRect(118,18,909,124)  
      graphics.fillStyle(0x3F2330,1)
     
      let menuRectangle2 = graphics.fillRoundedRect(120,20,905,120)  
      graphics.fillStyle(0xffffff,0.4)
      let menuRectangle3 = graphics.fillRoundedRect(118,158,909,905)  
      graphics.fillStyle(0x3F2330,1)
       
      let menuRectangle4 = graphics.fillRoundedRect(120,160,905,900)  
      this.menuSprite = this.add.sprite(178,75,'menu','leave')
      this.nameText = this.add.text(900, 50, 'علاء الرمضاني' , {
        fontSize: '40px',
        fontFamily: 'Asmaa',
        color: '#ffffff',
      }).setOrigin(0.5) 
      this.diamondSprite = this.add.sprite(950,110,'diamond').setScale(0.7)
      this.totalDiamond = this.add.text(870, 110, '9999' , {
        fontSize: '40px',
        fontFamily: 'Asmaa',
        color: '#ffffff',
      }).setOrigin(0.5) 
      
   
    
      /*   this.restartSprite = this.add.sprite(710,180,'menu','restart')
        this.leaveSprite = this.add.sprite(100,180,'menu','menu')*/
        this.setLevelBoxes(400,350,1)
        // sprite.postFX.addShadow(0, 5, 0.006, 2, 0xf8f7f7, 10, .8);
        //sprite.postFX.addShadow(0, -5, 0.006, 2, 0xf8f7f7, 10, .8);
         
      // sprite.preFX.addShadow(5, 5, 0.01, 12, 0xf8f7f7, 10,0.5) 
        
      // sprite.preFX.addShadow(5, -5, 0.01, 12, 0xffffff, 10,0.5)  
      //sprite.praddShadow(0, -5, 0.01, 12, 0xffffff, 10,0.5)
      
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
            let  canvas = game.canvas
            
            if(window.innerWidth>=window.innerHeight){
                this.resizeFunction()
                if(window.innerWidth>=1052 ){
                    if(screen.width<=1000){
                        canvas.style.width= screen.width+"px"   
                        canvas.style.height=screen.height+"px"
                        canvas.style.marginLeft=0+"px"
                        canvas.style.marginRight=0+"px"
                
                    }
                    else{
                        canvas.style.width=1052+"px"   
                        canvas.style.height=1052+"px"
                       
                        canvas.style.marginLeft=((window.innerWidth)-1052)/2+"px"
                        canvas.style.marginRight=((window.innerWidth)-1052)/2+"px"
                
                    }
                }
                else{
                    if(screen.width<=1000){
                        canvas.style.width= screen.width+"px"   
                        canvas.style.height=screen.height+"px"
                    }
                    else{
                        canvas.style.width= window.innerWidth+"px"   
                        canvas.style.height=window.innerHeight+"px"
                       
                    }
                    canvas.style.marginLeft=0+"px"
                    canvas.style.marginRight=0+"px"
                 }
            }
            else{

                if(screen.width<=1000){
                    canvas.style.width= screen.width+"px"   
                    canvas.style.height=screen.height+"px"
                }
                else{
                    canvas.style.width=window.innerWidth+"px"   
                    canvas.style.height=window.innerHeight+"px"
                  
                }
                canvas.style.marginLeft=0+"px"
                canvas.style.marginRight=0+"px"
            }
            window.addEventListener('resize',()=>{
                
                this.resizeFunction()
                
                var canvas = game.canvas
                if(window.innerWidth>=1052 ){
                    if(screen.width<=1000){
                        canvas.style.width= screen.width+"px"   
                        canvas.style.height=screen.height+"px"
                        canvas.style.marginLeft=0+"px"
                        canvas.style.marginRight=0+"px"
                
                    }
                    else{
                        canvas.style.width=1052+"px"   
                        canvas.style.height=1052+"px"
                       
                        canvas.style.marginLeft=((window.innerWidth)-1052)/2+"px"
                        canvas.style.marginRight=((window.innerWidth)-1052)/2+"px"
                
                    }
                }
                else{
                    if(screen.width<=1000){
                        canvas.style.width= screen.width+"px"   
                        canvas.style.height=screen.height+"px"
                    }
                    else{
                        canvas.style.width=window.innerWidth+"px"   
                        canvas.style.height=window.innerHeight+"px"
                      
                    }
                    canvas.style.marginLeft=0+"px"
                    canvas.style.marginRight=0+"px"
            
                }
                
            })


            
    }


}
const config = {
    type: Phaser.WEBGL,
    width: 1052,
    height: 1052,
    
     
    backgroundColor: '#171515',
    parent: 'phaser-example',
    scene: gameScene
};

const game = new Phaser.Game(config);

