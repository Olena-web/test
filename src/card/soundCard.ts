export function sound():void {
  const changeSoundBtn = document.getElementById("sound-5e9f5ee35eb9e72bc21af4a4") as HTMLElement;
  const audio = new Audio();
  
  /*function chooseAudioBtn(e: any) {
    let tree: HTMLElement = e.path.find((htmlElement: HTMLElement) => 
    htmlElement.localName === 'div' && htmlElement.hasAttribute('data-tree'));
    if (!tree) {
      return;
    } 
    let treeImg:string = (tree.attributes as Record<string, any>)["data-tree"].value;
    //console.log(treeImg);
    mainTree.setAttribute("src", `../assets/tree/${treeImg}.png`);
  }  */
  let audioSrc:string;

  function getValue(){
    audioSrc = "https://rs-lang-mlatysheva.herokuapp.com/files/01_0004_example.mp3";
    // console.log(audio);
    return audioSrc;
  }


  function playAudio() {
    audio.src = `${audioSrc}`;
    audio.currentTime = 0;
    audio.play();
  }

  function pauseAudio() {
    audio.pause();
  }

  function changePlayBtn() {
    changeSoundBtn.classList.toggle('pause');
    changeSoundBtn.classList.toggle('play');
    if (changeSoundBtn.classList.contains('play')) {
      pauseAudio();
    } else {
      getValue();
      playAudio();
    }
  }

 changeSoundBtn.addEventListener('click', changePlayBtn);
  
}  

