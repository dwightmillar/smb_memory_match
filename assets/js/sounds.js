class Sounds {
  constructor() {
    this.effects = {}
    this.clips = {}
    document.querySelectorAll('audio.sound-effect').forEach(element => {
      var elementId = element.id
      this.effects[elementId] = element
    })

    document.querySelectorAll('audio.music-clip').forEach(element => {
      var elementId = element.id
      this.clips[elementId] = element
    })

    this.themeMusic = this.themeMusic.bind(this)
  }

  soundEffect(effect) {
    this.effects[effect].play()
  }

  victoryMusic() {
    this.clips.theme.pause()
    this.clips.invincible.pause()
    this.clips.victory.currentTime = 0
    this.clips.victory.play()
    this.clips.victory.addEventListener('ended', this.themeMusic)
  }

  invincibleMusic() {
    this.clips.theme.pause()
    this.clips.invincible.currentTime = 0
    this.clips.invincible.play()
    setTimeout( () => this.clips.invincible.currentTime = 12.295, 5000)
    this.clips.invincible.addEventListener('ended', this.themeMusic)
  }

  deathMusic() {
    this.clips.theme.pause()
    this.clips.death.currentTime = 0
    this.clips.death.play()
    this.clips.death.addEventListener('ended', this.themeMusic)
  }

  themeMusic() {
    this.clips.theme.play()
  }
}
